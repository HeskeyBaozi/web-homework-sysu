/**
 * myQuery is just like jQuery.
 * but it has only the event related, class related functions.
 *
 * @Updated 2016/10/14 Zhiyu He
 */
'use strict';

import {on, addClass, removeClass, hasClass, text} from './helper.js';

const cache = {};

/**
 * a tiny small Query just like jQuery 2333
 * @param DOMSelector {string|document|Element}
 * @return {*}
 */
export default DOMSelector => {
    if (typeof DOMSelector === 'string') {
        if (cache[DOMSelector]) {
            return cache[DOMSelector];
        } else {
            return cache[DOMSelector] = new HzyElement(DOMSelector);
        }
    } else if (DOMSelector instanceof Element) {
        return new HzyElement(DOMSelector);
    } else if (DOMSelector === document) {
        document.on = on.bind(document);
        return document;
    }
}


class HzyElement {
    constructor(DOMSelector) {
        if (typeof DOMSelector === 'string')
            this.el = document.querySelector(DOMSelector);
        else if (DOMSelector instanceof Element) {
            this.el = DOMSelector;
        }
    }

    /**
     * Event binding
     * @param EventName {string}
     * @param callback {function}
     * @param isCapture {boolean}
     * @return {HzyElement}
     */
    on(EventName, callback, isCapture) {
        on.call(this.el, EventName, callback, isCapture);
        return this;
    }

    /**
     * add a class to the DOM
     * @param className {string}
     * @return {HzyElement}
     */
    addClass(className) {
        addClass.apply(this.el, arguments);
        return this;
    }

    /**
     * remove a class
     * @param className {string}
     * @return {HzyElement}
     */
    removeClass(className) {
        removeClass.apply(this.el, arguments);
        return this;
    }

    /**
     * check has class
     * @param className {string}
     * @return {boolean}
     */
    hasClass(className) {
        return hasClass.apply(this.el, arguments);
    }

    /**
     * get/set text
     * @param newText
     * @return {*}
     */
    text(newText) {
        let result = text.apply(this.el, arguments);
        if (typeof result === 'undefined') {
            result = this;
        }
        return result;
    }
}


