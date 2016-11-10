'use strict';

const debug = require('debug')('app:log');

function logger(ctx, next) {
    debug(`<-- ${ctx.request.method} ${ctx.state.$url.path}`);
    return next().then(d => {
        debug(`--> ${ctx.response.statusCode} ${ctx.request.method} ${ctx.state.$url.path}`);
        return d;
    }).catch(e => {
        debug(`--> ${ctx.response.statusCode} ${ctx.request.method} ${ctx.state.$url.path}`);
        return e;
    });
}

module.exports = logger;