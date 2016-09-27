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
	
	var _index = __webpack_require__(1);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _watcher = __webpack_require__(10);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _textParser = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var demo = new _index2.default({
	    data: function data() {
	        return {
	            first: 'Hello, world!',
	            second: 'Hello, Daddy'
	        };
	    },
	
	    el: '.display'
	});
	
	var w = new _watcher2.default(demo, function (data) {
	    return data.first;
	}, function (value, oldValue) {
	    var textElement = document.querySelector(this.$options.el);
	    console.log(value, oldValue);
	    var result = eval((0, _textParser.parseText)(textElement.textContent, 'this'));
	    console.log(result);
	    textElement.textContent = result;
	});
	
	new Promise(function (resolve, reject) {
	    setTimeout(function () {
	        demo.first = 'Fuck you!';
	        resolve(demo.first);
	    }, 2000);
	}).then(function (data) {
	    console.log(demo);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _init = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VM = function () {
	    function VM(options) {
	        _classCallCheck(this, VM);
	
	        this._init(options);
	    }
	
	    _createClass(VM, [{
	        key: '_initEl',
	        value: function _initEl() {
	            this.$el = document.querySelector(this.$options.el);
	        }
	    }]);
	
	    return VM;
	}();
	
	exports.default = VM;
	
	
	(0, _init.initMixin)(VM);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initMixin = initMixin;
	
	var _lifecycle = __webpack_require__(3);
	
	var _state = __webpack_require__(4);
	
	var uid = 0;
	
	function initMixin(VM) {
	    VM.prototype._init = function (options) {
	        var vm = this;
	
	        vm._uid = uid++;
	        vm._isVM = true;
	
	        if (options && options._isComponent) {
	            // todo fix Component
	        } else {
	            console.log(vm, '被赋值了', options);
	            vm.$options = options;
	        }
	
	        vm._self = vm;
	        (0, _lifecycle.initLifeCycle)(vm);
	        (0, _state.initState)(vm);
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initLifeCycle = initLifeCycle;
	function initLifeCycle(vm) {
	    var options = vm.$options;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initState = initState;
	
	var _index = __webpack_require__(5);
	
	function initState(vm) {
	    vm._watchers = [];
	    initData(vm);
	}
	
	function initData(vm) {
	    var dataFn = vm.$options.data;
	    var data = vm._data = typeof dataFn === 'function' ? dataFn.call(vm) : dataFn || {};
	    Object.keys(data).forEach(function (key) {
	        proxy(vm, key);
	    });
	    (0, _index.observe)(data);
	    data.__ob__ && data.__ob__.vmCount++;
	}
	
	/**
	 * 代理属性
	 * @param vm {VM}
	 * @param key {String}
	 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.observerState = exports.Observer = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.observe = observe;
	
	var _helpers = __webpack_require__(6);
	
	var _dep = __webpack_require__(7);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @member value {*}
	 * @member dep {Dep}
	 */
	var Observer = exports.Observer = function () {
	    /**
	     * @constructor
	     * @param value {*}
	     */
	    function Observer(value) {
	        _classCallCheck(this, Observer);
	
	        this.value = value;
	        this.dep = new _dep2.default();
	        this.vmCount = 0;
	        Object.defineProperty(value, '__ob__', {
	            value: this,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
	        Array.isArray(value) ? this.observerArray(value) : this.walk(value);
	    }
	
	    /**
	     * @param obj {Object}
	     */
	
	
	    _createClass(Observer, [{
	        key: 'walk',
	        value: function walk(obj) {
	            Object.keys(obj).forEach(function (key) {
	                (0, _helpers.defineReactive)(obj, key, obj[key]);
	            });
	        }
	    }]);
	
	    return Observer;
	}();
	
	var observerState = exports.observerState = {
	    shouldConvert: true,
	    isSettingProps: false
	};
	
	function observe(value) {
	    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	        return;
	    }
	
	    var ob = void 0;
	
	    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
	
	        ob = value.__ob__;
	    } else if (observerState.shouldConvert && Object.isExtensible(value)) {
	        ob = new Observer(value);
	    }
	
	    return ob;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defineReactive = defineReactive;
	
	var _dep = __webpack_require__(7);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Define a reactive property on an Object.
	 * @param obj {Object}
	 * @param key {String}
	 * @param val {*}
	 */
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
	                console.log('Dep.target = ', _dep2.default.target);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.pushTarget = pushTarget;
	exports.popTarget = popTarget;
	
	var _index = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	/**
	 * 值的依赖
	 * @member id {Number}
	 * @member subs {Array}
	 * @member target {*} @static
	 */
	
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
	        key: 'removeSub',
	        value: function removeSub(sub) {
	            (0, _index.remove)(this.subs, sub);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _options = __webpack_require__(9);
	
	Object.keys(_options).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _options[key];
	        }
	    });
	});
	exports.remove = remove;
	
	
	/**
	 * Remove an item from an array
	 * @param arr {Array<*>}
	 * @param item {*}
	 * @returns {Array<*> | void}
	 */
	function remove(arr, item) {
	    if (arr.length) {
	        var index = arr.indexOf(item);
	        if (index > -1) {
	            return arr.splice(index, 1);
	        }
	    }
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 *
	 * @param parent {Object}
	 * @param child {Object}
	 * @param vm {VM}
	 * @return {Object}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeOptions = mergeOptions;
	function mergeOptions(parent, child, vm) {
	  // 规格化
	
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dep = __webpack_require__(7);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _scheduler = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	/**
	 * watcher 解析一个表达式, 收集依赖
	 * 当表达式的值改变时, 调用回调函数
	 */
	
	var Watcher = function () {
	    function Watcher(vm, expOrFn, callback) {
	        _classCallCheck(this, Watcher);
	
	        this.vm = vm;
	        vm._watchers.push(this);
	
	        this.expression = expOrFn.toString();
	        this.callback = callback;
	        this.id = uid++;
	        this.deps = [];
	        this.newDeps = [];
	        this.depIds = new Set();
	        this.newDepIds = new Set();
	
	        // 语法分析表达式, 得到获取该值的getter函数
	        if (typeof expOrFn === 'function') {
	            this.getter = expOrFn;
	        } else {
	            // todo: parse the expression
	            if (!this.getter) {
	                this.getter = function () {
	                    // do nothing..
	                };
	                console.warn(expOrFn + ' 解析失败');
	            }
	        }
	
	        this.value = this.get();
	    }
	
	    _createClass(Watcher, [{
	        key: 'get',
	        value: function get() {
	            (0, _dep.pushTarget)(this); // 推入全局依赖栈
	            var value = this.getter.call(this.vm, this.vm); // 触发了对象的getter, 获取依赖
	            (0, _dep.popTarget)();
	            // todo
	            return value;
	        }
	    }, {
	        key: 'addDep',
	        value: function addDep(dep) {
	            var id = dep.id;
	
	            // 如果这个id不在新依赖中
	            if (!this.newDepIds.has(id)) {
	                this.newDepIds.add(id);
	                this.newDeps.push(dep);
	                // 如果旧的依赖ID记录没有这个依赖
	                // 把Watcher实例添加到依赖的订阅者中
	                if (!this.depIds.has(id)) {
	                    dep.addSub(this);
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            (0, _scheduler.queueWatcher)(this);
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            console.log('this.', uid, 'run调用了');
	            var value = this.get();
	            if (value !== this.value) {
	                var oldValue = this.value;
	                this.value = value;
	                // todo: if is user
	                this.callback.call(this.vm, value, oldValue);
	            }
	        }
	    }]);
	
	    return Watcher;
	}();
	
	exports.default = Watcher;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.queueWatcher = queueWatcher;
	var has = {};
	var isFlushing = false;
	var isWaiting = false;
	
	/**
	 * @type {Array<Watcher>}
	 */
	var queue = [];
	
	function resetSchedulerState() {
	    queue.length = 0; // clear the queue
	    has = {};
	    isWaiting = isFlushing = false;
	}
	
	function flushSchedulerQueue() {
	    isFlushing = true;
	    queue.sort(function (a, b) {
	        return a.id - b.id;
	    });
	
	    queue.forEach(function (watcher) {
	        var id = watcher.id;
	        has[id] = undefined;
	
	        watcher.run();
	
	        if (typeof has[id] !== 'undefined') {
	            console.error(watcher.expression);
	        }
	    });
	    resetSchedulerState();
	}
	
	function queueWatcher(watcher) {
	    var id = watcher.id;
	    if (typeof has[id] === 'undefined') {
	        has[id] = true;
	        if (!isFlushing) {
	            queue.push(watcher);
	        } else {
	            var i = queue.length - 1; // the last
	            while (i >= 0 && queue[i].id > watcher.id) {
	                i--;
	            }
	            // now queue[i].id <|=== watcher.id
	            queue.splice(Math.max(i, 0) + 1, 0, watcher);
	        }
	
	        if (!isWaiting) {
	            isWaiting = true;
	            setTimeout(flushSchedulerQueue, 0);
	        }
	    }
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseText = parseText;
	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	
	/**
	 * @param text {string}
	 * @param ctxString {string}
	 * @return {string | void}
	 */
	function parseText(text, ctxString) {
	    var tagRE = defaultTagRE;
	
	    // 如果没有双括号
	    if (!tagRE.test(text) || typeof ctxString === 'undefined') return;
	    var tokens = [];
	
	    var match = void 0; // 匹配信息
	    var lastIndex = tagRE.lastIndex = 0; // 上一次匹配到的位置
	    while ((match = tagRE.exec(text)) !== null) {
	        //匹配的初始位置
	        var index = match.index;
	
	        if (index > lastIndex) {
	            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	        }
	
	        var exp = match[1].trim();
	        console.log('match = ', match);
	        tokens.push(ctxString + '.' + exp);
	        lastIndex = index + match[0].length;
	    }
	    return tokens.join('+');
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmY0MGMwZmY0NzM5M2JlNTcyYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9pbnN0YW5jZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vaW5zdGFuY2UvbGlmZWN5Y2xlLmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vaW5zdGFuY2Uvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9vYnNlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL29ic2VydmVyL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9vYnNlcnZlci9kZXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vdXRpbC9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vb2JzZXJ2ZXIvd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL29ic2VydmVyL3NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL2NvbXBpbGFyL3BhcnNlci90ZXh0LXBhcnNlci5qcyJdLCJuYW1lcyI6WyJkZW1vIiwiZGF0YSIsImZpcnN0Iiwic2Vjb25kIiwiZWwiLCJ3IiwidmFsdWUiLCJvbGRWYWx1ZSIsInRleHRFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJG9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZXZhbCIsInRleHRDb250ZW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwidGhlbiIsIlZNIiwib3B0aW9ucyIsIl9pbml0IiwiJGVsIiwiaW5pdE1peGluIiwidWlkIiwicHJvdG90eXBlIiwidm0iLCJfdWlkIiwiX2lzVk0iLCJfaXNDb21wb25lbnQiLCJfc2VsZiIsImluaXRMaWZlQ3ljbGUiLCJpbml0U3RhdGUiLCJfd2F0Y2hlcnMiLCJpbml0RGF0YSIsImRhdGFGbiIsIl9kYXRhIiwiY2FsbCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJveHkiLCJrZXkiLCJfX29iX18iLCJ2bUNvdW50IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwidmFsIiwib2JzZXJ2ZSIsIk9ic2VydmVyIiwiZGVwIiwid3JpdGFibGUiLCJBcnJheSIsImlzQXJyYXkiLCJvYnNlcnZlckFycmF5Iiwid2FsayIsIm9iaiIsIm9ic2VydmVyU3RhdGUiLCJzaG91bGRDb252ZXJ0IiwiaXNTZXR0aW5nUHJvcHMiLCJvYiIsImhhc093blByb3BlcnR5IiwiaXNFeHRlbnNpYmxlIiwiZGVmaW5lUmVhY3RpdmUiLCJkZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicHJvcGVydHlHZXR0ZXIiLCJwcm9wZXJ0eVNldHRlciIsImNoaWxkT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJkZXBlbmQiLCJuZXdWYWwiLCJub3RpZnkiLCJwdXNoVGFyZ2V0IiwicG9wVGFyZ2V0IiwiRGVwIiwiaWQiLCJzdWJzIiwic3ViIiwicHVzaCIsImFkZERlcCIsInNsaWNlIiwidXBkYXRlIiwidGFyZ2V0U3RhY2siLCJfdGFyZ2V0IiwicG9wIiwicmVtb3ZlIiwiYXJyIiwiaXRlbSIsImxlbmd0aCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsIm1lcmdlT3B0aW9ucyIsInBhcmVudCIsImNoaWxkIiwiV2F0Y2hlciIsImV4cE9yRm4iLCJjYWxsYmFjayIsImV4cHJlc3Npb24iLCJ0b1N0cmluZyIsImRlcHMiLCJuZXdEZXBzIiwiZGVwSWRzIiwiU2V0IiwibmV3RGVwSWRzIiwiZ2V0dGVyIiwid2FybiIsImhhcyIsImFkZCIsImFkZFN1YiIsInF1ZXVlV2F0Y2hlciIsImlzRmx1c2hpbmciLCJpc1dhaXRpbmciLCJxdWV1ZSIsInJlc2V0U2NoZWR1bGVyU3RhdGUiLCJmbHVzaFNjaGVkdWxlclF1ZXVlIiwic29ydCIsImEiLCJiIiwid2F0Y2hlciIsInVuZGVmaW5lZCIsInJ1biIsImVycm9yIiwiaSIsIk1hdGgiLCJtYXgiLCJwYXJzZVRleHQiLCJkZWZhdWx0VGFnUkUiLCJ0ZXh0IiwiY3R4U3RyaW5nIiwidGFnUkUiLCJ0ZXN0IiwidG9rZW5zIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJleGVjIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4cCIsInRyaW0iLCJqb2luIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxLQUFJQSxPQUFPLG9CQUFPO0FBQ2RDLFNBRGMsa0JBQ1I7QUFDRixnQkFBTztBQUNIQyxvQkFBTyxlQURKO0FBRUhDLHFCQUFRO0FBRkwsVUFBUDtBQUlILE1BTmE7O0FBT2RDLFNBQUk7QUFQVSxFQUFQLENBQVg7O0FBVUEsS0FBSUMsSUFBSSxzQkFBWUwsSUFBWixFQUFrQjtBQUFBLFlBQVFDLEtBQUtDLEtBQWI7QUFBQSxFQUFsQixFQUFzQyxVQUFVSSxLQUFWLEVBQWlCQyxRQUFqQixFQUEyQjtBQUNyRSxTQUFJQyxjQUFjQyxTQUFTQyxhQUFULENBQXVCLEtBQUtDLFFBQUwsQ0FBY1AsRUFBckMsQ0FBbEI7QUFDQVEsYUFBUUMsR0FBUixDQUFZUCxLQUFaLEVBQW1CQyxRQUFuQjtBQUNBLFNBQUlPLFNBQVNDLEtBQUssMkJBQVVQLFlBQVlRLFdBQXRCLEVBQW1D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QU9DLFNBQVAsS0FBcUIsV0FBOUMsRUFDSTtBQUNKLFNBQU1HLFNBQVMsRUFBZjs7QUFFQSxTQUFJQyxjQUFKLENBUnVDLENBUTVCO0FBQ1gsU0FBSUMsWUFBWUosTUFBTUksU0FBTixHQUFrQixDQUFsQyxDQVR1QyxDQVNGO0FBQ3JDLFlBQU8sQ0FBQ0QsUUFBUUgsTUFBTUssSUFBTixDQUFXUCxJQUFYLENBQVQsTUFBK0IsSUFBdEMsRUFBNEM7QUFDeEM7QUFDQSxhQUFJdkMsUUFBUTRDLE1BQU01QyxLQUFsQjs7QUFFQSxhQUFJQSxRQUFRNkMsU0FBWixFQUF1QjtBQUNuQkYsb0JBQU90RCxJQUFQLENBQVkwRCxLQUFLQyxTQUFMLENBQWVULEtBQUtoRCxLQUFMLENBQVdzRCxTQUFYLEVBQXNCN0MsS0FBdEIsQ0FBZixDQUFaO0FBQ0g7O0FBRUQsYUFBTWlELE1BQU1MLE1BQU0sQ0FBTixFQUFTTSxJQUFULEVBQVo7QUFDQXRJLGlCQUFRQyxHQUFSLENBQVksVUFBWixFQUF1QitILEtBQXZCO0FBQ0FELGdCQUFPdEQsSUFBUCxDQUFlbUQsU0FBZixTQUE0QlMsR0FBNUI7QUFDQUoscUJBQVk3QyxRQUFRNEMsTUFBTSxDQUFOLEVBQVM3QyxNQUE3QjtBQUNIO0FBQ0QsWUFBTzRDLE9BQU9RLElBQVAsQ0FBWSxHQUFaLENBQVA7QUFDSCxFIiwiZmlsZSI6ImNhbGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZmNDBjMGZmNDczOTNiZTU3MmEyXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFZNIGZyb20gJy4vdGlueVZNL2luc3RhbmNlL2luZGV4LmpzJztcclxuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi90aW55Vk0vb2JzZXJ2ZXIvd2F0Y2hlci5qcyc7XHJcbmltcG9ydCB7cGFyc2VUZXh0fSBmcm9tICcuL3RpbnlWTS9jb21waWxhci9wYXJzZXIvdGV4dC1wYXJzZXIuanMnO1xyXG5cclxubGV0IGRlbW8gPSBuZXcgVk0oe1xyXG4gICAgZGF0YSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpcnN0OiAnSGVsbG8sIHdvcmxkIScsXHJcbiAgICAgICAgICAgIHNlY29uZDogJ0hlbGxvLCBEYWRkeSdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGVsOiAnLmRpc3BsYXknXHJcbn0pO1xyXG5cclxubGV0IHcgPSBuZXcgV2F0Y2hlcihkZW1vLCBkYXRhID0+IGRhdGEuZmlyc3QsIGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIGxldCB0ZXh0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy4kb3B0aW9ucy5lbCk7XHJcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgbGV0IHJlc3VsdCA9IGV2YWwocGFyc2VUZXh0KHRleHRFbGVtZW50LnRleHRDb250ZW50LCAndGhpcycpKTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCA9IHJlc3VsdDtcclxufSk7XHJcblxyXG5uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkZW1vLmZpcnN0ID0gJ0Z1Y2sgeW91ISc7XHJcbiAgICAgICAgcmVzb2x2ZShkZW1vLmZpcnN0KTtcclxuICAgIH0sIDIwMDApO1xyXG59KS50aGVuKGRhdGEgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZGVtbyk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtpbml0TWl4aW59IGZyb20gJy4vaW5pdC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWTSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdEVsKCkge1xyXG4gICAgICAgIHRoaXMuJGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLiRvcHRpb25zLmVsKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5pbml0TWl4aW4oVk0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vaW5zdGFuY2UvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgdWlkID0gMDtcclxuXHJcbmltcG9ydCB7aW5pdExpZmVDeWNsZX0gZnJvbSAnLi9saWZlY3ljbGUuanMnO1xyXG5pbXBvcnQge2luaXRTdGF0ZX0gZnJvbSAnLi9zdGF0ZS5qcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1peGluKFZNKSB7XHJcbiAgICBWTS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uX3VpZCA9IHVpZCsrO1xyXG4gICAgICAgIHZtLl9pc1ZNID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgLy8gdG9kbyBmaXggQ29tcG9uZW50XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0sICfooqvotYvlgLzkuoYnLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdm0uJG9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uX3NlbGYgPSB2bTtcclxuICAgICAgICBpbml0TGlmZUN5Y2xlKHZtKTtcclxuICAgICAgICBpbml0U3RhdGUodm0pO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL2luc3RhbmNlL2luaXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdExpZmVDeWNsZSh2bSkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL2luc3RhbmNlL2xpZmVjeWNsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7b2JzZXJ2ZX0gZnJvbSAnLi4vb2JzZXJ2ZXIvaW5kZXguanMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFN0YXRlKHZtKSB7XHJcbiAgICB2bS5fd2F0Y2hlcnMgPSBbXTtcclxuICAgIGluaXREYXRhKHZtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdERhdGEodm0pIHtcclxuICAgIGNvbnN0IGRhdGFGbiA9IHZtLiRvcHRpb25zLmRhdGE7XHJcbiAgICBjb25zdCBkYXRhID0gdm0uX2RhdGEgPSB0eXBlb2YgZGF0YUZuID09PSAnZnVuY3Rpb24nID8gZGF0YUZuLmNhbGwodm0pIDogZGF0YUZuIHx8IHt9O1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIHByb3h5KHZtLCBrZXkpO1xyXG4gICAgfSk7XHJcbiAgICBvYnNlcnZlKGRhdGEpO1xyXG4gICAgZGF0YS5fX29iX18gJiYgZGF0YS5fX29iX18udm1Db3VudCsrO1xyXG59XHJcblxyXG4vKipcclxuICog5Luj55CG5bGe5oCnXHJcbiAqIEBwYXJhbSB2bSB7Vk19XHJcbiAqIEBwYXJhbSBrZXkge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHByb3h5KHZtLCBrZXkpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2bSwga2V5LCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgZ2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5fZGF0YVtrZXldO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xyXG4gICAgICAgICAgICB2bS5fZGF0YVtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vaW5zdGFuY2Uvc3RhdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQge2RlZmluZVJlYWN0aXZlfSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5pbXBvcnQgRGVwIGZyb20gJy4vZGVwLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHZhbHVlIHsqfVxyXG4gKiBAbWVtYmVyIGRlcCB7RGVwfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgeyp9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGVwID0gbmV3IERlcCgpO1xyXG4gICAgICAgIHRoaXMudm1Db3VudCA9IDA7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCAnX19vYl9fJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcyxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICA/IHRoaXMub2JzZXJ2ZXJBcnJheSh2YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGlzLndhbGsodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB3YWxrKG9iaikge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgb2JqW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgb2JzZXJ2ZXJTdGF0ZSA9IHtcclxuICAgIHNob3VsZENvbnZlcnQ6IHRydWUsXHJcbiAgICBpc1NldHRpbmdQcm9wczogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9iO1xyXG5cclxuICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcclxuXHJcbiAgICAgICAgb2IgPSB2YWx1ZS5fX29iX187XHJcbiAgICB9IGVsc2UgaWYgKG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSkge1xyXG4gICAgICAgIG9iID0gbmV3IE9ic2VydmVyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2I7XHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBEZXAgZnJvbSAnLi9kZXAuanMnO1xyXG5pbXBvcnQge29ic2VydmV9IGZyb20gJy4vaW5kZXguanMnO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cclxuICogQHBhcmFtIG9iaiB7T2JqZWN0fVxyXG4gKiBAcGFyYW0ga2V5IHtTdHJpbmd9XHJcbiAqIEBwYXJhbSB2YWwgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUob2JqLCBrZXksIHZhbCkge1xyXG4gICAgY29uc3QgZGVwID0gbmV3IERlcCgpO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcclxuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmYWxzZSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJvcGVydHlHZXR0ZXIgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZ2V0O1xyXG4gICAgY29uc3QgcHJvcGVydHlTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0O1xyXG5cclxuICAgIGxldCBjaGlsZE9ic2VydmVyID0gb2JzZXJ2ZSh2YWwpO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldCgpe1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnR5R2V0dGVyID8gcHJvcGVydHlHZXR0ZXIuY2FsbChvYmopIDogdmFsO1xyXG4gICAgICAgICAgICBpZiAoRGVwLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlcC50YXJnZXQgPSAnLCBEZXAudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGRlcC5kZXBlbmQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRPYnNlcnZlci5kZXAuZGVwZW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0KG5ld1ZhbCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydHlHZXR0ZXIgPyBwcm9wZXJ0eUdldHRlci5jYWxsKG9iaikgOiB2YWw7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydHlTZXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5U2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbmV3VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkT2JzZXJ2ZXIgPSBvYnNlcnZlKG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIGRlcC5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9oZWxwZXJzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4uL3V0aWwvaW5kZXguanMnO1xyXG5cclxubGV0IHVpZCA9IDA7XHJcblxyXG4vKipcclxuICog5YC855qE5L6d6LWWXHJcbiAqIEBtZW1iZXIgaWQge051bWJlcn1cclxuICogQG1lbWJlciBzdWJzIHtBcnJheX1cclxuICogQG1lbWJlciB0YXJnZXQgeyp9IEBzdGF0aWNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlkID0gdWlkKys7XHJcbiAgICAgICAgdGhpcy5zdWJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3ViKHN1Yikge1xyXG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKHN1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU3ViKHN1Yikge1xyXG4gICAgICAgIHJlbW92ZSh0aGlzLnN1YnMsIHN1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgZGVwZW5kKCkge1xyXG4gICAgICAgIGlmIChEZXAudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIERlcC50YXJnZXQuYWRkRGVwKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBub3RpZnkoKSB7XHJcbiAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuc3Vicy5zbGljZSgpO1xyXG4gICAgICAgIHN1YnMuZm9yRWFjaChzdWIgPT4ge1xyXG4gICAgICAgICAgICBzdWIudXBkYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkRlcC50YXJnZXQgPSBudWxsO1xyXG5cclxuY29uc3QgdGFyZ2V0U3RhY2sgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXNoVGFyZ2V0KF90YXJnZXQpIHtcclxuICAgIGlmIChEZXAudGFyZ2V0KVxyXG4gICAgICAgIHRhcmdldFN0YWNrLnB1c2goRGVwLnRhcmdldCk7XHJcbiAgICBEZXAudGFyZ2V0ID0gX3RhcmdldDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvcFRhcmdldCgpIHtcclxuICAgIERlcC50YXJnZXQgPSB0YXJnZXRTdGFjay5wb3AoKVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL29ic2VydmVyL2RlcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0ICogZnJvbSAnLi9vcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYW4gaXRlbSBmcm9tIGFuIGFycmF5XHJcbiAqIEBwYXJhbSBhcnIge0FycmF5PCo+fVxyXG4gKiBAcGFyYW0gaXRlbSB7Kn1cclxuICogQHJldHVybnMge0FycmF5PCo+IHwgdm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyLCBpdGVtKSB7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vdXRpbC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gcGFyZW50IHtPYmplY3R9XHJcbiAqIEBwYXJhbSBjaGlsZCB7T2JqZWN0fVxyXG4gKiBAcGFyYW0gdm0ge1ZNfVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQsIHZtKSB7XHJcbiAgICAvLyDop4TmoLzljJZcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vdXRpbC9vcHRpb25zLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IERlcCwge3B1c2hUYXJnZXQsIHBvcFRhcmdldH0gZnJvbSAnLi9kZXAnO1xyXG5pbXBvcnQge3F1ZXVlV2F0Y2hlcn0gZnJvbSAnLi9zY2hlZHVsZXIuanMnO1xyXG5cclxubGV0IHVpZCA9IDA7XHJcblxyXG5cclxuLyoqXHJcbiAqIHdhdGNoZXIg6Kej5p6Q5LiA5Liq6KGo6L6+5byPLCDmlLbpm4bkvp3otZZcclxuICog5b2T6KGo6L6+5byP55qE5YC85pS55Y+Y5pe2LCDosIPnlKjlm57osIPlh73mlbBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3Iodm0sIGV4cE9yRm4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy52bSA9IHZtO1xyXG4gICAgICAgIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHBPckZuLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuaWQgPSB1aWQrKztcclxuICAgICAgICB0aGlzLmRlcHMgPSBbXTtcclxuICAgICAgICB0aGlzLm5ld0RlcHMgPSBbXTtcclxuICAgICAgICB0aGlzLmRlcElkcyA9IG5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLm5ld0RlcElkcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgLy8g6K+t5rOV5YiG5p6Q6KGo6L6+5byPLCDlvpfliLDojrflj5bor6XlgLznmoRnZXR0ZXLlh73mlbBcclxuICAgICAgICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXR0ZXIgPSBleHBPckZuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRvZG86IHBhcnNlIHRoZSBleHByZXNzaW9uXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcuLlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtleHBPckZufSDop6PmnpDlpLHotKVgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHB1c2hUYXJnZXQodGhpcyk7IC8vIOaOqOWFpeWFqOWxgOS+nei1luagiFxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh0aGlzLnZtLCB0aGlzLnZtKTsgLy8g6Kem5Y+R5LqG5a+56LGh55qEZ2V0dGVyLCDojrflj5bkvp3otZZcclxuICAgICAgICBwb3BUYXJnZXQoKTtcclxuICAgICAgICAvLyB0b2RvXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZERlcChkZXApIHtcclxuICAgICAgICBjb25zdCBpZCA9IGRlcC5pZDtcclxuXHJcbiAgICAgICAgLy8g5aaC5p6c6L+Z5LiqaWTkuI3lnKjmlrDkvp3otZbkuK1cclxuICAgICAgICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdEZXBzLnB1c2goZGVwKTtcclxuICAgICAgICAgICAgLy8g5aaC5p6c5pen55qE5L6d6LWWSUTorrDlvZXmsqHmnInov5nkuKrkvp3otZZcclxuICAgICAgICAgICAgLy8g5oqKV2F0Y2hlcuWunuS+i+a3u+WKoOWIsOS+nei1lueahOiuoumYheiAheS4rVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgIGRlcC5hZGRTdWIodGhpcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgcXVldWVXYXRjaGVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy4nLCB1aWQsICdydW7osIPnlKjkuoYnKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KCk7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAvLyB0b2RvOiBpZiBpcyB1c2VyXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci93YXRjaGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGhhcyA9IHt9O1xyXG5sZXQgaXNGbHVzaGluZyA9IGZhbHNlO1xyXG5sZXQgaXNXYWl0aW5nID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQHR5cGUge0FycmF5PFdhdGNoZXI+fVxyXG4gKi9cclxuY29uc3QgcXVldWUgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0U2NoZWR1bGVyU3RhdGUoKSB7XHJcbiAgICBxdWV1ZS5sZW5ndGggPSAwOyAvLyBjbGVhciB0aGUgcXVldWVcclxuICAgIGhhcyA9IHt9O1xyXG4gICAgaXNXYWl0aW5nID0gaXNGbHVzaGluZyA9IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmbHVzaFNjaGVkdWxlclF1ZXVlKCkge1xyXG4gICAgaXNGbHVzaGluZyA9IHRydWU7XHJcbiAgICBxdWV1ZS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGEuaWQgLSBiLmlkO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcXVldWUuZm9yRWFjaCh3YXRjaGVyID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHdhdGNoZXIuaWQ7XHJcbiAgICAgICAgaGFzW2lkXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgd2F0Y2hlci5ydW4oKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBoYXNbaWRdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHdhdGNoZXIuZXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXNldFNjaGVkdWxlclN0YXRlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWV1ZVdhdGNoZXIod2F0Y2hlcikge1xyXG4gICAgY29uc3QgaWQgPSB3YXRjaGVyLmlkO1xyXG4gICAgaWYgKHR5cGVvZiBoYXNbaWRdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGhhc1tpZF0gPSB0cnVlO1xyXG4gICAgICAgIGlmICghaXNGbHVzaGluZykge1xyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHdhdGNoZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gcXVldWUubGVuZ3RoIC0gMTsgLy8gdGhlIGxhc3RcclxuICAgICAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiBxdWV1ZVtpXS5pZCA+IHdhdGNoZXIuaWQpIHtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBub3cgcXVldWVbaV0uaWQgPHw9PT0gd2F0Y2hlci5pZFxyXG4gICAgICAgICAgICBxdWV1ZS5zcGxpY2UoTWF0aC5tYXgoaSwgMCkgKyAxLCAwLCB3YXRjaGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNXYWl0aW5nKSB7XHJcbiAgICAgICAgICAgIGlzV2FpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZmx1c2hTY2hlZHVsZXJRdWV1ZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL29ic2VydmVyL3NjaGVkdWxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IGRlZmF1bHRUYWdSRSA9IC9cXHtcXHsoKD86LnxcXG4pKz8pXFx9XFx9L2c7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHRleHQge3N0cmluZ31cclxuICogQHBhcmFtIGN0eFN0cmluZyB7c3RyaW5nfVxyXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCB2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGV4dCh0ZXh0LCBjdHhTdHJpbmcpIHtcclxuICAgIGNvbnN0IHRhZ1JFID0gZGVmYXVsdFRhZ1JFO1xyXG5cclxuICAgIC8vIOWmguaenOayoeacieWPjOaLrOWPt1xyXG4gICAgaWYgKCF0YWdSRS50ZXN0KHRleHQpIHx8IHR5cGVvZiBjdHhTdHJpbmcgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHRva2VucyA9IFtdO1xyXG5cclxuICAgIGxldCBtYXRjaDsgLy8g5Yy56YWN5L+h5oGvXHJcbiAgICBsZXQgbGFzdEluZGV4ID0gdGFnUkUubGFzdEluZGV4ID0gMDsgLy8g5LiK5LiA5qyh5Yy56YWN5Yiw55qE5L2N572uXHJcbiAgICB3aGlsZSAoKG1hdGNoID0gdGFnUkUuZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcclxuICAgICAgICAvL+WMuemFjeeahOWIneWni+S9jee9rlxyXG4gICAgICAgIGxldCBpbmRleCA9IG1hdGNoLmluZGV4O1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcclxuICAgICAgICAgICAgdG9rZW5zLnB1c2goSlNPTi5zdHJpbmdpZnkodGV4dC5zbGljZShsYXN0SW5kZXgsIGluZGV4KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXhwID0gbWF0Y2hbMV0udHJpbSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXRjaCA9ICcsbWF0Y2gpO1xyXG4gICAgICAgIHRva2Vucy5wdXNoKGAke2N0eFN0cmluZ30uJHtleHB9YCk7XHJcbiAgICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9rZW5zLmpvaW4oJysnKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vY29tcGlsYXIvcGFyc2VyL3RleHQtcGFyc2VyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==