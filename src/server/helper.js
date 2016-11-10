'use strict';

/**
 * compose multiple middleWares into one function.
 * just like _.flow
 *
 * @param middleWares {Array<function>}
 * @return {function({Object}, {Function})}
 *
 * @example
 * const middleware = [fn1, fn2];
 *
 * function fn1(ctx, next) {
 *    console.log('Coming from fn1');
 *    ctx.testProperty = 'test';
 *    next().then(() => {
 *        console.log('Coming from fn1 end');
 *    });
 * }
 *
 * function fn2(ctx, next) {
 *    console.log('Coming from fn2');
 *    console.log('the test Property is ', ctx.testProperty);
 *    next().then(() => {
 *        console.log('Coming from fn2 end');
 *    });
 * }
 *
 * // ↓↓ call the flow
 * flow(middleware)({});
 *
 * [Output]:
 * Coming from fn1
 * Coming from fn2
 * the test Property is  test
 * Coming from fn2 end
 * Coming from fn1 end
 */
function flow(middleWares) {
    return (ctx, next) => {
        let index = -1;

        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times...'));

            index = i;
            const fn = middleWares[i] || next;

            /**
             * if reach the length of the middleware array.
             */
            if (!fn) {
                return Promise.resolve();
            }
            try {
                /**
                 * the param next is the next middleware function. ↓↓
                 */
                return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }

        /**
         * return a promise instance.
         */
        return dispatch(0);
    };
}

module.exports.flow = flow;