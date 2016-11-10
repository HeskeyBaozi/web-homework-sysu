'use strict';

const url = require('url');
const path = require('path');
const debug = require('debug')('app:server');
const ServerApp = require('./ServerApp.class.js');
const server = require('./staticServe').staticServe;
const logger = require('./logger.js');
const util = require('util');
const multiparty = require('multiparty');
const Service = require('./service.js');
const ErrorCode = require('./error_code.js');

const app = new ServerApp();

/**
 * parse the url
 */
app.use((ctx, next) => {
    ctx.state.$url = url.parse(ctx.request.url, true);
    return next();
});

/**
 * app logger, dependent on $url.
 */
app.use(logger);

/**
 * handle Error
 */
app.use((ctx, next) => {
    return next().catch(errorCode => {
        ctx.response.writeHead(400, {
            'Content-Type': 'application/json'
        });
        ctx.response.end(JSON.stringify(errorCode));
    });
});


/**
 * parse the mimeType & filePath
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
 * parse body
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
        } else if (ctx.state.$url.pathname === '/' && ctx.request.method === 'GET' && ctx.state.$url.query['username']) {
            sendRest(ctx, service.query(ctx.state.$url.query['username']));
        } else {
            return next();
        }
    };
})());

app.use(server(path.join(__dirname, '../client/')));


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


module.exports = app.createServer();