'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:staticServer');
const ErrorCode = require('./error_code.js');

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

module.exports.staticServe = publicDir => (ctx, next) => {
    if (ctx.state.$mimeType) {
        const requestFilePath = path.join(publicDir, ctx.state.$url.pathname);
        if (fs.existsSync(requestFilePath)) {
            sendFile(ctx, requestFilePath);
        } else if (ctx.state.$mimeType === 'text/html') {
            sendFile(ctx, path.join(publicDir, './index.html'));
        } else {
            throw new ErrorCode(ErrorCode.FAILURE, `Send 404 for ${ctx.state.$url.pathname}`);
        }
    } else {
        debug(`redirect ${ctx.state.$url.pathname} to /index.html`);
        sendFile(ctx, path.join(publicDir, './index.html'));
        return next();
    }
};

module.exports.readFile = readFile;