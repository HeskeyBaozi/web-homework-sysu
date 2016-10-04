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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var panelList = (0, _MyQuery.MyQuery)('#panel').on('click', function (e) {
	    console.log(e);
	});
	
	var vm = new _index2.default({
	    el: '#screen',
	    data: {
	        output: 'hello',
	        input: 'world'
	    }
	});
	
	vm.$watch('input', function (newValue, oldValue) {
	    console.log('newValue = ', newValue);
	    console.log('oldValue = ', oldValue);
	});
	
	new Promise(function (resolve, reject) {
	    setTimeout(function () {
	        resolve('fuck');
	    }, 1000);
	}).then(function (data) {
	    vm.input = data;
	});
	
	console.log(vm);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * 一个简单的类似jQuery的选择器
	 * @param DOMSelector
	 * @return {MyElement}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.MyQuery = MyQuery;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function MyQuery(DOMSelector) {
	    if (typeof DOMSelector === 'string') {
	        return new MyElement(DOMSelector);
	    }
	}
	
	var MyElement = function () {
	    function MyElement(DOMSelector) {
	        _classCallCheck(this, MyElement);
	
	        this.el = document.querySelector(DOMSelector);
	        Object.defineProperty(this.el, '__myElement__', {
	            enumerable: false,
	            writable: true,
	            configurable: true,
	            value: this
	        });
	    }
	
	    _createClass(MyElement, [{
	        key: 'on',
	        value: function on(EventName, callback) {
	            if (addEventListener) {
	                this.el.addEventListener(EventName.toLowerCase(), callback);
	            } else {
	                this.el['on' + EventName.toLowerCase()] = callback;
	            }
	            return this;
	        }
	    }]);

	    return MyElement;
	}();

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
	
	var VM = function () {
	    function VM() {
	        var _this = this;
	
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, VM);
	
	        this.$options = options;
	        this.$el = options.el;
	        this._data = options.data;
	        this._watchers = [];
	        Object.keys(this._data).forEach(function (key) {
	            proxy(_this, key);
	        });
	        (0, _index.observe)(this._data);
	    }
	
	    _createClass(VM, [{
	        key: '$watch',
	        value: function $watch(expOrFn, callback) {
	            var watcher = new _watcher2.default(this, expOrFn, callback);
	            this._watchers.push(watcher);
	        }
	    }]);
	
	    return VM;
	}();
	
	/**
	 * 代理属性
	 * @param vm {VM}
	 * @param key {String}
	 */
	
	
	exports.default = VM;
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
	            console.log('目前依赖: ', this.newDeps);
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

/***/ }
/******/ ]);
//# sourceMappingURL=calc.js.map