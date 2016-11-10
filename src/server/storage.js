'use strict';

const fs = require('fs');

class Storage {
    constructor(data) {
        this.data = data;
        this.isDirty = false;
    }

    findUserName(username) {
        return this.data.userList.find(User => User.username === username);
    }

    findEmail(email) {
        return this.data.userList.find(User => User.email === email);
    }

    findPhone(phone) {
        return this.data.userList.find(User => User.phone === phone);
    }

    findStudentNumber(studentnumber) {
        return this.data.userList.find(User => User.studentnumber === studentnumber);
    }

    add(User) {
        this.data.userList.push(User);
        this.isDirty = true;
    }

    writeToDisk(path) {
        if (this.isDirty) {
            fs.writeFileSync(path, JSON.stringify(this.data), 'utf8');
            this.isDirty = false;
        }

    }
}

module.exports = Storage;