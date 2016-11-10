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
            const checkResult = this.checkUsername(User.username);
            if (checkResult.code === ErrorCode.FAILURE) {
                this.storage.add(User);
                this.storage.writeToDisk(pathName);
                return new ErrorCode(ErrorCode.SUCCESS, `成功注册用户 ${User.username}`);
            } else {
                throw new ErrorCode(ErrorCode.FAILURE, `注册失败, 原因: ${checkResult.message}`);
            }
        }
        throw new ErrorCode(ErrorCode.FAILURE, `User 未定义`);
    }

    getUserDetail(username) {
        if (username) {
            const detail = this.storage.findUserName(username);
            if (detail) {
                return new ErrorCode(ErrorCode.SUCCESS, detail);
            } else {
                throw new ErrorCode(ErrorCode.FAILURE, `${username} 不存在`);
            }
        }
        throw new ErrorCode(ErrorCode.FAILURE, '用户名未定义');
    }

    checkUsername(username) {
        if (this.storage.findUserName(username)) {
            return new ErrorCode(ErrorCode.SUCCESS, `用户名已存在`);
        } else {
            return new ErrorCode(ErrorCode.FAILURE, `${username} 不存在`)
        }
    }

    checkEmail(email) {
        if (this.storage.findEmail(email)) {
            return new ErrorCode(ErrorCode.SUCCESS, `该邮箱已存在`);
        } else {
            return new ErrorCode(ErrorCode.FAILURE, `${email} 不存在`)
        }
    }

    checkStudentNumber(studentnumber) {
        if (this.storage.findStudentNumber(studentnumber)) {
            return new ErrorCode(ErrorCode.SUCCESS, `该学号已存在`);
        } else {
            return new ErrorCode(ErrorCode.FAILURE, `${studentnumber} 不存在`)
        }
    }

    checkPhone(phone) {
        if (this.storage.findPhone(phone)) {
            return new ErrorCode(ErrorCode.SUCCESS, `该电话已存在`);
        } else {
            return new ErrorCode(ErrorCode.FAILURE, `${phone} 不存在`)
        }
    }
}

module.exports = Service;