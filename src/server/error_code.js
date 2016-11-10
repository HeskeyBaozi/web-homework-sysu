'use strict';

class ErrorCode {
    constructor(code, message) {
        if (typeof code === 'undefined') {
            throw new Error('code should be SUCCESS or FAILURE');
        }
        this.code = code;
        this.message = message || '';
    }
}

ErrorCode.SUCCESS = ErrorCode.prototype.SUCCESS = 'SUCCESS';
ErrorCode.FAILURE = ErrorCode.prototype.FAILURE = 'FAILURE';


module.exports = ErrorCode;