'use strict';

class Storage {
    constructor(data) {
        this.data = data;
        this.isDirty = false;
    }

    exists(name) {
        return this.data.userList.filter(User => User.username === name);
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