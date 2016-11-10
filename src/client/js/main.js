'use strict';
(() => {


    /**
     * 表单提交
     */
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

    /**
     * 表单复位
     */
    document.getElementById('reset').addEventListener('click', e => {
        Array.from(document.querySelectorAll('.form-group')).forEach(ele => {
            ele.classList.remove('form-danger');
            ele.classList.remove('form-correct');
            ele.lastElementChild.textContent = '';
        });
    });


    /**
     * 验证函数，闭包包裹相关helper
     */
    const validate = (() => {
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

        function validateOne(name, text) {
            const result = validator[name].find(testCase => {
                return !testCase.test.test(text);
            });
            return {
                success: !result,
                message: result && result.message || 'Pass!'
            };
        }

        return function (element) {
            const validateResult = validateOne(element.name, element.value);
            if (validateResult.success) {
                myFetch(`/?check=${element.name}&text=${element.value}`)
                    .then(text => JSON.parse(text))
                    .then(errorCode => {
                        if (errorCode.code === 'SUCCESS') {
                            showWrong(element, errorCode.message);
                        } else {
                            showOK(element, errorCode.message);
                        }
                    });
            } else {
                showWrong(element, validateResult.message);
            }
        }
    })();

    /**
     * 输入时验证，500毫秒防止抖动
     */
    document.querySelector('.login-flex').addEventListener('input', _.debounce(e => {
        validate(e.target);
    }, 500));

    function showOK(element, message) {
        element.parentNode.classList.remove('form-danger');
        element.parentNode.classList.add('form-correct');
        element.parentNode.lastElementChild.textContent = ' √';
    }

    function showWrong(element, message) {
        element.parentNode.classList.remove('form-correct');
        element.parentNode.classList.add('form-danger');
        element.parentNode.lastElementChild.textContent = `${message} ×`;
    }
})();