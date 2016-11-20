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

/**
 * If your mouse enter the @+ logo, the menu will expand.
 */
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


/**
 * If you click the button A~E, it will fetch the random number from the server.
 */
$('#control-ring').click((() => {
    const handler = clickButtonAndNotify(cache.$bigBubble);
    return e => {
        handler($(e.target));
    };
})());

function clickButtonAndNotify($notifyTarget) {
    return $element => {
        if ($element.hasClass('disable')) {
            return;
        }
        return clickButton($element).then(number => {
            /**
             * Attention!!
             * Once the A~E button get the random number,
             * it will trigger the event 'notify' for the big bubble.
             * And then, convert the information:
             *
             * @example
             * { A: 3 }, { B: 4 }, { C: 5 }...
             */
            $notifyTarget.trigger('notify', {
                [$element[0].id]: number
            });
        });
    };
}

/**
 * button handler.
 * @param $ctx {object} the jquery object of the button.
 */
function clickButton($ctx) {
    $ctx.siblings().addClass('disable');
    $ctx.children('.center-content').removeClass('hidden').text('...');
    return fetchNumber().then(number => {
        $ctx.addClass('disable disable-fix').children('.center-content').text(number);
        $ctx.siblings(':not(.disable-fix)').removeClass('disable');
        return number;
    });
}

function fetchNumber() {
    return new Promise((resolve, reject) => {
        $.get('/', {
            _: new Date().getTime()
        }, responseNumber => {
            resolve(responseNumber);
        });
    });
}


(function ($bigBubble) {

    let collection = {};

    $bigBubble
    /**
     * @event 'notify'
     * it will receive the message object,
     * and then merge with the collection object.
     * Once the collection has keys 'A', 'B', 'C', 'D', 'E',
     * the big bubble becomes enable to click.
     */
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
