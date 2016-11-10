'use strict';

function myFetch(url, options) {
    if (!options) {
        options = {};
    }
    return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        XHR.open(options.method || 'GET', url);
        if (options.handleHeader) {
            options.handleHeader(XHR.setRequestHeader.bind(XHR));
        }
        XHR.onload = () => {
            if (XHR.status >= 200 && XHR.status < 400) {
                resolve(XHR.responseText);
            } else {
                reject(XHR.responseText);
            }
        };

        XHR.onerror = e => {
            console.log('XHR error: ', e);
        };

        XHR.send(options.body || null);
    });
}