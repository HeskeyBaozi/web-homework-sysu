'use strict';
(() => {
    /**
     * 缓存
     */
    const cache = {
        allFormGroupArray: Array.from(document.querySelectorAll('.form-group')),
        loginForm: document.querySelector('.login-flex'),
        submitButton: document.getElementById('submit'),
        resetButton: document.getElementById('reset'),
        allInputArray: Array.from(document.querySelectorAll('.needTest')),
        detailElement: document.querySelector('.detail')
    };

    /**
     * 表单复位
     */
    function reset() {
        cache.allFormGroupArray.forEach(ele => {
            ele.classList.remove('form-danger');
            ele.classList.remove('form-correct');
            ele.lastElementChild.textContent = '';
        });
    }

    cache.resetButton.addEventListener('click', e => {
        reset();
    });


    /**
     * 验证函数，闭包包裹相关helper
     */
    var validate = (() => {
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
                {
                    test: /^[a-zA-Z0-9]/,
                    message: '必须字母数字开头'
                },
                {
                    test: /^(\w|\.|-)*@(\w|\.|-)*$/i,
                    message: '@没有或过多'
                },
                {
                    test: /\.[a-zA-Z]{2,4}$/,
                    message: '后缀不合理'
                },

                {
                    test: /^[\w\-]+@(([\w\-])+\.)+[a-zA-Z]{2,4}$/,
                    message: '不符合正常邮箱格式'
                }
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

        function checkExists(type, value) {
            return myAjax(`/?check=${type}&text=${value}`)
                .then(text => JSON.parse(text));
        }

        return function (element) {
            const validateResult = validateOne(element.name, element.value);
            if (validateResult.success) {
                checkExists(element.name, element.value)
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
    cache.loginForm.addEventListener('input', _.debounce(e => {
        validate(e.target);
    }, 500));


    /**
     * 表单提交
     */
    cache.submitButton.addEventListener('click', e => {
        e.preventDefault();
        cache.allInputArray.forEach(ele => {
            validate(ele);
        });
        const ableToSubmitForm = cache.allInputArray.every(ele => {
            return ele.value && ele.parentNode.classList.contains('form-correct');
        });
        // 若表单信息合法
        if (ableToSubmitForm) {
            const form = new FormData(cache.loginForm);
            myAjax('/registry', {
                method: 'POST',
                body: form
            }).then(responseText => {
                console.log(JSON.parse(responseText));
                location.assign(`/?username=${form.get('username')}`);
            }).catch(text => {
                console.log(text);
            });
            reset();
        }
    });

    function checkCurrentPageAndRenderDetail() {
        if (checkPage(window.location)) {
            const userName = location.search.match(/^\?username=\w+$/)[0].split(/\?username=/)[1];
            myAjax(`/?queryDetail=${userName}`)
                .then(errorCode => JSON.parse(errorCode))
                .then(errorCode => {
                    if (errorCode.code === 'SUCCESS') {
                        renderDetail(errorCode.message);
                    }
                });
        }
    }

    checkCurrentPageAndRenderDetail();

    function checkPage(location) {
        return location.search && /^\?username=\w+$/.test(location.search);
    }

    function renderDetail(data) {
        cache.loginForm.classList.toggle('hidden');
        cache.detailElement.classList.toggle('hidden');
        cache.detailElement.innerHTML = parseTextContent(cache.detailElement.innerHTML, data).join('');
    }

    /**
     * 解析{{}}并用object替换模版数据
     * @param text
     * @param object
     * @return {Array}
     */
    var parseTextContent = (() => {
        const tagRE = /\{\{((?:.|\n)+?)\}\}/g;
        return function (text, object) {
            if (!tagRE.test(text))
                return;

            const tokens = [];
            let lastIndex = tagRE.lastIndex = 0;
            let match, index;
            while ((match = tagRE.exec(text))) {
                index = match.index;
                // push text token
                if (index > lastIndex) {
                    tokens.push(text.slice(lastIndex, index));
                }
                // tag token
                const exp = match[1];
                tokens.push(object[exp]);
                lastIndex = index + match[0].length;
            }
            if (lastIndex < text.length) {
                tokens.push(text.slice(lastIndex));
            }
            return tokens;
        }
    })();
})();