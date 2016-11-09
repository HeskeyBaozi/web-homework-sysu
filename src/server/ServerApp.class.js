'use strict';
const http = require('http');
const flow = require('./helper.js').flow;


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

module.exports = ServerApp;