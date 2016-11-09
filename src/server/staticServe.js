'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:staticServer');

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function sendFile(ctx, path) {
    readFile(path)
        .then(fileData => {
            ctx.response.writeHead(200, {
                'Content-Length': fileData.length,
                'Content-Type': ctx.state.$mimeType
            });
            ctx.response.end(fileData);
        })
        .catch(error => {
            ctx.response.writeHead(500);
            ctx.response.end();
        });
}

function sendNotFound(ctx) {
    debug(`Send 404 for ${ctx.state.$url.pathname}`);
    ctx.response.writeHead(404);
    ctx.response.end();
}

module.exports.staticServe = publicDir => (ctx, next) => {
    if (ctx.state.$mimeType) {
        const requestFilePath = path.join(publicDir, ctx.state.$url.pathname);
        fs.existsSync(requestFilePath) ? sendFile(ctx, requestFilePath) : sendNotFound(ctx);
    } else if (ctx.state.$url.pathname === '/') {
        sendFile(ctx, path.join(publicDir, './index.html'));
    } else
        next();
};