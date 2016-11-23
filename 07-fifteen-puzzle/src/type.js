'use strict';

/**
 * The State constant of the game.
 * @type {{Unstarted: string, Pending: string, Win: string, Lose: string, Over: string}}
 */
export const Type = {
    Unstarted: 'UNSTARTED',
    Pending: 'PENDING',
    Win: 'WIN',
    Lose: 'LOSE',
    Over: 'OVER',
};

export const Img = [
    {
        name: 'panda',
        url: {
            img: './img/panda.jpg',
            bg: './img/bg_gfpanda.jpg'
        }
    },
    {
        name: 'overwatch',
        url: {
            img: './img/img_overwatch.jpg',
            bg: './img/bg_overwatch.jpg'
        }
    },
    {
        name: 'zootopia',
        url: {
            img: './img/img_zootopia.jpeg',
            bg: './img/bg_zootopia.jpeg'
        }
    },
    {
        name: 'baymax',
        url: {
            img: './img/img_baymax.jpg',
            bg: './img/bg_baymax.jpg'
        }
    }
];