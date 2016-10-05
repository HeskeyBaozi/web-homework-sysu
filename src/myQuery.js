'use strict';

const cache = {};

/**
 * a tiny small Query just like jQuery 2333
 * @param DOMSelector {string|document}
 * @return {*}
 */
export default DOMSelector => {
    if (typeof DOMSelector === 'string') {
        if (cache[DOMSelector]) {
            return cache[DOMSelector];
        } else {
            return cache[DOMSelector] = new HzyElement(DOMSelector);
        }
    } else if (DOMSelector === document) {
        document.on = on.bind(document);
        return document;
    }
}


class HzyElement {
    constructor(DOMSelector) {
        this.el = document.querySelector(DOMSelector);
    }

    /**
     * Event binding
     * @param EventName {string}
     * @param callback {function}
     * @return {HzyElement}
     */
    on(EventName, callback) {
        on.call(this.el, EventName, callback);
        return this;
    }

    /**
     * add a class to the DOM
     * @param className {string}
     * @return {HzyElement}
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
     * @return {HzyElement}
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

/**
 * add events
 * @param EventName {string}
 * @param callback {function}
 * @return {object} the context of the function: this.
 */
function on(EventName, callback) {
    if (addEventListener) {
        this.addEventListener(EventName.toLowerCase(), callback);
    } else {
        this[`on${EventName.toLowerCase()}`] = callback;
    }
    return this;
}