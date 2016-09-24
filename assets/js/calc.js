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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inex = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VM = function () {
	    function VM(options) {
	        _classCallCheck(this, VM);
	
	        var vm = this;
	        vm.$options = options;
	        this._init();
	    }
	
	    _createClass(VM, [{
	        key: '_init',
	        value: function _init() {
	            this._initData();
	        }
	    }, {
	        key: '_initEl',
	        value: function _initEl() {
	            this.$el = document.querySelector(this.$options.el);
	        }
	    }, {
	        key: '_initData',
	        value: function _initData() {
	            var _this = this;
	
	            var dataFn = this.$options.data;
	            var data = this._data = typeof dataFn === 'function' ? dataFn() : dataFn;
	            Object.keys(data).forEach(function (key) {
	                if (data.hasOwnProperty(key)) {
	                    _this._proxy(key);
	                }
	            });
	            console.log('开始观察', data);
	            (0, _inex.observe)(data);
	        }
	    }, {
	        key: '_proxy',
	        value: function _proxy(key) {
	            var _this2 = this;
	
	            Object.defineProperty(this, key, {
	                configurable: true,
	                enumerable: true,
	                get: function get() {
	                    return _this2._data[key];
	                },
	                set: function set(val) {
	                    _this2._data[key] = val;
	                }
	            });
	        }
	    }]);
	
	    return VM;
	}();
	
	var demo = new VM({
	    data: function data() {
	        return {
	            value: 'Hello, world!'
	        };
	    },
	
	    el: '.display'
	});
	
	console.log(demo);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.observerState = exports.Observer = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.observe = observe;
	
	var _helpers = __webpack_require__(2);
	
	var _dep = __webpack_require__(3);
	
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defineReactive = defineReactive;
	
	var _dep = __webpack_require__(3);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _inex = __webpack_require__(1);
	
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
	
	    var childObserver = (0, _inex.observe)(val);
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.pushTarget = pushTarget;
	exports.popTarget = popTarget;
	
	var _util = __webpack_require__(4);
	
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
	            (0, _util.remove)(this.subs, sub);
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
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Remove an item from an array
	 * @param arr {Array<*>}
	 * @param item {*}
	 * @returns {Array<*> | void}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.remove = remove;
	function remove(arr, item) {
	    if (arr.length) {
	        var index = arr.indexOf(item);
	        if (index > -1) {
	            return arr.splice(index, 1);
	        }
	    }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjhiMWMyZTA0YmVjYmM2ZWMzZmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aW55Vk0vb2JzZXJ2ZXIvaW5leC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlueVZNL29ic2VydmVyL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS9vYnNlcnZlci9kZXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbnlWTS91dGlsLmpzIl0sIm5hbWVzIjpbIlZNIiwib3B0aW9ucyIsInZtIiwiJG9wdGlvbnMiLCJfaW5pdCIsIl9pbml0RGF0YSIsIiRlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImVsIiwiZGF0YUZuIiwiZGF0YSIsIl9kYXRhIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsImtleSIsIl9wcm94eSIsImNvbnNvbGUiLCJsb2ciLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJ2YWwiLCJkZW1vIiwidmFsdWUiLCJvYnNlcnZlIiwiT2JzZXJ2ZXIiLCJkZXAiLCJ3cml0YWJsZSIsIkFycmF5IiwiaXNBcnJheSIsIm9ic2VydmVyQXJyYXkiLCJ3YWxrIiwib2JqIiwib2JzZXJ2ZXJTdGF0ZSIsInNob3VsZENvbnZlcnQiLCJpc1NldHRpbmdQcm9wcyIsIm9iIiwiX19vYl9fIiwiaXNFeHRlbnNpYmxlIiwiZGVmaW5lUmVhY3RpdmUiLCJkZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicHJvcGVydHlHZXR0ZXIiLCJwcm9wZXJ0eVNldHRlciIsImNoaWxkT2JzZXJ2ZXIiLCJjYWxsIiwidGFyZ2V0IiwiZGVwZW5kIiwicHVzaFRhcmdldCIsInBvcFRhcmdldCIsInVpZCIsIkRlcCIsImlkIiwic3VicyIsInN1YiIsInB1c2giLCJhZGREZXAiLCJzbGljZSIsInVwZGF0ZSIsInRhcmdldFN0YWNrIiwiX3RhcmdldCIsInBvcCIsInJlbW92ZSIsImFyciIsIml0ZW0iLCJsZW5ndGgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7O0FBRUE7Ozs7S0FFTUEsRTtBQUNGLGlCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQU1DLEtBQUssSUFBWDtBQUNBQSxZQUFHQyxRQUFILEdBQWNGLE9BQWQ7QUFDQSxjQUFLRyxLQUFMO0FBQ0g7Ozs7aUNBRU87QUFDSixrQkFBS0MsU0FBTDtBQUNIOzs7bUNBRVM7QUFDTixrQkFBS0MsR0FBTCxHQUFXQyxTQUFTQyxhQUFULENBQXVCLEtBQUtMLFFBQUwsQ0FBY00sRUFBckMsQ0FBWDtBQUNIOzs7cUNBRVc7QUFBQTs7QUFDUixpQkFBTUMsU0FBUyxLQUFLUCxRQUFMLENBQWNRLElBQTdCO0FBQ0EsaUJBQU1BLE9BQU8sS0FBS0MsS0FBTCxHQUFhLE9BQU9GLE1BQVAsS0FBa0IsVUFBbEIsR0FBK0JBLFFBQS9CLEdBQTBDQSxNQUFwRTtBQUNBRyxvQkFBT0MsSUFBUCxDQUFZSCxJQUFaLEVBQWtCSSxPQUFsQixDQUEwQixlQUFPO0FBQzdCLHFCQUFJSixLQUFLSyxjQUFMLENBQW9CQyxHQUFwQixDQUFKLEVBQThCO0FBQzFCLDJCQUFLQyxNQUFMLENBQVlELEdBQVo7QUFDSDtBQUNKLGNBSkQ7QUFLQUUscUJBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CVCxJQUFwQjtBQUNBLGdDQUFRQSxJQUFSO0FBQ0g7OztnQ0FFTU0sRyxFQUFLO0FBQUE7O0FBQ1JK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QUFVSSxLQUFWLEVBQWI7QUFDQUosa0JBQUszQyxPQUFMLENBQWEsZUFBTztBQUNoQjRDLHFCQUFJSSxNQUFKO0FBQ0gsY0FGRDtBQUdIOzs7Ozs7bUJBekJnQlAsRzs7O0FBNEJyQkEsS0FBSUwsTUFBSixHQUFhLElBQWI7O0FBRUEsS0FBTWEsY0FBYyxFQUFwQjs7QUFFTyxVQUFTWCxVQUFULENBQW9CWSxPQUFwQixFQUE2QjtBQUNoQyxTQUFJVCxJQUFJTCxNQUFSLEVBQ0lhLFlBQVlKLElBQVosQ0FBaUJKLElBQUlMLE1BQXJCO0FBQ0pLLFNBQUlMLE1BQUosR0FBYWMsT0FBYjtBQUNIOztBQUVNLFVBQVNYLFNBQVQsR0FBcUI7QUFDeEJFLFNBQUlMLE1BQUosR0FBYWEsWUFBWUUsR0FBWixFQUFiO0FBQ0gsRTs7Ozs7O0FDbkREOztBQUVBOzs7Ozs7Ozs7O1NBTWdCQyxNLEdBQUFBLE07QUFBVCxVQUFTQSxNQUFULENBQWdCQyxHQUFoQixFQUFxQkMsSUFBckIsRUFBMkI7QUFDOUIsU0FBSUQsSUFBSUUsTUFBUixFQUFnQjtBQUNaLGFBQU1DLFFBQVFILElBQUlJLE9BQUosQ0FBWUgsSUFBWixDQUFkO0FBQ0EsYUFBSUUsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDWixvQkFBT0gsSUFBSUssTUFBSixDQUFXRixLQUFYLEVBQWtCLENBQWxCLENBQVA7QUFDSDtBQUNKO0FBQ0osRSIsImZpbGUiOiJjYWxjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2OGIxYzJlMDRiZWNiYzZlYzNmYVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7b2JzZXJ2ZX0gZnJvbSAnLi90aW55Vk0vb2JzZXJ2ZXIvaW5leC5qcyc7XHJcblxyXG5jbGFzcyBWTSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3Qgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLiRvcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdEVsKCkge1xyXG4gICAgICAgIHRoaXMuJGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLiRvcHRpb25zLmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YUZuID0gdGhpcy4kb3B0aW9ucy5kYXRhO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhID0gdHlwZW9mIGRhdGFGbiA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGFGbigpIDogZGF0YUZuO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJveHkoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflvIDlp4vop4Llr58nLCBkYXRhKTtcclxuICAgICAgICBvYnNlcnZlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcm94eShrZXkpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgZGVtbyA9IG5ldyBWTSh7XHJcbiAgICBkYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdIZWxsbywgd29ybGQhJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZWw6ICcuZGlzcGxheSdcclxufSk7XHJcblxyXG5jb25zb2xlLmxvZyhkZW1vKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7ZGVmaW5lUmVhY3RpdmV9IGZyb20gJy4vaGVscGVycy5qcyc7XHJcbmltcG9ydCBEZXAgZnJvbSAnLi9kZXAuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBtZW1iZXIgdmFsdWUgeyp9XHJcbiAqIEBtZW1iZXIgZGVwIHtEZXB9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB2YWx1ZSB7Kn1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5kZXAgPSBuZXcgRGVwKCk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCAnX19vYl9fJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcyxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICA/IHRoaXMub2JzZXJ2ZXJBcnJheSh2YWx1ZSlcclxuICAgICAgICAgICAgOiB0aGlzLndhbGsodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB3YWxrKG9iaikge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgb2JqW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgb2JzZXJ2ZXJTdGF0ZSA9IHtcclxuICAgIHNob3VsZENvbnZlcnQ6IHRydWUsXHJcbiAgICBpc1NldHRpbmdQcm9wczogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSwgJ+S4jeaYr+WvueixoeWTpicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2I7XHJcblxyXG4gICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdfX29iX18nKSAmJiB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlcikge1xyXG5cclxuICAgICAgICBvYiA9IHZhbHVlLl9fb2JfXztcclxuICAgICAgICBjb25zb2xlLmxvZygn55u05o6l6L+U5Zue5LqGJywgb2IpO1xyXG4gICAgfSBlbHNlIGlmIChvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkpIHtcclxuICAgICAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIm+W7uuS6hicsIG9iKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2I7XHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9pbmV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IERlcCBmcm9tICcuL2RlcC5qcyc7XHJcbmltcG9ydCB7b2JzZXJ2ZX0gZnJvbSAnLi9pbmV4LmpzJztcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgYSByZWFjdGl2ZSBwcm9wZXJ0eSBvbiBhbiBPYmplY3QuXHJcbiAqIEBwYXJhbSBvYmoge09iamVjdH1cclxuICogQHBhcmFtIGtleSB7U3RyaW5nfVxyXG4gKiBAcGFyYW0gdmFsIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlKG9iaiwga2V5LCB2YWwpIHtcclxuICAgIGNvbnN0IGRlcCA9IG5ldyBEZXAoKTtcclxuXHJcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XHJcbiAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3BlcnR5R2V0dGVyID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmdldDtcclxuICAgIGNvbnN0IHByb3BlcnR5U2V0dGVyID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnNldDtcclxuXHJcbiAgICBsZXQgY2hpbGRPYnNlcnZlciA9IG9ic2VydmUodmFsKTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBnZXQoKXtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0eUdldHRlciA/IHByb3BlcnR5R2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcclxuICAgICAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXAudGFyZ2V0ID0gJywgRGVwLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBkZXAuZGVwZW5kKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkT2JzZXJ2ZXIuZGVwLmRlcGVuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RpbnlWTS9vYnNlcnZlci9oZWxwZXJzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHtyZW1vdmV9IGZyb20gJy4uL3V0aWwuanMnO1xyXG5cclxubGV0IHVpZCA9IDA7XHJcblxyXG4vKipcclxuICogQG1lbWJlciBpZCB7TnVtYmVyfVxyXG4gKiBAbWVtYmVyIHN1YnMge0FycmF5fVxyXG4gKiBAbWVtYmVyIHRhcmdldCB7Kn0gQHN0YXRpY1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSB1aWQrKztcclxuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdWIoc3ViKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goc3ViKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTdWIoc3ViKSB7XHJcbiAgICAgICAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXBlbmQoKSB7XHJcbiAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcclxuICAgICAgICAgICAgRGVwLnRhcmdldC5hZGREZXAodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSgpIHtcclxuICAgICAgICBjb25zdCBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XHJcbiAgICAgICAgc3Vicy5mb3JFYWNoKHN1YiA9PiB7XHJcbiAgICAgICAgICAgIHN1Yi51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuRGVwLnRhcmdldCA9IG51bGw7XHJcblxyXG5jb25zdCB0YXJnZXRTdGFjayA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUYXJnZXQoX3RhcmdldCkge1xyXG4gICAgaWYgKERlcC50YXJnZXQpXHJcbiAgICAgICAgdGFyZ2V0U3RhY2sucHVzaChEZXAudGFyZ2V0KTtcclxuICAgIERlcC50YXJnZXQgPSBfdGFyZ2V0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9wVGFyZ2V0KCkge1xyXG4gICAgRGVwLnRhcmdldCA9IHRhcmdldFN0YWNrLnBvcCgpXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vb2JzZXJ2ZXIvZGVwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcclxuICogQHBhcmFtIGFyciB7QXJyYXk8Kj59XHJcbiAqIEBwYXJhbSBpdGVtIHsqfVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8Kj4gfCB2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShhcnIsIGl0ZW0pIHtcclxuICAgIGlmIChhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90aW55Vk0vdXRpbC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=