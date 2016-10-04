'use strict';

const cache = {};

/**
 * 一个简单实现的精简jQuery
 * @param DOMSelector
 * @return {MyElement}
 */
export function MyQuery(DOMSelector) {
    if (typeof DOMSelector === 'string') {
        if (cache[DOMSelector]) {
            return cache[DOMSelector];
        } else {
            return cache[DOMSelector] = new MyElement(DOMSelector);
        }
    } else if (DOMSelector === document) {
        document.on = on.bind(document);
        return document;
    }
}


class MyElement {
    constructor(DOMSelector) {
        this.el = document.querySelector(DOMSelector);
    }

    /**
     * Event binding
     * @param EventName {string}
     * @param callback {function}
     * @return {MyElement}
     */
    on(EventName, callback) {
        on.call(this.el, EventName, callback);
        return this;
    }

    /**
     * add a class to the DOM
     * @param className {string}
     * @return {MyElement}
     */
    addClass(className) {
        if (this.el.classList)
            this.el.classList.add(className);
        else
            this.el.className += ' ' + className;
        return this;
    }

    /**
     * remove a class
     * @param className {string}
     * @return {MyElement}
     */
    removeClass(className) {
        if (this.el.classList)
            this.el.classList.remove(className);
        else
            this.el.className = this.el.className.replace(new RegExp('(^|\\b)' +
                className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    }

    /**
     * get/set text
     * @param newText
     * @return {*}
     */
    text(newText) {
        if (typeof newText === 'undefined') {
            return this.el.textContent;
        }
        this.el.textContent = newText;
        return this;
    }
}

function on(EventName, callback) {
    if (addEventListener) {
        this.addEventListener(EventName.toLowerCase(), callback);
    } else {
        this[`on${EventName.toLowerCase()}`] = callback;
    }
    return this;
}