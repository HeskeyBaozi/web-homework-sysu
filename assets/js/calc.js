/*!
 * simple-calculator 0.0.0 - Modern Web Programming HomeWork - SYSU
 * Copyright (c) 2016 He Zhiyu - https://github.com/HeskeyBaozi/web-homework-sysu#readme
 * License: MIT
 */
!function(t){function e(i){if(n[i])return n[i].exports;var u=n[i]={exports:{},id:i,loaded:!1};return t[i].call(u.exports,u,u.exports,e),u.loaded=!0,u.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var u=n(1),r=i(u),o=n(4),a=i(o),s=n(10),c=i(s),l=n(9),f=i(l),d=n(8),p=i(d),h=n(7),v=i(h),y=n(3),b=new a["default"]({data:{output:"",input:"0",isEqualed:!1}});(0,r["default"])("#panel").on("click",function(t){"0"===b.input&&(b.input=""),b.isEqualed&&((0,p["default"])(b),b.isEqualed=!1),(0,y.addChar)(b,c["default"][t.target.dataset.directive])}),b.$watch("output",function(t,e){t!==e&&(0,r["default"])("#output").text(t.trim())}),b.$watch("input",function(t,e){if(t!==e){(0,r["default"])("#input").text(t);var n=(0,v["default"])(t),i=(0,f["default"])(n);(0,y.showResult)(this,n,i)}}),b.$watch("isEqualed",function(t,e){t!==e&&t===!0&&((0,r["default"])("#input").addClass("low-light"),(0,r["default"])("#input-quick").text(this.input?"="+this.result:"0").addClass("high-light"))})},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return addEventListener?this.addEventListener(t.toLowerCase(),e):this["on"+t.toLowerCase()]=e,this}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r={};e["default"]=function(t){return"string"==typeof t?r[t]?r[t]:r[t]=new o(t):t===document?(document.on=i.bind(document),document):void 0};var o=function(){function t(e){n(this,t),this.el=document.querySelector(e)}return u(t,[{key:"on",value:function(t,e){return i.call(this.el,t,e),this}},{key:"addClass",value:function(t){return this.el.classList?this.el.classList.add(t):this.el.className+=" "+t,this}},{key:"removeClass",value:function(t){return this.el.classList?this.el.classList.remove(t):this.el.className=this.el.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "),this}},{key:"text",value:function(t){return"undefined"==typeof t?this.el.textContent:(this.el.textContent=t,this)}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){a.target&&s.push(a.target),a.target=t}function u(){a.target=s.pop()}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.pushTarget=i,e.popTarget=u;var o=0,a=function(){function t(){n(this,t),this.id=o++,this.subs=[]}return r(t,[{key:"addSub",value:function(t){this.subs.push(t)}},{key:"depend",value:function(){t.target&&t.target.addDep(this)}},{key:"notify",value:function(){var t=this.subs.slice();t.forEach(function(t){t.update()})}}]),t}();e["default"]=a,a.target=null;var s=[]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function u(t,e){"string"==typeof e?t.input+=e:"function"==typeof e?e.call(t):console.warn("cannot parse this directive:",e)}function r(t,e,n){var i=null;try{t.result=i=n(),"function"==typeof i?(0,a["default"])("#input-quick").text("Please enter number"):i?(0,a["default"])("#input-quick").text(e+" = "+i):(0,a["default"])("#input-quick").text("")}catch(u){t.result="Syntax Error :(",(0,a["default"])("#input-quick").text(t.result)}}Object.defineProperty(e,"__esModule",{value:!0}),e.addChar=u,e.showResult=r;var o=n(1),a=i(o)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){Object.defineProperty(t,e,{configurable:!0,enumerable:!0,get:function(){return t._data[e]},set:function(n){t._data[e]=n}})}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),s=n(6),c=i(s),l=function(){function t(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];u(this,t),this._data=n.data,this._watchers=[],Object.keys(this._data).forEach(function(t){r(e,t)}),(0,a.observe)(this._data)}return o(t,[{key:"$watch",value:function(t,e){var n=new c["default"](this,t,e);this._watchers.push(n)}}]),t}();e["default"]=l},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){if(t&&"object"===("undefined"==typeof t?"undefined":a(t))){var e=void 0;return t.hasOwnProperty("__ob__")&&t.__ob__ instanceof f?e=t.__ob__:Object.isExtensible(t)&&(e=new f(t)),e}}function o(t,e,n){var i=new l["default"];Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return l["default"].target&&i.depend(),n},set:function(t){t!==n&&(n=t,i.notify())}})}Object.defineProperty(e,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.observe=r;var c=n(2),l=i(c),f=function(){function t(e){u(this,t),this.value=e,Object.defineProperty(e,"__ob__",{value:this,enumerable:!1,writable:!0,configurable:!0}),this.walk(e)}return s(t,[{key:"walk",value:function(t){Object.keys(t).forEach(function(e){o(t,e,t[e])})}}]),t}()},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){var e=function(){};return"function"==typeof t?e=t:"string"==typeof t?e=new Function("model","return model."+t+";"):console.warn(t+" fail to parse!!"),e}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(2),a=function(){function t(e,n,r){i(this,t),this.callback=r,this.model=e,this.newDepIds=new Set,this.newDeps=[],this._getter=u(n),this.value=this.get()}return r(t,[{key:"get",value:function(){(0,o.pushTarget)(this);var t=this._getter.call(this.model,this.model);return(0,o.popTarget)(),t}},{key:"addDep",value:function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),t.addSub(this))}},{key:"update",value:function(){this.run()}},{key:"run",value:function(){var t=this.get();if(t!==this.value){var e=this.value;this.value=t,this.callback.call(this.model,t,e)}}}]),t}();e["default"]=a},function(t,e){"use strict";function n(t){var e=t.match(/\(/g)&&t.match(/\(/g).length||0,n=t.match(/\)/g)&&t.match(/\)/g).length||0,i=e-n;if(!(i<0)){for(var u=t,r=0;r<i;r++)u+=")";return u}}function i(t,e){return function(n){for(var i=t.exec(n);null!==i;)n=n.replace(t,e(i)),i=t.exec(n);return n}}function u(t){return[t,n,o,a,s,c].reduce(function(t,e){return e(t)})}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=u;var r={power:/(e|π|\d+\.?\d*|\(+[^\)]*\)+)\^(\d+\.?\d*|\(+[^\)]*\)+)/g,sqrt:/\√(e|π|\d+\.?\d*|\(+[^\)]*\)+)/g,factorial:/(\d+\.?\d*|\(+[^\)]*\)+)[\!]/g,numberBeforeOperation:/\d+\.?\d*(sin|cos|tan|lg|ln|pow|sqrt|e|π)/g},o=i(r.power,function(t){return"pow("+t[0].split("^").join(",")+")"}),a=i(r.sqrt,function(t){return"sqrt("+t[0].split("√")[1]+")"}),s=i(r.factorial,function(t){return"factor("+t[0].split("!")[0]+")"}),c=i(r.numberBeforeOperation,function(t){return t[0].replace(/\d+\.?\d*/g,function(t){return t+"*"})})},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function u(t){return[t,a,r,o].reduce(function(t,e){return e(t)})}function r(t){return(0,c["default"])("#input-quick").removeClass("high-light"),(0,c["default"])("#input").removeClass("low-light"),t}function o(t){var e=t.output.split("\n");return e.length>5&&(e=e.slice(1,e.length)),t.output=e.join("\n"),t}function a(t){return t.input="",t}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=u;var s=n(1),c=i(s)},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(11),r={math:[Math.sin,Math.cos,Math.tan,Math.log10,Math.log,Math.E,Math.PI,Math.pow,Math.sqrt,u.factor],string:["sin","cos","tan","lg","ln","e","π","pow","sqrt","factor"]};e["default"]=function(t){return function(){return(new(Function.prototype.bind.apply(Function,[null].concat(i(r.string),["return "+t+";"])))).apply(null,r.math)}}},function(t,e){"use strict";function n(t,e){return function(){var n=t.test(this.input)?this.input.slice(0,this.input.length-1):this.input;this.input=n+e}}function i(){this.isEqualed=!0,this.output+=this.input?this.input+" = "+this.result+"\n":"0=0\n"}function u(){return""===this.input?void(this.input="0"):void(r.trigonometricFunction.test(this.input)?this.input=this.input.slice(0,this.input.length-4):r.logFunction.test(this.input)?this.input=this.input.slice(0,this.input.length-3):this.input=this.input.slice(0,this.input.length-1))}Object.defineProperty(e,"__esModule",{value:!0});var r={trigonometricFunction:/cos\($|sin\($|tan\($/,logFunction:/lg\($|ln\($/,operation:/\+$|\-$|\*$|\/$/,number:/[0]$/};e["default"]={factorial:"!",power:"^",root:"√",pi:"π",e:"e",sin:"sin(",cos:"cos(",tan:"tan(",left:"(",right:")",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0",plus:n(r.operation,"+"),minus:n(r.operation,"-"),multiply:n(r.operation,"*"),divide:n(r.operation,"/"),point:".",ln:"ln(",lg:"lg(",eq:i,backspace:u,ce:function(){this.input="0"}}},function(t,e){"use strict";function n(t){if(0===t)return 1;if(t<0)throw new Error("fail!!!");for(var e=1,n=1;n<=t;n++)e*=n;return e}Object.defineProperty(e,"__esModule",{value:!0}),e.factor=n}]);
//# sourceMappingURL=calc.js.map