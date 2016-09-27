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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var demo = new _index2.default({
	    data: function data() {
	        return {
	            value: 'Hello, world!'
	        };
	    },
	
	    el: '.display'
	});
	
	var w = new _watcher2.default(demo, function (data) {
	    return data.value;
	}, function (vm, value, oldValue) {
	    var text = document.querySelector(vm.$options.el).textContent;
	    console.log('text = ', text);
	    text.replace(/\{\{*\}\}/, value);
	});
	
	console.log(demo);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(2);
	
	var _init = __webpack_require__(7);
	
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
	exports.observerState = exports.Observer = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.observe = observe;
	
	var _helpers = __webpack_require__(3);
	
	var _dep = __webpack_require__(4);
	
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
	        console.log(value, '不是对象哦');
	        return;
	    }
	
	    var ob = void 0;
	
	    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
	
	        ob = value.__ob__;
	        console.log('直接返回了', ob);
	    } else if (observerState.shouldConvert && Object.isExtensible(value)) {
	        ob = new Observer(value);
	        console.log('创建了', ob);
	    }
	
	    return ob;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defineReactive = defineReactive;
	
	var _dep = __webpack_require__(4);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _index = __webpack_require__(2);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.pushTarget = pushTarget;
	exports.popTarget = popTarget;
	
	var _index = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	/**
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _options = __webpack_require__(6);
	
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initMixin = initMixin;
	
	var _lifecycle = __webpack_require__(8);
	
	var _state = __webpack_require__(9);
	
	var uid = 0;
	
	function initMixin(VM) {
	    VM.prototype._init = function (options) {
	        var vm = this;
	
	        vm._uid = uid++;
	        vm._isVM = true;
	
	        if (options && options._isComponent) {
	            // todo fix Component
	        } else {
	            vm.$options = options;
	        }
	
	        vm._self = vm;
	        (0, _lifecycle.initLifeCycle)(vm);
	        (0, _state.initState)(vm);
	    };
	}

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initState = initState;
	
	var _index = __webpack_require__(2);
	
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
	    console.log('开始观察', data);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dep = __webpack_require__(4);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _scheduler = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
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
	
	        if (typeof expOrFn === 'function') {
	            this.getter = expOrFn;
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2VjMjg1MTk0ZGVlYzMyODVkMTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vaW5zdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9vYnNlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL29ic2VydmVyL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9vYnNlcnZlci9kZXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vdXRpbC9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vaW5zdGFuY2UvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL2luc3RhbmNlL2xpZmVjeWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL2luc3RhbmNlL3N0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vb2JzZXJ2ZXIvd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL29ic2VydmVyL3NjaGVkdWxlci5qcyJdLCJuYW1lcyI6WyJkZW1vIiwiZGF0YSIsInZhbHVlIiwiZWwiLCJ3Iiwidm0iLCJvbGRWYWx1ZSIsInRleHQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCIkb3B0aW9ucyIsInRleHRDb250ZW50IiwiY29uc29sZSIsImxvZyIsInJlcGxhY2UiLCJWTSIsIm9wdGlvbnMiLCJfaW5pdCIsIiRlbCIsIm9ic2VydmUiLCJPYnNlcnZlciIsImRlcCIsInZtQ291bnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImNvbmZpZ3VyYWJsZSIsIkFycmF5IiwiaXNBcnJheSIsIm9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JqIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvYnNlcnZlclN0YXRlIiwic2hvdWxkQ29udmVydCIsImlzU2V0dGluZ1Byb3BzIiwib2IiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fb2JfXyIsImlzRXh0ZW5zaWJsZSIsImRlZmluZVJlYWN0aXZlIiwidmFsIiwiZGVzY3JpcHRvciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInByb3BlcnR5R2V0dGVyIiwiZ2V0IiwicHJvcGVydHlTZXR0ZXIiLCJzZXQiLCJjaGlsZE9ic2VydmVyIiwiY2FsbCIsInRhcmdldCIsImRlcGVuZCIsIm5ld1ZhbCIsIm5vdGlmeSIsInB1c2hUYXJnZXQiLCJwb3BUYXJnZXQiLCJ1aWQiLCJEZXAiLCJpZCIsInN1YnMiLCJzdWIiLCJwdXNoIiwiYWRkRGVwIiwic2xpY2UiLCJ1cGRhdGUiLCJ0YXJnZXRTdGFjayIsIl90YXJnZXQiLCJwb3AiLCJyZW1vdmUiLCJhcnIiLCJpdGVtIiwibGVuZ3RoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWVyZ2VPcHRpb25zIiwicGFyZW50IiwiY2hpbGQiLCJpbml0TWl4aW4iLCJwcm90b3R5cGUiLCJfdWlkIiwiX2lzVk0iLCJfaXNDb21wb25lbnQiLCJfc2VsZiIsImluaXRMaWZlQ3ljbGUiLCJpbml0U3RhdGUiLCJfd2F0Y2hlcnMiLCJpbml0RGF0YSIsImRhdGFGbiIsIl9kYXRhIiwicHJveHkiLCJXYXRjaGVyIiwiZXhwT3JGbiIsImNhbGxiYWNrIiwiZXhwcmVzc2lvbiIsInRvU3RyaW5nIiwiZGVwcyIsIm5ld0RlcHMiLCJkZXBJZHMiLCJTZXQiLCJuZXdEZXBJZHMiLCJnZXR0ZXIiLCJoYXMiLCJhZGQiLCJhZGRTdWIiLCJxdWV1ZVdhdGNoZXIiLCJpc0ZsdXNoaW5nIiwiaXNXYWl0aW5nIiwicXVldWUiLCJyZXNldFNjaGVkdWxlclN0YXRlIiwiZmx1c2hTY2hlZHVsZXJRdWV1ZSIsInNvcnQiLCJhIiwiYiIsIndhdGNoZXIiLCJ1bmRlZmluZWQi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QUksQ0FBQ1AsU0FBTCxFQUFnQjtBQUNaQSx5QkFBWSxJQUFaO0FBQ0FjLHdCQUFXWCxtQkFBWCxFQUFnQyxDQUFoQztBQUNIO0FBQ0o7QUFDSixFIiwiZmlsZSI6ImNhbGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNlYzI4NTE5NGRlZWMzMjg1ZDE2XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFZNIGZyb20gJy4vdGlueVZNL2luc3RhbmNlL2luZGV4LmpzJztcclxuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi90aW55Vk0vb2JzZXJ2ZXIvd2F0Y2hlci5qcyc7XHJcblxyXG5sZXQgZGVtbyA9IG5ldyBWTSh7XHJcbiAgICBkYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdIZWxsbywgd29ybGQhJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZWw6ICcuZGlzcGxheSdcclxufSk7XHJcblxyXG5sZXQgdyA9IG5ldyBXYXRjaGVyKGRlbW8sIGRhdGEgPT4gZGF0YS52YWx1ZSwgKHZtLCB2YWx1ZSwgb2xkVmFsdWUpID0+IHtcclxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZtLiRvcHRpb25zLmVsKS50ZXh0Q29udGVudDtcclxuICAgIGNvbnNvbGUubG9nKCd0ZXh0ID0gJywgdGV4dCk7XHJcbiAgICB0ZXh0LnJlcGxhY2UoL1xce1xceypcXH1cXH0vLCB2YWx1ZSk7XHJcbn0pO1xyXG5cclxuY29uc29sZS5sb2coZGVtbyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQge29ic2VydmV9IGZyb20gJy4uL29ic2VydmVyL2luZGV4LmpzJztcclxuaW1wb3J0IHtpbml0TWl4aW59IGZyb20gJy4vaW5pdC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWTSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdEVsKCkge1xyXG4gICAgICAgIHRoaXMuJGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLiRvcHRpb25zLmVsKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5pbml0TWl4aW4oVk0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vaW5zdGFuY2UvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQge2RlZmluZVJlYWN0aXZlfSBmcm9tICcuL2hlbHBlcnMuanMnO1xyXG5pbXBvcnQgRGVwIGZyb20gJy4vZGVwLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHZhbHVlIHsqfVxyXG4gKiBAbWVtYmVyIGRlcCB7RGVwfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgeyp9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGVwID0gbmV3IERlcCgpO1xyXG4gICAgICAgIHRoaXMudm1Db3VudCA9IDA7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCAnX19vYl9fJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcyxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICA/IHRoaXMub2JzZXJ2ZXJBcnJheSh2YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGlzLndhbGsodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB3YWxrKG9iaikge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgb2JqW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgb2JzZXJ2ZXJTdGF0ZSA9IHtcclxuICAgIHNob3VsZENvbnZlcnQ6IHRydWUsXHJcbiAgICBpc1NldHRpbmdQcm9wczogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSwgJ+S4jeaYr+WvueixoeWTpicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2I7XHJcblxyXG4gICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdfX29iX18nKSAmJiB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlcikge1xyXG5cclxuICAgICAgICBvYiA9IHZhbHVlLl9fb2JfXztcclxuICAgICAgICBjb25zb2xlLmxvZygn55u05o6l6L+U5Zue5LqGJywgb2IpO1xyXG4gICAgfSBlbHNlIGlmIChvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkpIHtcclxuICAgICAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIm+W7uuS6hicsIG9iKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2I7XHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBEZXAgZnJvbSAnLi9kZXAuanMnO1xyXG5pbXBvcnQge29ic2VydmV9IGZyb20gJy4vaW5kZXguanMnO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cclxuICogQHBhcmFtIG9iaiB7T2JqZWN0fVxyXG4gKiBAcGFyYW0ga2V5IHtTdHJpbmd9XHJcbiAqIEBwYXJhbSB2YWwgeyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUob2JqLCBrZXksIHZhbCkge1xyXG4gICAgY29uc3QgZGVwID0gbmV3IERlcCgpO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcclxuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmYWxzZSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJvcGVydHlHZXR0ZXIgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZ2V0O1xyXG4gICAgY29uc3QgcHJvcGVydHlTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0O1xyXG5cclxuICAgIGxldCBjaGlsZE9ic2VydmVyID0gb2JzZXJ2ZSh2YWwpO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldCgpe1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnR5R2V0dGVyID8gcHJvcGVydHlHZXR0ZXIuY2FsbChvYmopIDogdmFsO1xyXG4gICAgICAgICAgICBpZiAoRGVwLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlcC50YXJnZXQgPSAnLCBEZXAudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGRlcC5kZXBlbmQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRPYnNlcnZlci5kZXAuZGVwZW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0KG5ld1ZhbCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydHlHZXR0ZXIgPyBwcm9wZXJ0eUdldHRlci5jYWxsKG9iaikgOiB2YWw7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydHlTZXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5U2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbmV3VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkT2JzZXJ2ZXIgPSBvYnNlcnZlKG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIGRlcC5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9oZWxwZXJzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4uL3V0aWwvaW5kZXguanMnO1xyXG5cclxubGV0IHVpZCA9IDA7XHJcblxyXG4vKipcclxuICogQG1lbWJlciBpZCB7TnVtYmVyfVxyXG4gKiBAbWVtYmVyIHN1YnMge0FycmF5fVxyXG4gKiBAbWVtYmVyIHRhcmdldCB7Kn0gQHN0YXRpY1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSB1aWQrKztcclxuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdWIoc3ViKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goc3ViKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTdWIoc3ViKSB7XHJcbiAgICAgICAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXBlbmQoKSB7XHJcbiAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcclxuICAgICAgICAgICAgRGVwLnRhcmdldC5hZGREZXAodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSgpIHtcclxuICAgICAgICBjb25zdCBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XHJcbiAgICAgICAgc3Vicy5mb3JFYWNoKHN1YiA9PiB7XHJcbiAgICAgICAgICAgIHN1Yi51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuRGVwLnRhcmdldCA9IG51bGw7XHJcblxyXG5jb25zdCB0YXJnZXRTdGFjayA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUYXJnZXQoX3RhcmdldCkge1xyXG4gICAgaWYgKERlcC50YXJnZXQpXHJcbiAgICAgICAgdGFyZ2V0U3RhY2sucHVzaChEZXAudGFyZ2V0KTtcclxuICAgIERlcC50YXJnZXQgPSBfdGFyZ2V0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9wVGFyZ2V0KCkge1xyXG4gICAgRGVwLnRhcmdldCA9IHRhcmdldFN0YWNrLnBvcCgpXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vb2JzZXJ2ZXIvZGVwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcclxuICogQHBhcmFtIGFyciB7QXJyYXk8Kj59XHJcbiAqIEBwYXJhbSBpdGVtIHsqfVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8Kj4gfCB2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShhcnIsIGl0ZW0pIHtcclxuICAgIGlmIChhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS91dGlsL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBwYXJlbnQge09iamVjdH1cclxuICogQHBhcmFtIGNoaWxkIHtPYmplY3R9XHJcbiAqIEBwYXJhbSB2bSB7Vk19XHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZCwgdm0pIHtcclxuICAgIC8vIOinhOagvOWMllxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS91dGlsL29wdGlvbnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgdWlkID0gMDtcclxuXHJcbmltcG9ydCB7aW5pdExpZmVDeWNsZX0gZnJvbSAnLi9saWZlY3ljbGUuanMnO1xyXG5pbXBvcnQge2luaXRTdGF0ZX0gZnJvbSAnLi9zdGF0ZS5qcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1peGluKFZNKSB7XHJcbiAgICBWTS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uX3VpZCA9IHVpZCsrO1xyXG4gICAgICAgIHZtLl9pc1ZNID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgLy8gdG9kbyBmaXggQ29tcG9uZW50XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdm0uJG9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uX3NlbGYgPSB2bTtcclxuICAgICAgICBpbml0TGlmZUN5Y2xlKHZtKTtcclxuICAgICAgICBpbml0U3RhdGUodm0pO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL2luc3RhbmNlL2luaXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdExpZmVDeWNsZSh2bSkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL2luc3RhbmNlL2xpZmVjeWNsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7b2JzZXJ2ZX0gZnJvbSAnLi4vb2JzZXJ2ZXIvaW5kZXguanMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFN0YXRlKHZtKSB7XHJcbiAgICB2bS5fd2F0Y2hlcnMgPSBbXTtcclxuICAgIGluaXREYXRhKHZtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdERhdGEodm0pIHtcclxuICAgIGNvbnN0IGRhdGFGbiA9IHZtLiRvcHRpb25zLmRhdGE7XHJcbiAgICBjb25zdCBkYXRhID0gdm0uX2RhdGEgPSB0eXBlb2YgZGF0YUZuID09PSAnZnVuY3Rpb24nID8gZGF0YUZuLmNhbGwodm0pIDogZGF0YUZuIHx8IHt9O1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIHByb3h5KHZtLCBrZXkpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZygn5byA5aeL6KeC5a+fJywgZGF0YSk7XHJcbiAgICBvYnNlcnZlKGRhdGEpO1xyXG4gICAgZGF0YS5fX29iX18gJiYgZGF0YS5fX29iX18udm1Db3VudCsrO1xyXG59XHJcblxyXG4vKipcclxuICog5Luj55CG5bGe5oCnXHJcbiAqIEBwYXJhbSB2bSB7Vk19XHJcbiAqIEBwYXJhbSBrZXkge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHByb3h5KHZtLCBrZXkpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2bSwga2V5LCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgZ2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5fZGF0YVtrZXldO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xyXG4gICAgICAgICAgICB2bS5fZGF0YVtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vaW5zdGFuY2Uvc3RhdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgRGVwLCB7cHVzaFRhcmdldCwgcG9wVGFyZ2V0fSBmcm9tICcuL2RlcCc7XHJcbmltcG9ydCB7cXVldWVXYXRjaGVyfSBmcm9tICcuL3NjaGVkdWxlci5qcyc7XHJcblxyXG5sZXQgdWlkID0gMDtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHZtLCBleHBPckZuLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMudm0gPSB2bTtcclxuICAgICAgICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwT3JGbi50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmlkID0gdWlkKys7XHJcbiAgICAgICAgdGhpcy5kZXBzID0gW107XHJcbiAgICAgICAgdGhpcy5uZXdEZXBzID0gW107XHJcbiAgICAgICAgdGhpcy5kZXBJZHMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5uZXdEZXBJZHMgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcHVzaFRhcmdldCh0aGlzKTsgLy8g5o6o5YWl5YWo5bGA5L6d6LWW5qCIXHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHRoaXMudm0sIHRoaXMudm0pOyAvLyDop6blj5Hkuoblr7nosaHnmoRnZXR0ZXIsIOiOt+WPluS+nei1llxyXG4gICAgICAgIHBvcFRhcmdldCgpO1xyXG4gICAgICAgIC8vIHRvZG9cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVwKGRlcCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZGVwLmlkO1xyXG5cclxuICAgICAgICAvLyDlpoLmnpzov5nkuKppZOS4jeWcqOaWsOS+nei1luS4rVxyXG4gICAgICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld0RlcElkcy5hZGQoaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xyXG4gICAgICAgICAgICAvLyDlpoLmnpzml6fnmoTkvp3otZZJROiusOW9leayoeaciei/meS4quS+nei1llxyXG4gICAgICAgICAgICAvLyDmiopXYXRjaGVy5a6e5L6L5re75Yqg5Yiw5L6d6LWW55qE6K6i6ZiF6ICF5LitXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZXBJZHMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgZGVwLmFkZFN1Yih0aGlzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBxdWV1ZVdhdGNoZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXQoKTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIC8vIHRvZG86IGlmIGlzIHVzZXJcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGlueVZNL29ic2VydmVyL3dhdGNoZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgaGFzID0ge307XHJcbmxldCBpc0ZsdXNoaW5nID0gZmFsc2U7XHJcbmxldCBpc1dhaXRpbmcgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7QXJyYXk8V2F0Y2hlcj59XHJcbiAqL1xyXG5jb25zdCBxdWV1ZSA9IFtdO1xyXG5cclxuZnVuY3Rpb24gcmVzZXRTY2hlZHVsZXJTdGF0ZSgpIHtcclxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7IC8vIGNsZWFyIHRoZSBxdWV1ZVxyXG4gICAgaGFzID0ge307XHJcbiAgICBpc1dhaXRpbmcgPSBpc0ZsdXNoaW5nID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZsdXNoU2NoZWR1bGVyUXVldWUoKSB7XHJcbiAgICBpc0ZsdXNoaW5nID0gdHJ1ZTtcclxuICAgIHF1ZXVlLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICByZXR1cm4gYS5pZCAtIGIuaWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBxdWV1ZS5mb3JFYWNoKHdhdGNoZXIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gd2F0Y2hlci5pZDtcclxuICAgICAgICBoYXNbaWRdID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICB3YXRjaGVyLnJ1bigpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGhhc1tpZF0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iod2F0Y2hlci5leHByZXNzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJlc2V0U2NoZWR1bGVyU3RhdGUoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlV2F0Y2hlcih3YXRjaGVyKSB7XHJcbiAgICBjb25zdCBpZCA9IHdhdGNoZXIuaWQ7XHJcbiAgICBpZiAodHlwZW9mIGhhc1tpZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaGFzW2lkXSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCFpc0ZsdXNoaW5nKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlLnB1c2god2F0Y2hlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBxdWV1ZS5sZW5ndGggLSAxOyAvLyB0aGUgbGFzdFxyXG4gICAgICAgICAgICB3aGlsZSAoaSA+PSAwICYmIHF1ZXVlW2ldLmlkID4gd2F0Y2hlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG5vdyBxdWV1ZVtpXS5pZCA8fD09PSB3YXRjaGVyLmlkXHJcbiAgICAgICAgICAgIHF1ZXVlLnNwbGljZShNYXRoLm1heChpLCAwKSArIDEsIDAsIHdhdGNoZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc1dhaXRpbmcpIHtcclxuICAgICAgICAgICAgaXNXYWl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaFNjaGVkdWxlclF1ZXVlLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vb2JzZXJ2ZXIvc2NoZWR1bGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==