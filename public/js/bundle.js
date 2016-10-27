/*!
 * web-homework-sysu 0.0.0 - Modern Web Programming HomeWork - SYSU
 * Copyright (c) 2016 He Zhiyu - https://github.com/HeskeyBaozi/web-homework-sysu#readme
 * License: MIT
 */
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
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _helper = __webpack_require__(8);
	
	var _dataStructure = __webpack_require__(10);
	
	var _type = __webpack_require__(13);
	
	var _selector = __webpack_require__(11);
	
	var _algorithm = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *           That's Me!
	 *              ↓ ↓
	 * View <==> View-Model <==> Model
	 */
	var model = new _index2.default({
	    target: '.container',
	    data: {
	        imgUrl: '',
	        blockMap: Array.from(document.querySelectorAll('.block')).map(function (element, index) {
	            return { element: element, correctIndex: index };
	        }),
	        startButton: 'Start!',
	        gameState: _type.Type.Unstarted,
	        isRunning: false,
	        isWinner: false,
	        time: 0,
	        count: 0,
	        message: 'Welcome to play the Puzzle!!',
	        stepNumber: 15
	    }
	});
	
	/**
	 * the jquery object cache.
	 * @type {{$blank: (any), $loading: (any), $startBtn: (any), $selectors: (any), updater: (())}}
	 */
	var cache = {
	    $blank: (0, _jquery2.default)('#blk-15'),
	    $loading: (0, _jquery2.default)('#loading'),
	    $startBtn: (0, _jquery2.default)('#start'),
	    $selectors: (0, _jquery2.default)('.img-groups'),
	    updater: _helper.update.bind(model)
	};
	
	/****************************************************************
	 View-Callbacks
	 1. watch the variable of the model.
	 2. call the callback when the variable change.
	 3. then update the view by operating on the DOM node.
	 ****************************************************************/
	
	/**
	 * change the image.
	 */
	model.$watch('imgUrl', function (newValue, oldValue) {
	    var img = new Image();
	    var ctxArray = this.blockMap.map(function (object) {
	        return object.element.getContext('2d');
	    });
	    img.src = newValue;
	    img.onload = function () {
	        (0, _helper.drawCanvas)(ctxArray, img);
	    };
	});
	
	/**
	 * use the default image: KongFu Panda.
	 * @type {string}
	 */
	model.imgUrl = './img/panda.jpg';
	
	/**
	 * be reactive to the state of the game.
	 */
	model.$watch('gameState', function (newValue, oldValue) {
	    /**
	     * When the game starts...
	     */
	    if (_type.Type.Pending === newValue) {
	        handleBeginningGame(this);
	    }
	    /**
	     * When the game over or give up.
	     */
	    if (_type.Type.Pending === oldValue) {
	        handleEndingGame(this);
	    }
	});
	
	/**
	 * normalize data & style.
	 * @param model
	 */
	function handleBeginningGame(model) {
	    normalizeInitialGameData(model);
	    cache.$selectors.addClass('no-see');
	    beginCount(model);
	}
	
	/**
	 * set initial data of the game.
	 * @param model
	 */
	function normalizeInitialGameData(model) {
	    Object.assign(model, {
	        isRunning: false,
	        startButton: 'Give Up : (',
	        time: 0,
	        count: 0,
	        isWinner: false,
	        message: 'Game Starting...'
	    });
	}
	
	/**
	 * counting the time every 1s.
	 * @param model
	 */
	function beginCount(model) {
	    var timeUid = setInterval(function () {
	        if (model.gameState === _type.Type.Pending) {
	            model.time++;
	        } else clearInterval(timeUid);
	    }, 1000);
	}
	
	/**
	 * set data & style when game ending.
	 * @param model
	 */
	function handleEndingGame(model) {
	    if (model.isWinner) {
	        cache.$selectors.removeClass('no-see');
	    }
	    Object.assign(model, {
	        message: (model.isWinner ? 'Congratulations!' : 'Try your best.') + ' Time:' + model.time + ', Count:' + model.count,
	        startButton: model.isWinner ? 'Start!' : 'Getting Solution...',
	        time: 0,
	        count: 0
	    });
	}
	
	/**
	 * watch the block moving. update the style.
	 */
	model.$watch('isRunning', function (isRunning) {
	    if (isRunning) {
	        cache.$startBtn.addClass('disable-click');
	        cache.$selectors.addClass('no-see');
	    } else {
	        cache.$startBtn.removeClass('disable-click');
	    }
	});
	
	/****************************************************************
	 Event Handler
	 ****************************************************************/
	
	/**
	 * Move the block when it was clicked
	 * if it is near the blank Block.
	 */
	(0, _jquery2.default)('.playground').click(function (e) {
	    e.preventDefault();
	    var getIndex = (0, _helper.getterFactory)(model.blockMap, _selector.selectElement);
	    var nextDescriptor = (0, _helper.move)(getIndex(e.target), getIndex(cache.$blank[0]), model.blockMap);
	    if (!nextDescriptor) return;
	    _helper.update.call(model, nextDescriptor.state);
	    handleMovedMap(model);
	});
	
	/**
	 * set data & style after moving a block.
	 * @param model
	 */
	function handleMovedMap(model) {
	    if ((0, _helper.isSolved)(model.blockMap)) {
	        model.isWinner = true;
	        model.gameState = _type.Type.Unstarted;
	    }
	    if (model.gameState === _type.Type.Pending) {
	        model.count++;
	    }
	}
	
	cache.$startBtn.click(function (e) {
	    e.preventDefault();
	    /**
	     * refuse when the animate running.
	     */
	    if (model.isRunning) return;
	    if (model.gameState === _type.Type.Unstarted) {
	        startGame(model);
	    } else if (model.gameState === _type.Type.Pending) {
	        stopGame(model);
	    }
	});
	
	/**
	 * turn to starting.
	 * @param model {model}
	 */
	function startGame(model) {
	    /**
	     * Mix the puzzle.
	     * @type {string}
	     */
	    model.startButton = 'Mixing...';
	    (0, _helper.mix)(model, cache.$blank[0], cache.updater, _selector.selectElement).then(function () {
	        model.gameState = _type.Type.Pending;
	    });
	}
	
	/**
	 * turn to stopping game.
	 * @param model {model}
	 */
	function stopGame(model) {
	    model.gameState = _type.Type.Unstarted;
	    handleStoppingGame(model);
	    /**
	     * Use Algorithm to solve the problem.
	     */
	    asyncRunningAlgorithm(_algorithm.AStar, generateInitialNode(model, _selector.selectElement)).then(function (resultNode) {
	        return displaySolution(model, resultNode);
	    }).then(function () {
	        handleEndingDisplaying(model);
	    });
	}
	
	/**
	 * generate a initial parent Node for the algorithm.
	 * @param model
	 * @param selector
	 * @return {Node}
	 */
	function generateInitialNode(model, selector) {
	    var getIndex = (0, _helper.getterFactory)(model.blockMap, selector);
	    return new _dataStructure.Node(model.blockMap, getIndex(cache.$blank[0]), null);
	}
	
	/**
	 * set data & style when stopping the game.
	 * @param model
	 */
	function handleStoppingGame(model) {
	    cache.$loading.removeClass('disable-see');
	}
	
	/**
	 * running the algorithm after the UI handler.
	 * @param algorithm
	 * @param args
	 * @return {Promise}
	 */
	function asyncRunningAlgorithm(algorithm, args) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            resolve(algorithm(args));
	        }, 20);
	    });
	}
	
	/**
	 * collect the solution path and display it.
	 * @param model
	 * @param resultNode
	 * @return {Promise}
	 */
	function displaySolution(model, resultNode) {
	    var path = collectSolutionPath(resultNode);
	    handleResolvingDisplaying(model);
	    return new Promise(function (resolve, reject) {
	        (0, _helper.showSolutionAsync)(path, cache.updater, resolve);
	    });
	}
	
	/**
	 * convert the result node into a solution path.
	 * @param resultNode {Node}
	 * @return {Array<Node>}
	 */
	function collectSolutionPath(resultNode) {
	    var path = [];
	    var target = resultNode;
	    while (target.parentNode) {
	        path.push(target);
	        target = target.parentNode;
	    }
	    return path;
	}
	
	/**
	 * set Data & style while displaying the solution.
	 * @param model
	 */
	function handleResolvingDisplaying(model) {
	    cache.$loading.addClass('disable-see');
	    Object.assign(model, {
	        startButton: 'Recovering...',
	        isRunning: true
	    });
	}
	
	/**
	 * set Data & style after displaying the solution.
	 * @param model
	 */
	function handleEndingDisplaying(model) {
	    cache.$selectors.removeClass('no-see');
	    Object.assign(model, {
	        startButton: 'Try Again! : )',
	        isRunning: false
	    });
	}
	
	/**
	 * the image switcher.
	 */
	cache.$selectors.click(function (e) {
	    e.preventDefault();
	    if (model.gameState === _type.Type.Unstarted) {
	        var currentImg = _type.Img.find(function (imageInfo) {
	            return imageInfo.name === e.target.id;
	        });
	        if (currentImg) model.imgUrl = currentImg.url.img;
	    }
	});
	
	console.log(model);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * myModel is a very very very tiny MVVM lib.
	 *
	 * @Updated 2016/10/14 Zhiyu He
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(2);
	
	var _compiler = __webpack_require__(5);
	
	var _watcher = __webpack_require__(6);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = function () {
	    function Model() {
	        var _this = this;
	
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        _classCallCheck(this, Model);
	
	        this._data = options.data;
	        this._watchers = [];
	        this._target = options.target ? document.querySelector(options.target) : undefined;
	        Object.keys(this._data).forEach(function (key) {
	            proxy(_this, key);
	        });
	        (0, _index.observe)(this._data);
	        if (this._target) (0, _compiler.compile)(this._target, this);
	    }
	
	    /**
	     * when the vale of the expression changes,
	     * the callback would be called
	     * callback example:
	     *        (newValue, oldValue) => *, this <===> model
	     * @param expOrFn {string|function}
	     * @param callback {function}
	     */
	
	
	    _createClass(Model, [{
	        key: '$watch',
	        value: function $watch(expOrFn, callback) {
	            var watcher = new _watcher2.default(this, expOrFn, callback);
	            this._watchers.push(watcher);
	        }
	    }]);
	
	    return Model;
	}();
	
	/**
	 * proxy the properties
	 * example:
	 *      model.key <===> model._data.key
	 * @param model {Model}
	 * @param key {String}
	 */
	
	
	exports.default = Model;
	function proxy(model, key) {
	    Object.defineProperty(model, key, {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	            return model._data[key];
	        },
	        set: function set(newVal) {
	            model._data[key] = newVal;
	        }
	    });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.observe = observe;
	
	var _dependency = __webpack_require__(3);
	
	var _dependency2 = _interopRequireDefault(_dependency);
	
	var _array = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Observer = function () {
	    function Observer(value) {
	        _classCallCheck(this, Observer);
	
	        this.value = value;
	        this.dep = new _dependency2.default();
	        Object.defineProperty(value, '__ob__', {
	            value: this,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
	
	        if (Array.isArray(value)) {
	            augment(value, _array.arrayMethods);
	            this.observeArray(value);
	        } else this.walk(value);
	    }
	
	    /**
	     * travel all the props of the object, and set reactive props.
	     * @param obj {object}
	     */
	
	
	    _createClass(Observer, [{
	        key: 'walk',
	        value: function walk(obj) {
	            Object.keys(obj).forEach(function (key) {
	                defineReactive(obj, key, obj[key]);
	            });
	        }
	
	        /**
	         * Observe a list of Array items.
	         * @param items {Array}
	         */
	
	    }, {
	        key: 'observeArray',
	        value: function observeArray(items) {
	            items.forEach(function (value) {
	                observe(value);
	            });
	        }
	    }]);
	
	    return Observer;
	}();
	
	/**
	 * observe a property and set a observer if the property doesn't own one;
	 * @param value {object} the property that needs nextBlankTargetIndex be observed
	 * @return {Observer|undefined} if it is a string or number, returns undefined
	 */
	
	
	function observe(value) {
	    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	        return;
	    }
	    var ob = void 0;
	    if (value.hasOwnProperty('__ob__') && value['__ob__'] instanceof Observer) {
	        ob = value['__ob__'];
	    } else if (Object.isExtensible(value)) {
	        ob = new Observer(value);
	    }
	    return ob;
	}
	
	/**
	 * Make the prop reactified
	 * @param obj {Object}
	 * @param key {String}
	 * @param val {*}
	 * @return {*}
	 */
	function defineReactive(obj, key, val) {
	    var dep = new _dependency2.default();
	
	    var childObserver = observe(val);
	
	    Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	            if (_dependency2.default.target) {
	                dep.depend();
	                if (childObserver) {
	                    childObserver.dep.depend();
	                }
	                if (Array.isArray(val)) {
	                    val.forEach(function (item) {
	                        item && item['__ob__'] && item['__ob__'].dep.depend();
	                    });
	                }
	            }
	            return val;
	        },
	        set: function set(newVal) {
	            if (newVal === val) return;
	            val = newVal;
	            dep.notify();
	        }
	    });
	}
	
	function augment(target, src) {
	    target.__proto__ = src;
	}

/***/ },
/* 3 */
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
	
	/**
	 * 订阅者模式
	 */
	
	var Dependency = function () {
	    function Dependency() {
	        _classCallCheck(this, Dependency);
	
	        this.id = uid++;
	        this.subs = [];
	    }
	
	    _createClass(Dependency, [{
	        key: 'addSub',
	        value: function addSub(sub) {
	            this.subs.push(sub);
	        }
	
	        /**
	         * 通知依赖
	         * 这样Watcher就可以知道所维护的值需要依赖于哪些Model里面的其他值
	         */
	
	    }, {
	        key: 'depend',
	        value: function depend() {
	            if (Dependency.target) {
	                Dependency.target.addDependency(this);
	            }
	        }
	
	        /**
	         * 广播更新
	         */
	
	    }, {
	        key: 'notify',
	        value: function notify() {
	            var subs = this.subs.slice();
	            subs.forEach(function (sub) {
	                sub.update();
	            });
	        }
	    }]);
	
	    return Dependency;
	}();
	
	/**
	 * 该依赖的全局监视者
	 */
	
	
	exports.default = Dependency;
	Dependency.target = null;
	
	var targetStack = [];
	
	/**
	 * 全局每次更新只能有一个监视者更新, 使用栈维护
	 * @param _target {Watcher}
	 */
	function pushTarget(_target) {
	    if (Dependency.target) targetStack.push(Dependency.target);
	    Dependency.target = _target;
	}
	
	function popTarget() {
	    Dependency.target = targetStack.pop();
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * []
	 * @type {Array}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var arrayMethods = exports.arrayMethods = Object.create(Array.prototype);
	
	['push', 'dequeue', 'shift', 'unshift', 'sort', 'reverse', 'splice'].forEach(function (methodName) {
	    var original = Array.prototype[methodName];
	    Object.defineProperty(arrayMethods, methodName, {
	        enumerable: false,
	        writable: true,
	        configurable: true,
	        value: function value() {
	            var args = Array.from(arguments);
	            var result = original.apply(this, args);
	            var observer = this['__ob__'];
	            observeNewItems(methodName, args, observer);
	            observer.dep.notify();
	            return result;
	        }
	    });
	});
	
	function observeNewItems(methodName, args, observer) {
	    var inserted = undefined;
	    switch (methodName) {
	        case 'push':
	            inserted = args;
	            break;
	        case 'unshift':
	            inserted = args;
	            break;
	        case 'splice':
	            inserted = args.slice(2);
	            break;
	    }
	    if (inserted) {
	        observer.observeArray(inserted);
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.compile = compile;
	
	var _watcher = __webpack_require__(6);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function compile(element, model) {
	    var nodeList = element.childNodes;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = nodeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var node = _step.value;
	
	            if (node.nodeType === 3) {
	                compileTextNode(node, model);
	            } else if (node.nodeType === 1) {
	                compile(node, model);
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	}
	
	var tagRE = /\{\{((?:.|\n)+?)\}\}/g;
	
	function compileTextNode(textNode, model) {
	    var tokens = parseText(textNode.textContent);
	    if (!tokens) return;
	    var frag = document.createDocumentFragment();
	    tokens.forEach(function (obj) {
	        var ele = void 0;
	        if (obj.expression) {
	            ele = document.createTextNode((0, _watcher.getGetter)(obj.expression)(model));
	            model._watchers.push(new _watcher2.default(model, obj.expression, function (newValue, oldValue) {
	                ele.textContent = newValue;
	            }));
	        } else {
	            ele = document.createTextNode(obj.value);
	        }
	        frag.appendChild(ele);
	    });
	
	    var parentNode = textNode.parentNode;
	    parentNode.replaceChild(frag, textNode);
	}
	
	function parseText(text) {
	    if (!tagRE.test(text)) return;
	
	    var tokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match = void 0,
	        index = void 0;
	    while (match = tagRE.exec(text)) {
	        index = match.index;
	        // push text token
	        if (index > lastIndex) {
	            tokens.push({
	                value: text.slice(lastIndex, index)
	            });
	        }
	        // tag token
	        var exp = match[1];
	        tokens.push({
	            expression: exp,
	            value: exp
	        });
	        lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	        tokens.push({
	            value: text.slice(lastIndex)
	        });
	    }
	    return tokens;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.getGetter = getGetter;
	
	var _dependency = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Watcher will call the callback when the value of the expression changes!
	 */
	var Watcher = function () {
	    /**
	     * @constructor
	     * @param model {model}
	     * @param expOrFn {string|function}
	     * @param callback {function}
	     */
	    function Watcher(model, expOrFn, callback) {
	        _classCallCheck(this, Watcher);
	
	        this.callback = callback;
	        this.model = model;
	
	        this.newDepIds = new Set();
	        this.newDeps = [];
	        this._getter = getGetter(expOrFn);
	        this.value = this.get();
	    }
	
	    /**
	     * get the value of the expression and collects the dep!
	     * @return {*}
	     */
	
	
	    _createClass(Watcher, [{
	        key: 'get',
	        value: function get() {
	            (0, _dependency.pushTarget)(this);
	            var value = this._getter.call(this.model, this.model); // collects the deps!
	            (0, _dependency.popTarget)();
	            return value;
	        }
	
	        /**
	         * add dependency for the watcher
	         * @param dep {Dependency}
	         */
	
	    }, {
	        key: 'addDependency',
	        value: function addDependency(dep) {
	            var id = dep.id;
	            if (!this.newDepIds.has(id)) {
	                this.newDepIds.add(id);
	                this.newDeps.push(dep);
	                dep.addSub(this);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.run();
	            return this;
	        }
	
	        /**
	         * run the callback to update the value
	         */
	
	    }, {
	        key: 'run',
	        value: function run() {
	            var value = this.get();
	            if (value !== this.value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	                var oldValue = this.value;
	                this.value = value;
	                this.callback.call(this.model, value, oldValue);
	            }
	        }
	    }]);
	
	    return Watcher;
	}();
	
	/**
	 * get the getter function of the expression after parsing.
	 * @param expOrFn {string|Function}
	 * @return {function}
	 */
	
	
	exports.default = Watcher;
	function getGetter(expOrFn) {
	    var getter = function getter() {
	        // do nothing..
	    };
	    if (typeof expOrFn === 'function') {
	        getter = expOrFn;
	    } else if (typeof expOrFn === 'string') {
	        getter = new Function('model', 'return model.' + expOrFn + ';');
	    } else {
	        console.warn(expOrFn + ' fail to parse!!');
	    }
	    return getter;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.move = move;
	exports.search = search;
	exports.randomlySelectAndMoveAsync = randomlySelectAndMoveAsync;
	exports.update = update;
	exports.getNeighboursIndex = getNeighboursIndex;
	exports.getterFactory = getterFactory;
	exports.showSolutionAsync = showSolutionAsync;
	exports.drawCanvas = drawCanvas;
	exports.mix = mix;
	exports.isSolved = isSolved;
	
	var _util = __webpack_require__(9);
	
	var _dataStructure = __webpack_require__(10);
	
	var _lodash = __webpack_require__(12);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/***********************************************************
	 Public Helper Function
	 ***********************************************************/
	
	/**
	 *
	 * @param targetIndex {number}
	 * @param blankTargetIndex {number}
	 * @param map {{element:Element,correctIndex:number}[] | number[]}
	 * @return {Node}
	 */
	function move(targetIndex, blankTargetIndex, map) {
	    if (getNeighboursIndex(targetIndex).some(function (neighboursIndex) {
	        return neighboursIndex === blankTargetIndex;
	    })) {
	        var nextMap = map.slice();
	        var _ref = [map[blankTargetIndex], map[targetIndex]];
	        nextMap[targetIndex] = _ref[0];
	        nextMap[blankTargetIndex] = _ref[1];
	
	        return {
	            state: nextMap,
	            blankTargetIndex: targetIndex,
	            parentState: map
	        };
	    }
	}
	
	function search(targetIndex, currentNode) {
	    var subNode = move(targetIndex, currentNode.blankTargetIndex, currentNode.state);
	    return new _dataStructure.Node(subNode.state, subNode.blankTargetIndex, currentNode);
	}
	
	/**
	 * baffle the blocks.
	 * @param times {number} the times.
	 * @param speed {number} the speed of the block when moving. (ms)
	 * @param resolve {function} promise resolve
	 * @return {function}
	 */
	function randomlySelectAndMoveAsync(times, speed, resolve) {
	    times--;
	    /**
	     * randomly move the blank block
	     * @param preTargetIndex {number} the index of element that will be ignore in the next randomly move.
	     * @param blankTargetIndex {number} the blank object in the map.
	     * @param map {Array} the state.
	     * @param updater {function} update the view if called.
	     */
	    function randomlyMove(preTargetIndex, blankTargetIndex, map, updater) {
	        var targetIndex = _lodash2.default.sample(getNeighboursIndex(blankTargetIndex).filter(function (index) {
	            return index !== preTargetIndex;
	        }));
	        var nextDescriptor = move(targetIndex, blankTargetIndex, map);
	        updater(nextDescriptor.state);
	
	        if (times) {
	            setTimeout(function () {
	                times--;
	                randomlyMove(blankTargetIndex, nextDescriptor.blankTargetIndex, nextDescriptor.state, updater);
	            }, speed);
	        } else {
	            resolve(nextDescriptor);
	        }
	    }
	
	    return randomlyMove;
	}
	
	/**
	 * Update the view according nextBlankTargetIndex the descriptor.
	 * @param nextState
	 */
	function update(nextState) {
	    var patches = diff(nextState, this.blockMap);
	    render(patches, nextState);
	    this.blockMap = nextState;
	}
	
	/**
	 * get the neighbours index.
	 * @param targetIndex
	 * @return {Array}
	 */
	function getNeighboursIndex(targetIndex) {
	    return [{ X: 0, Y: -1 }, // up
	    { X: 1, Y: 0 }, // right
	    { X: 0, Y: 1 }, // down
	    { X: -1, Y: 0 } // left
	    ].map(function (offset) {
	        return {
	            X: targetIndex % 4 + offset.X,
	            Y: Math.floor(targetIndex / 4) + offset.Y
	        };
	    }).filter(function (position) {
	        return position.X >= 0 && position.X < 4 && position.Y >= 0 && position.Y < 4;
	    }).map(function (position) {
	        return position.Y * 4 + position.X;
	    });
	}
	
	/**
	 * make a index getter
	 * @param map
	 * @param selector
	 * @return {function(*): number}
	 */
	function getterFactory(map, selector) {
	    return function (target) {
	        return map.map(selector).findIndex(function (object) {
	            return object === target;
	        });
	    };
	}
	
	/**
	 * showing the solution for the solution path.
	 * @param path {Array}
	 * @param updater {Function}
	 * @param resolve
	 */
	function showSolutionAsync(path, updater, resolve) {
	    if (path.length) {
	        updater(path.pop().state);
	        setTimeout(function () {
	            showSolutionAsync(path, updater, resolve);
	        }, 120);
	    } else {
	        resolve(path);
	    }
	}
	
	/**
	 * draw the picture
	 * @param canvasContextArray {Array}
	 * @param image {Image}
	 */
	function drawCanvas(canvasContextArray, image) {
	    canvasContextArray.forEach(function (ctx, index) {
	        ctx.drawImage(image, index % 4 * (image.width / 4), Math.floor(index / 4) * (image.height / 4), image.width / 4, image.height / 4, 0, 0, 100, 100);
	    });
	    var last = canvasContextArray[canvasContextArray.length - 1];
	    last.fillStyle = 'rgba(120, 120, 120, 0.7)';
	    last.fillRect(0, 0, 100, 100);
	}
	
	function mix(model, blankElement, updater, selector) {
	    var getElementIndex = getterFactory(model.blockMap, selector);
	    var targetIndex = _lodash2.default.flow(getElementIndex, getNeighboursIndex, _lodash2.default.sample)(blankElement);
	    return new Promise(function (resolve, reject) {
	        model.isRunning = true;
	        randomlySelectAndMoveAsync(model.stepNumber, 120, resolve)(targetIndex, getElementIndex(blankElement), model.blockMap, updater);
	    });
	}
	
	/**
	 * judge if it is Solved.
	 * @param blockMap
	 * @return {boolean|*}
	 */
	function isSolved(blockMap) {
	    return blockMap.every(function (object, index) {
	        return object.correctIndex === index;
	    });
	}
	
	/***********************************************************
	 Private Helper Function
	 ***********************************************************/
	
	/**
	 * Show the difference between the new map and the old map.
	 * @param newMap {Array}
	 * @param oldMap {Array}
	 * @return {Array} tokens.
	 */
	function diff(newMap, oldMap) {
	    var tokens = [];
	    newMap.forEach(function (newObject, index) {
	        var oldObject = oldMap[index];
	        if (newObject.correctIndex !== oldObject.correctIndex) {
	            tokens.push({
	                before: oldObject.correctIndex,
	                after: newObject.correctIndex,
	                index: index
	            });
	        }
	    });
	    return tokens;
	}
	
	/**
	 * render the data to the view
	 * @param patches {Array}
	 * @param map
	 */
	function render(patches, map) {
	    patches.forEach(function (patch) {
	        var target = map[patch.index].element;
	        target.className = target.className.replace(/order-\d*/, 'order-' + patch.index);
	    });
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getRandomInt = getRandomInt;
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PriorityQueue = exports.Node = undefined;
	
	var _selector = __webpack_require__(11);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node =
	/**
	 *
	 * @param state {Array}
	 * @param blankTargetIndex {Number}
	 * @param parentNode {Node}
	 */
	exports.Node = function Node(state, blankTargetIndex, parentNode) {
	    _classCallCheck(this, Node);
	
	    Object.assign(this, {
	        state: state,
	        blankTargetIndex: blankTargetIndex,
	        parentNode: parentNode,
	        depth: parentNode !== null ? parentNode.depth + 1 : 0
	    });
	
	    this.h = computeH(this.state.map(_selector.selectNumber).map(mapIndexToDistanceObject).reduce(objectReducer));
	};
	
	/**
	 * compute the h value of the current state.
	 * @param distanceObject
	 * @return {number}
	 */
	
	
	function computeH(distanceObject) {
	    return (distanceObject.manhatten * 2 + distanceObject.geometric) * 2;
	}
	
	/**
	 * map the number & index to the distance object.
	 * @param number
	 * @param index
	 * @return {{manhatten: number, geometric: number}}
	 */
	function mapIndexToDistanceObject(number, index) {
	    return {
	        manhatten: getManhattenDistance(number, index),
	        geometric: getGeometricDistance(number, index)
	    };
	}
	
	/**
	 * get manhatten distance
	 * @param from
	 * @param to
	 * @return {number}
	 */
	function getManhattenDistance(from, to) {
	    return Math.abs(from % 4 - to % 4) + Math.abs(from >> 2 - to >> 2);
	}
	
	/**
	 * get geometric distance
	 * @param from
	 * @param to
	 * @return {number}
	 */
	function getGeometricDistance(from, to) {
	    return Math.sqrt(Math.pow(from % 4 - to % 4, 2) + Math.pow(from >> 2 - to >> 2, 2));
	}
	
	/**
	 * reduce the object
	 * @param leftObject
	 * @param rightObject
	 * @return {Object}
	 */
	function objectReducer(leftObject, rightObject) {
	    leftObject.manhatten += rightObject.manhatten;
	    leftObject.geometric += rightObject.geometric;
	    return leftObject;
	}
	
	var PriorityQueue = exports.PriorityQueue = function (_Array) {
	    _inherits(PriorityQueue, _Array);
	
	    function PriorityQueue(compare) {
	        _classCallCheck(this, PriorityQueue);
	
	        var _this = _possibleConstructorReturn(this, (PriorityQueue.__proto__ || Object.getPrototypeOf(PriorityQueue)).call(this));
	
	        _this.push(null);
	        _this.compare = compare;
	
	        /**
	         * push
	         * @param item {*}
	         */
	        _this.enqueue = function (item) {
	            this.push(item);
	
	            var currentIndex = this.length - 1;
	            while (currentIndex > 1) {
	                var parentIndex = currentIndex >> 1;
	                if (this.compare(this[currentIndex], this[parentIndex]) < 0) {
	                    swap(this, parentIndex, currentIndex);
	                } else {
	                    break;
	                }
	                currentIndex = parentIndex;
	            }
	        };
	
	        /**
	         * Pop
	         * @return {*}
	         */
	        _this.dequeue = function () {
	            var _this2 = this;
	
	            var TopItem = this[1];
	            this[1] = this.pop();
	            if (this.length === 2) {
	                this.pop();
	            }
	
	            var Q = [1];
	
	            var _loop = function _loop() {
	                var parentIndex = Q.shift();
	                var minChildIndex = parentIndex;
	
	                var childIndexArray = [parentIndex << 1, parentIndex << 1 | 1];
	                childIndexArray.filter(function (childIndex) {
	                    return childIndex < _this2.length;
	                }).forEach(function (childIndex) {
	                    if (_this2.compare(_this2[childIndex], _this2[minChildIndex]) < 0) {
	                        minChildIndex = childIndex;
	                    }
	                });
	
	                if (parentIndex !== minChildIndex) {
	                    swap(_this2, parentIndex, minChildIndex);
	                    Q.push(minChildIndex);
	                }
	            };
	
	            while (Q.length) {
	                _loop();
	            }
	            return TopItem;
	        };
	
	        /**
	         * is empty?
	         * @return {boolean}
	         */
	        _this.empty = function () {
	            return this.length <= 1;
	        };
	        return _this;
	    }
	
	    return PriorityQueue;
	}(Array);
	
	function swap(array, leftIndex, rightIndex) {
	    var temp = array[leftIndex];
	    array[leftIndex] = array[rightIndex];
	    array[rightIndex] = temp;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var selectElement = exports.selectElement = function selectElement(o) {
	  return o.element;
	};
	var selectNumber = exports.selectNumber = function selectNumber(o) {
	  return o.correctIndex;
	};
	var selectOriginal = exports.selectOriginal = function selectOriginal(o) {
	  return o;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * The State constant of the game.
	 * @type {{Unstarted: string, Pending: string, Win: string, Lose: string, Over: string}}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Type = exports.Type = {
	    Unstarted: 'UNSTARTED',
	    Pending: 'PENDING',
	    Win: 'WIN',
	    Lose: 'LOSE',
	    Over: 'OVER'
	};
	
	var Img = exports.Img = [{
	    name: 'panda',
	    url: {
	        img: './img/panda.jpg',
	        bg: './img/bg_gfpanda.jpg'
	    }
	}, {
	    name: 'overwatch',
	    url: {
	        img: './img/img_overwatch.jpg',
	        bg: './img/bg_overwatch.jpg'
	    }
	}, {
	    name: 'zootopia',
	    url: {
	        img: './img/img_zootopia.jpeg',
	        bg: './img/bg_zootopia.jpeg'
	    }
	}, {
	    name: 'baymax',
	    url: {
	        img: './img/img_baymax.jpg',
	        bg: './img/bg_baymax.jpg'
	    }
	}];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.AStar = AStar;
	
	var _dataStructure = __webpack_require__(10);
	
	var _selector = __webpack_require__(11);
	
	var _helper = __webpack_require__(8);
	
	/**
	 * A* Algorithm
	 * based on BFS with a function f to give an standard to choice
	 * which node is the best when getting next state.
	 * @param rootNode {Node} the root node. (Current State)
	 * @return {Node|undefined} the last node
	 */
	function AStar(rootNode) {
	    var PQ = new _dataStructure.PriorityQueue(compare);
	    var S = new Set();
	    PQ.enqueue(rootNode);
	    console.time('AStar算法用时');
	
	    var _loop = function _loop() {
	        var currentNode = PQ.dequeue();
	        if ((0, _helper.isSolved)(currentNode.state)) {
	            console.timeEnd('AStar算法用时');
	            return {
	                v: currentNode
	            };
	        }
	
	        (0, _helper.getNeighboursIndex)(currentNode.blankTargetIndex).forEach(function (targetIndex) {
	            return tryInsertToSet((0, _helper.search)(targetIndex, currentNode), S, PQ);
	        });
	    };
	
	    while (!PQ.empty()) {
	        var _ret = _loop();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	}
	
	/**
	 * general compare function.
	 * @param left
	 * @param right
	 * @return {number}
	 */
	function compare(left, right) {
	    return left.h - right.h + left.depth - right.depth;
	}
	
	/**
	 * check the signature and insert to the set.
	 * @param nextNode
	 * @param set
	 * @param priorityQueue
	 */
	function tryInsertToSet(nextNode, set, priorityQueue) {
	    var signature = nextNode.state.map(_selector.selectNumber).toString();
	    if (!set.has(signature)) {
	        priorityQueue.enqueue(nextNode);
	        set.add(signature);
	    }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map