'use strict';

/**
 * add events
 * @param EventName {string}
 * @param callback {function}
 * @param isCapture {boolean}
 * @return {object} the context of the function: this.
 */
export function on(EventName, callback, isCapture) {
    if (addEventListener) {
        this.addEventListener(EventName.toLowerCase(), callback, isCapture);
    } else {
        this[`on${EventName.toLowerCase()}`] = callback;
    }
    return this;
}

/**
 * add a class to the DOM
 * @param className {string}
 * @return this
 */
export function addClass(className) {
    if (this.classList)
        this.classList.add(className);
    else
        this.className += ' ' + className;
    return this;
}

/**
 * remove a class
 * @param className {string}
 * @return this
 */
export function removeClass(className) {
    if (this.classList)
        this.classList.remove(className);
    else
        this.className = this.className.replace(new RegExp('(^|\\b)' +
            className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    return this;
}

/**
 * check has class
 * @param className {string}
 * @return this
 */
export function hasClass(className) {
    if (this.classList)
        return this.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
}

/**
 * get/set text
 * @param newText
 * @return {*}
 */
export function text(newText) {
    if (typeof newText === 'undefined') {
        return this.textContent;
    }
    this.textContent = newText;
    return undefined;
}