'use strict';

/**
 * 一个简单的类似jQuery的选择器
 * @param DOMSelector
 * @return {MyElement}
 */
export function MyQuery(DOMSelector) {
    if (typeof DOMSelector === 'string') {
        return new MyElement(DOMSelector);
    }
}

class MyElement {
    constructor(DOMSelector) {
        this.el = document.querySelector(DOMSelector);
        Object.defineProperty(this.el, '__myElement__', {
            enumerable: false,
            writable: true,
            configurable: true,
            value: this
        });
    }

    on(EventName, callback) {
        if (addEventListener) {
            this.el.addEventListener(EventName.toLowerCase(), callback);
        } else {
            this.el[`on${EventName.toLowerCase()}`] = callback;
        }
        return this;
    }
}