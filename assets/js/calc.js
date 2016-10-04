/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _MyQuery = __webpack_require__(1);
	
	var _index = __webpack_require__(2);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _helper = __webpack_require__(7);
	
	var _parser = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ob = new _index2.default({
	    data: {
	        output: '',
	        input: '0',
	        isEqualed: false,
	        isWrong: false
	    }
	});
	
	(0, _MyQuery.MyQuery)('#panel').on('click', function (e) {
	    if (ob.input === '0') {
	        ob.input = '';
	    }
	
	    if (ob.isEqualed) {
	        normalizeStyle();
	        normalizeOutput(ob);
	        normalizeInput(ob);
	        ob.isEqualed = false;
	    }
	
	    var directive = _helper.Type[e.target.dataset['directive']];
	    if (typeof directive === 'string') {
	        ob.input += directive;
	    } else if (typeof directive === 'function') {
	        directive.call(ob);
	    } else {
	        console.warn('无法解析该指令:', directive);
	    }
	});
	
	ob.$watch('output', function (newValue, oldValue) {
	    if (newValue !== oldValue) {
	        (0, _MyQuery.MyQuery)('#output').text(newValue.trim());
	    }
	});
	
	ob.$watch('input', function (newValue, oldValue) {
	    if (newValue !== oldValue) {
	        (0, _MyQuery.MyQuery)('#input').text(newValue);
	        var normalized = (0, _parser.normalize)(newValue);
	        var fn = (0, _parser.parseExpression)(normalized);
	        var result = null;
	        try {
	            this.result = result = fn();
	            if (typeof result === 'function') {
	                (0, _MyQuery.MyQuery)('#input-quick').text('Please enter number');
	                this.isWrong = true;
	            } else if (result) {
	                (0, _MyQuery.MyQuery)('#input-quick').text(normalized + ' = ' + result);
	            } else {
	                (0, _MyQuery.MyQuery)('#input-quick').text('');
	                this.isWrong = true;
	            }
	        } catch (e) {
	            this.result = 'Syntax Error :(';
	            this.isWrong = true;
	            (0, _MyQuery.MyQuery)('#input-quick').text(this.result);
	        }
	    }
	});
	
	function normalizeStyle() {
	    (0, _MyQuery.MyQuery)('#input-quick').removeClass('high-light');
	    (0, _MyQuery.MyQuery)('#input').removeClass('low-light');
	}
	
	function normalizeOutput(ob) {
	    var outputArray = ob.output.split('\n');
	    console.log(outputArray);
	    if (outputArray.length > 5) {
	        outputArray = outputArray.slice(1, outputArray.length);
	    }
	    ob.output = outputArray.join('\n');
	}
	
	function normalizeInput(ob) {
	    ob.input = '';
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.MyQuery = MyQuery;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var cache = {};
	
	/**
	 * 一个简单实现的精简jQuery
	 * @param DOMSelector
	 * @return {MyElement}
	 */
	function MyQuery(DOMSelector) {
	    if (typeof DOMSelector === 'string') {
	        if (cache[DOMSelector]) {
	            return cache[DOMSelector];
	        } else {
	            return cache[DOMSelector] = new MyElement(DOMSelector);
	        }
	    } else if (DOMSelector === document) {
	        document.on = _on.bind(document);
	        return document;
	    }
	}
	
	var MyElement = function () {
	    function MyElement(DOMSelector) {
	        _classCallCheck(this, MyElement);
	
	        this.el = document.querySelector(DOMSelector);
	    }
	
	    /**
	     * Event binding
	     * @param EventName {string}
	     * @param callback {function}
	     * @return {MyElement}
	     */
	
	
	    _createClass(MyElement, [{
	        key: 'on',
	        value: function on(EventName, callback) {
	            _on.call(this.el, EventName, callback);
	            return this;
	        }
	
	        /**
	         * add a class to the DOM
	         * @param className {string}
	         * @return {MyElement}
	         */
	
	    }, {
	        key: 'addClass',
	        value: function addClass(className) {
	            if (this.el.classList) this.el.classList.add(className);else this.el.className += ' ' + className;
	            return this;
	        }
	
	        /**
	         * remove a class
	         * @param className {string}
	         * @return {MyElement}
	         */
	
	    }, {
	        key: 'removeClass',
	        value: function removeClass(className) {
	            if (this.el.classList) this.el.classList.remove(className);else this.el.className = this.el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	            return this;
	        }
	
	        /**
	         * get/set text
	         * @param newText
	         * @return {*}
	         */
	
	    }, {
	        key: 'text',
	        value: function text(newText) {
	            if (typeof newText === 'undefined') {
	                return this.el.textContent;
	            }
	            this.el.textContent = newText;
	            return this;
	        }
	    }]);
	
	    return MyElement;
	}();
	
	function _on(EventName, callback) {
	    if (addEventListener) {
	        this.addEventListener(EventName.toLowerCase(), callback);
	    } else {
	        this['on' + EventName.toLowerCase()] = callback;
	    }
	    return this;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(3);
	
	var _watcher = __webpack_require__(6);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Store = function () {
	    function Store() {
	        var _this = this;
	
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Store);
	
	        this.$options = options;
	        this._data = options.data;
	        this._watchers = [];
	        Object.keys(this._data).forEach(function (key) {
	            proxy(_this, key);
	        });
	        (0, _index.observe)(this._data);
	    }
	
	    _createClass(Store, [{
	        key: '$watch',
	        value: function $watch(expOrFn, callback) {
	            var watcher = new _watcher2.default(this, expOrFn, callback);
	            this._watchers.push(watcher);
	        }
	    }]);
	
	    return Store;
	}();
	
	/**
	 * 代理属性
	 * @param vm {Store}
	 * @param key {String}
	 */
	
	
	exports.default = Store;
	function proxy(vm, key) {
	    Object.defineProperty(vm, key, {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	            return vm._data[key];
	        },
	        set: function set(val) {
	            vm._data[key] = val;
	        }
	    });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.observe = observe;
	
	var _helper = __webpack_require__(4);
	
	var _dep = __webpack_require__(5);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Observer = function () {
	    function Observer(value) {
	        _classCallCheck(this, Observer);
	
	        this.value = value;
	        this.dep = new _dep2.default();
	        Object.defineProperty(value, '__ob__', {
	            value: this,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
	        Array.isArray(value) ? this.observerArray(value) : this.walk(value);
	    }
	
	    _createClass(Observer, [{
	        key: 'walk',
	        value: function walk(obj) {
	            Object.keys(obj).forEach(function (key) {
	                (0, _helper.defineReactive)(obj, key, obj[key]);
	            });
	        }
	    }]);
	
	    return Observer;
	}();
	
	function observe(value) {
	    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	        return;
	    }
	
	    var ob = void 0;
	
	    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
	
	        ob = value.__ob__;
	    } else if (Object.isExtensible(value)) {
	        ob = new Observer(value);
	    }
	
	    return ob;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defineReactive = defineReactive;
	
	var _index = __webpack_require__(3);
	
	var _dep = __webpack_require__(5);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// defineReactive(obj, key, obj[key])
	function defineReactive(obj, key, val) {
	    var dep = new _dep2.default();
	
	    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	    if (descriptor && descriptor.configurable === false) return;
	
	    var propertyGetter = descriptor && descriptor.get;
	    var propertySetter = descriptor && descriptor.set;
	
	    var childObserver = (0, _index.observe)(val);
	
	    Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	            var value = propertyGetter ? propertyGetter.call(obj) : val;
	            if (_dep2.default.target) {
	                dep.depend();
	                if (childObserver) {
	                    childObserver.dep.depend();
	                }
	            }
	            return value;
	        },
	        set: function set(newVal) {
	            var value = propertyGetter ? propertyGetter.call(obj) : val;
	            if (newVal === value) return;
	            if (propertySetter) {
	                propertySetter.call(obj, newVal);
	            } else {
	                val = newVal;
	            }
	            childObserver = (0, _index.observe)(newVal);
	            dep.notify();
	        }
	    });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.pushTarget = pushTarget;
	exports.popTarget = popTarget;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	var Dep = function () {
	    function Dep() {
	        _classCallCheck(this, Dep);
	
	        this.id = uid++;
	        this.subs = [];
	    }
	
	    _createClass(Dep, [{
	        key: 'addSub',
	        value: function addSub(sub) {
	            this.subs.push(sub);
	        }
	    }, {
	        key: 'depend',
	        value: function depend() {
	            if (Dep.target) {
	                Dep.target.addDep(this);
	            }
	        }
	    }, {
	        key: 'notify',
	        value: function notify() {
	            var subs = this.subs.slice();
	            subs.forEach(function (sub) {
	                sub.update();
	            });
	        }
	    }]);
	
	    return Dep;
	}();
	
	exports.default = Dep;
	
	
	Dep.target = null;
	
	var targetStack = [];
	
	function pushTarget(_target) {
	    if (Dep.target) targetStack.push(Dep.target);
	    Dep.target = _target;
	}
	
	function popTarget() {
	    Dep.target = targetStack.pop();
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dep = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Watcher = function () {
	    function Watcher(vm, expOrFn, callback) {
	        _classCallCheck(this, Watcher);
	
	        this.callback = callback;
	        this.vm = vm;
	
	        this.depIds = new Set();
	        this.newDepIds = new Set();
	        this.newDeps = [];
	
	        if (typeof expOrFn === 'function') {
	            this.getter = expOrFn;
	        } else if (typeof expOrFn === 'string') {
	            this.getter = new Function('vm', 'return vm.' + expOrFn + ';');
	        } else {
	            this.getter = function () {
	                // do nothing..
	            };
	            console.warn(expOrFn + ' 解析失败');
	        }
	
	        this.value = this.get();
	    }
	
	    _createClass(Watcher, [{
	        key: 'get',
	        value: function get() {
	            (0, _dep.pushTarget)(this); // 推入全局依赖栈
	            var value = this.getter.call(this.vm, this.vm); // 触发了对象的getter, 获取依赖
	            (0, _dep.popTarget)();
	            return value;
	        }
	    }, {
	        key: 'addDep',
	        value: function addDep(dep) {
	            var id = dep.id;
	            if (!this.newDepIds.has(id)) {
	                this.newDepIds.add(id);
	                this.newDeps.push(dep);
	                if (!this.depIds.has(id)) {
	                    dep.addSub(this);
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.run();
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var value = this.get();
	            if (value !== this.value) {
	                var oldValue = this.value;
	                this.value = value;
	                this.callback.call(this.vm, value, oldValue);
	            }
	        }
	    }]);
	
	    return Watcher;
	}();
	
	exports.default = Watcher;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Type = undefined;
	
	var _MyQuery = __webpack_require__(1);
	
	var mathRegExp = {
	    trigonometricFunction: /cos\($|sin\($|tan\($/,
	    logFunction: /lg\($|ln\($/,
	    operation: /\+$|\-$|\*$|\/$/,
	    number: /[0]$/
	};
	
	var Type = exports.Type = {
	    factorial: '!',
	    power: '^',
	    root: '√',
	
	    pi: 'π',
	    e: 'e',
	
	    sin: 'sin(',
	    cos: 'cos(',
	    tan: 'tan(',
	
	    left: '(',
	    right: ')',
	
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    '4': '4',
	    '5': '5',
	    '6': '6',
	    '7': '7',
	    '8': '8',
	    '9': '9',
	
	    '0': '0',
	
	    plus: minusInput(mathRegExp.operation, '+'),
	    minus: minusInput(mathRegExp.operation, '-'),
	    multiply: minusInput(mathRegExp.operation, '*'),
	    divide: minusInput(mathRegExp.operation, '/'),
	
	    point: '.',
	    ln: 'ln(',
	    lg: 'lg(',
	
	    eq: function eq() {
	        this.isEqualed = true;
	        (0, _MyQuery.MyQuery)('#input').addClass('low-light');
	        (0, _MyQuery.MyQuery)('#input-quick').text(this.input ? '=' + this.result : '0').addClass('high-light');
	        this.output += this.input ? this.input + '=' + this.result + '\n' : '0=0\n';
	    },
	    backspace: function backspace() {
	        if (this.input.length === 0) {
	            this.input = '0';
	            return;
	        }
	
	        if (mathRegExp.trigonometricFunction.test(this.input)) {
	            this.input = this.input.slice(0, this.input.length - 4);
	        } else if (mathRegExp.logFunction.test(this.input)) {
	            this.input = this.input.slice(0, this.input.length - 3);
	        } else {
	            this.input = this.input.slice(0, this.input.length - 1);
	        }
	    },
	    ce: function ce() {
	        this.input = '0';
	    }
	};
	
	function minusInput(reg, stringAdded) {
	    return function () {
	        var result = reg.test(this.input) ? this.input.slice(0, this.input.length - 1) : this.input;
	
	        this.input = result + stringAdded;
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalize = normalize;
	exports.parseExpression = parseExpression;
	var MyRegExp = {
	    power: /(e|π|\d+\.?\d*|\(+[^\)]*\)+)\^(\d+\.?\d*|\(+[^\)]*\)+)/g,
	    sqrt: /\√(e|π|\d+\.?\d*|\(+[^\)]*\)+)/g,
	    factorial: /(\d+\.?\d*|\(+[^\)]*\)+)[\!]/g
	};
	
	var operationMath = [Math.sin, Math.cos, Math.tan, Math.log10, Math.log, Math.E, Math.PI, Math.pow, Math.sqrt, factor];
	
	var operationString = ['sin', 'cos', 'tan', 'lg', 'ln', 'e', 'π', 'pow', 'sqrt', 'factor'];
	
	function normalizeBrace(expression) {
	    var leftNum = expression.match(/\(/g) && expression.match(/\(/g).length || 0;
	    var rightNum = expression.match(/\)/g) && expression.match(/\)/g).length || 0;
	    var differs = leftNum - rightNum;
	    if (differs < 0) return undefined;
	    var result = expression;
	    for (var i = 0; i < differs; i++) {
	        result += ')';
	    }
	    return result;
	}
	
	function normalizeFactory(reg, placer) {
	    return function (expression) {
	        var regArray = reg.exec(expression);
	        while (regArray !== null) {
	            expression = expression.replace(reg, placer(regArray));
	            regArray = reg.exec(expression);
	        }
	        return expression;
	    };
	}
	
	var normalizePower = normalizeFactory(MyRegExp.power, function (regArray) {
	    return 'pow(' + regArray[0].split('^').join(',') + ')';
	});
	
	var normalizeSqrt = normalizeFactory(MyRegExp.sqrt, function (regArray) {
	    return 'sqrt(' + regArray[0].split('√')[1] + ')';
	});
	
	var normalizeFactorial = normalizeFactory(MyRegExp.factorial, function (regArray) {
	    return 'factor(' + regArray[0].split('!')[0] + ')';
	});
	
	function normalize(expression) {
	    return [expression, normalizeBrace, normalizePower, normalizeSqrt, normalizeFactorial].reduce(function (expression, wrapper) {
	        return wrapper(expression);
	    });
	}
	
	function parseExpression(expression) {
	    return function () {
	        return new (Function.prototype.bind.apply(Function, [null].concat(operationString, ['return ' + expression + ';'])))().apply(null, operationMath);
	    };
	}
	
	function factor(num) {
	    if (num === 0) {
	        return 1;
	    }
	    if (num < 0) {
	        throw new Error('阶乘不能为负数');
	    }
	
	    var result = 1;
	    for (var i = 1; i <= num; i++) {
	        result = result * i;
	    }
	    return result;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=calc.js.map