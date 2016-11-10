'use strict';

const Storage = require('./storage.js');
const fs = require('fs');
const path = require('path');
const pathName = path.join(__dirname, './data.json');
const ErrorCode = require('./error_code.js');

class Service {
    constructor() {
        this.storage = new Storage(JSON.parse(fs.readFileSync(pathName, 'utf8')));
    }

    registry(User) {
        if (User && User.username.length) {
            if (!this.storage.exists(User.username).length) {
                this.storage.add(User);
                this.storage.writeToDisk(pathName);
                return new ErrorCode(ErrorCode.SUCCESS);
            } else {
                throw new ErrorCode(ErrorCode.FAILURE, `${User.username} exists!`);
            }
        }
        throw new ErrorCode(ErrorCode.FAILURE, `User is undefined!`);
    }

    query(username) {
        if (username) {
            const result = this.storage.exists(username)[0];
            if (result) {
                return new ErrorCode(ErrorCode.SUCCESS, result);
            } else {
                throw new ErrorCode(ErrorCode.FAILURE, `can't find the ${username}`);
            }
        }
        throw new ErrorCode(ErrorCode.FAILURE, 'Username is undefined!');
    }
}

module.exports = Service;