'use strict';

import $ from  './myQuery/index.js';
import {hasClass, addClass, removeClass} from './myQuery/helper.js';
import Model from './myModel/index.js';

const StateType = {
    Unstarted: 'UNSTARTED',
    Pending: 'PENDING',
    Win: 'WIN',
    Lose: 'LOSE'
};

const modelMaze = new Model({
    target: '.message',
    data: {
        gameState: StateType.Unstarted,
        isCheating: false,
        message: 'Welcome to Play the Maze!!!'
    }
});

$('.start')
    .on('mouseover', e => {
        modelMaze.gameState = StateType.Pending;
        modelMaze.isCheating = false;
        modelMaze.message = '开始游戏';
    })
    .on('mouseleave', e => {
        if (e.relatedTarget.id === 'maze') {
            modelMaze.isCheating = true;
            modelMaze.message = '跑到外面去了。。';
        }
    });

$('.maze-content')
    .on('mousemove', e => {
        if (modelMaze.gameState === StateType.Pending) {
            if (hasClass.call(e.target, 'wall')) {
                modelMaze.gameState = StateType.Lose;
                modelMaze.message = '游戏失败';
                endMazeGame(modelMaze);
                addClass.call(e.target, 'highlight');
                setTimeout(() => {
                    removeClass.call(e.target, 'highlight');
                }, 2000);
            }

            if (hasClass.call(e.target, 'end')) {
                if (modelMaze.isCheating) {
                    modelMaze.message = '卧槽你竟然作弊';
                    modelMaze.gameState = StateType.Lose;
                } else {
                    modelMaze.message = '游戏成功';
                    modelMaze.gameState = StateType.Win;
                }

            }
            startMazeGame(modelMaze);
        }
    });

function startMazeGame(modelMaze) {

}

function endMazeGame(modelMaze) {

}

console.log(modelMaze);