/**
 * Created by Administrator on 2016/11/17.
 */
'use strict';

const cache = {
    $alphaLogo: $('.icon'),
    $wholeApp: $('#button'),
    $buttons: $('.button'),
    $result: $('.info-result'),
    $bigBubble: $('#info-bar')
};

cache.$alphaLogo.mouseenter((() => {
    return e => {
        cache.$wholeApp.toggleClass('on-hover');
        reset();
    };

    function reset() {
        cache.$buttons.removeClass('disable disable-fix')
            .children('span').text('').addClass('hidden');
        cache.$result.text('');
        cache.$bigBubble.trigger('reset');
    }
})());


$('#control-ring').click((() => {
    /**
     * button handler.
     * @param $ctx {object} the jquery object of the button.
     */
    const buttonHandler = (() => {
        let uid = 0;
        return $ctx => {
            if ($ctx.hasClass('disable'))
                return;
            $ctx.siblings().addClass('disable');
            $ctx.children('.center-content').removeClass('hidden').text('...');
            return fetchNumber().then(number => {
                $ctx.addClass('disable disable-fix').children('.center-content').text(number);
                $ctx.siblings(':not(.disable-fix)').removeClass('disable');
                return number;
            });
        };

        function fetchNumber() {
            return new Promise((resolve, reject) => {
                $.get('/', {
                    _uid: uid++
                }, responseNumber => {
                    resolve(responseNumber);
                });
            });
        }
    })();

    return e => {
        buttonHandler($(e.target))
            .then(number => {
                cache.$bigBubble.trigger('notify', {
                    [e.target.id]: number
                });
            });
    };
})());


(function ($bigBubble) {

    let collection = {};

    $bigBubble
        .on('notify', (e, message) => {
            Object.assign(collection, message);
            if (Object.keys(collection).length === 5) {
                $bigBubble.removeClass('disable');
            }
        })
        .click((() => {
            return e => {
                if ($bigBubble.hasClass('disable'))
                    return;
                $bigBubble.addClass('disable').children('span').text(computeSum(collection));
            };

            function computeSum(collection) {
                return Object.keys(collection)
                    .map(key => collection[key])
                    .map(str => Number.parseInt(str))
                    .reduce((left, right) => left + right);
            }
        })())
        .on('reset', e => {
            collection = {};
        });
})(cache.$bigBubble);
