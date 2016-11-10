'use strict';
(() => {
    const validator = {
        'username': [
            {
                test: /.+/,
                message: '不能为空'
            },
            {
                test: /^[a-z]+/i,
                message: '必须以英文字母开头'
            },
            {
                test: /^\w*$/,
                message: '必须英文字母、数字或下划线'
            },
            {
                test: /^\w{6,18}$/,
                message: '必须6~18位'
            }
        ],
        'studentnumber': [
            {
                test: /.+/,
                message: '不能为空'
            },
            {
                test: /^\d*$/,
                message: '必须全是数字'
            },
            {
                test: /^[1-9]/,
                message: '不能以0开头'
            },
            {
                test: /^\d{8}$/,
                message: '必须刚好8位数字'
            }
        ],
        'email': [
            {
                test: /.+/,
                message: '不能为空'
            },
        ],
        'phone': [
            {
                test: /.+/,
                message: '不能为空'
            },
            {
                test: /^\d*$/,
                message: '必须全是数字'
            },
            {
                test: /^[1-9]/,
                message: '不能以0开头'
            },
            {
                test: /^\d{11}$/,
                message: '必须刚好11位数字'
            }
        ]
    };

    document.getElementById('submit').addEventListener('click', e => {
        e.preventDefault();
        const form = new FormData(document.querySelector('.login-flex'));
        myFetch('/registry', {
            method: 'POST',
            body: form
        }).then(responseText => {
            console.log(responseText);
        }).catch(text => {
            console.log(text);
        });
    });

    document.querySelector('.login-flex').addEventListener('input', _.debounce(e => {
        const validateResult = validateOne(e.target.name, e.target.value);
        if (validateResult.success) {
            if (e.target.name === 'username') {
                validateUserName(e.target.value).then(res => {
                    showOK(e.target, res.message);
                }).catch(res => {
                    showWrong(e.target, res.message);
                })
            } else {
                showOK(e.target, validateResult.message);
            }
        } else {
            showWrong(e.target, validateResult.message);
        }
    }, 500));

    function showOK(element, message) {
        console.log('OK', message);

    }

    function showWrong(element, message) {
        console.log('Wrong', message);

    }

    function validateOne(name, text) {
        const result = validator[name].find(testCase => {
            return !testCase.test.test(text);
        });
        return {
            success: !result,
            message: result && result.message || 'Pass!'
        };
    }

    function validateUserName(text) {
        return myFetch(`/?username=${text}`, {
            method: 'GET'
        }).then(errorCode => {
            console.log(errorCode);
            return {
                success: true,
                message: 'Pass!!'
            };
        }).catch(errorCode => ({
            success: false,
            message: errorCode.message
        }));
    }
})();