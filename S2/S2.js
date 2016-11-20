'use strict';

cache.$alphaLogo.click(e => {
    const myPromise = new Promise(resolve => {
        resolve();
    });
    const $test = cache.$buttons.map((index, element) => $(element));
    console.log($test);
});