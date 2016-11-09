'use strict';

const url = require('url');
const path = require('path');
const debug = require('debug')('app:server');
const ServerApp = require('./ServerApp.class.js');
const server = require('./staticServe').staticServe;


const app = new ServerApp();


/**
 * parse the url
 */
app.use((ctx, next) => {
    ctx.state.$url = url.parse(ctx.request.url, true);
    next();
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
        next();
    };
})());

app.use(server(path.join(__dirname, '../client/')));

module.exports = app.createServer();