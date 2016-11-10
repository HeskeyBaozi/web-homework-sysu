'use strict';

const url = require('url');
const path = require('path');
const debug = require('debug')('app:serve');
const http = require('http');
const multiparty = require('multiparty');
const serve = require('./staticServe').staticServe;
const logger = require('./logger.js');
const Service = require('./service.js');
const ErrorCode = require('./error_code.js');

class ServerApp {
    constructor() {
        this.middleware = [];
    }

    use(fn) {
        this.middleware.push(fn);
    }

    createServer() {
        const middleware = this.middleware;
        return http.createServer(function (request, response) {
            const context = Object.create(this);
            Object.assign(context, {
                request, response, state: {}
            });
            flow(middleware)(context);
        });
    }
}


const app = new ServerApp();

/**
 * 解析URL
 */
app.use((ctx, next) => {
    ctx.state.$url = url.parse(ctx.request.url, true);
    return next();
});

/**
 * 打印日志，依赖解析URL生成的$url
 */
app.use(logger);

/**
 * RESTful 异常处理
 */
app.use((ctx, next) => {
    return next().catch(errorCode => {
        ctx.response.writeHead(400, {
            'Content-Type': 'application/json;charset=utf-8'
        });
        ctx.response.end(JSON.stringify(errorCode));
    });
});


/**
 * 解析mimeType
 */
app.use((() => {
    /**
     * use closure.
     */
    const validExtensions = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.png': 'image/png'
    };
    return (ctx, next) => {
        const mimeType = validExtensions[path.extname(ctx.state.$url.pathname)];
        if (mimeType) {
            ctx.state.$mimeType = mimeType;
        }
        return next();
    };
})());


/**
 * 解析 POST 中的请求体Body
 */
app.use((ctx, next) => {
    if (ctx.request.method === 'POST') {
        const form = new multiparty.Form();
        const $body = {};
        form.on('field', (name, value) => {
            Object.assign($body, {
                [name]: value
            });
        });

        form.on('close', () => {
            ctx.state.$body = $body;
            return next();
        });

        form.on('error', error => {
            throw new ErrorCode(ErrorCode.FAILURE, `error occurs in parsing body: ${error}`);
        });
        form.parse(ctx.request);
    } else {
        return next();
    }
});


/**
 * REST ful API
 */
app.use((() => {
    const service = new Service();
    return (ctx, next) => {
        if (ctx.state.$url.pathname === '/registry' && ctx.request.method === 'POST') {
            sendRest(ctx, service.registry(ctx.state.$body));
        } else if (ctx.request.method === 'GET' && ctx.state.$url.query['check']) {
            const text = ctx.state.$url.query['text'];
            switch (ctx.state.$url.query['check']) {
                case 'username':
                    sendRest(ctx, service.checkUsername(text));
                    break;
                case 'studentnumber':
                    sendRest(ctx, service.checkStudentNumber(text));
                    break;
                case 'email':
                    sendRest(ctx, service.checkEmail(text));
                    break;
                case 'phone':
                    sendRest(ctx, service.checkPhone(text));
                    break;
            }
        } else if (ctx.request.method === 'GET' && ctx.state.$url.query['queryDetail']) {
            sendRest(ctx, service.getUserDetail(ctx.state.$url.query['queryDetail']));
        } else {
            return next();
        }
    };
})());

/**
 * 静态服务
 */
app.use(serve(path.join(__dirname, '../client/')));


function sendRest(ctx, errorCode) {
    ctx.response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    try {
        ctx.response.end(JSON.stringify(errorCode));
    } catch (error) {
        throw new ErrorCode(ErrorCode.FAILURE, `sendRest in ${error}`);
    }
}


/**
 * 将多个中间件函数整合到一个
 * 像lodash中的_.flow一样，但是有promise的回调
 *
 * @param middleWares {Array<function>}
 * @return {function({Object}, {Function})}
 *
 * @example
 * const middleware = [fn1, fn2];
 *
 * function fn1(ctx, next) {
 *    console.log('Coming from fn1');
 *    ctx.testProperty = 'test';
 *    next().then(() => {
 *        console.log('Coming from fn1 end');
 *    });
 * }
 *
 * function fn2(ctx, next) {
 *    console.log('Coming from fn2');
 *    console.log('the test Property is ', ctx.testProperty);
 *    next().then(() => {
 *        console.log('Coming from fn2 end');
 *    });
 * }
 *
 * // ↓↓ call the flow
 * flow(middleware)({});
 *
 * [Output]:
 * Coming from fn1
 * Coming from fn2
 * the test Property is  test
 * Coming from fn2 end
 * Coming from fn1 end
 */
function flow(middleWares) {
    return (ctx, next) => {
        let index = -1;

        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times...'));

            index = i;
            const fn = middleWares[i] || next;

            /**
             * 当到中间件数组尾的时候..
             */
            if (!fn) {
                return Promise.resolve();
            }
            try {
                /**
                 * 参数next就是这里的下一个中间件函数 ↓↓
                 */
                return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }

        /**
         * 返回的是一个Promise实例
         */
        return dispatch(0);
    };
}

module.exports = app.createServer();