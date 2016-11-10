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

ErrorCode.SUCCESS = 'SUCCESS';
ErrorCode.FAILURE = 'FAILURE';


module.exports = ErrorCode;