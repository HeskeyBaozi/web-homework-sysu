'use strict';

const MyRegExp = {
    power: /(e|π|\d+\.?\d*|\(+[^\)]*\)+)\^(\d+\.?\d*|\(+[^\)]*\)+)/g,
    sqrt: /\√(e|π|\d+\.?\d*|\(+[^\)]*\)+)/g,
    factorial: /(\d+\.?\d*|\(+[^\)]*\)+)[\!]/g,
    numberBeforeOperation: /\d+\.?\d*(sin|cos|tan|lg|ln|pow|sqrt|e|π)/g
};

function normalizeBrace(expression) {
    const leftNum = expression.match(/\(/g) && expression.match(/\(/g).length || 0;
    const rightNum = expression.match(/\)/g) && expression.match(/\)/g).length || 0;
    const differs = leftNum - rightNum;
    if (differs < 0)
        return undefined;
    let result = expression;
    for (let i = 0; i < differs; i++) {
        result += ')';
    }
    return result;
}

function normalizeFactory(reg, placer) {
    return function (expression) {
        let regArray = reg.exec(expression);
        while (regArray !== null) {
            expression = expression.replace(reg, placer(regArray));
            regArray = reg.exec(expression);
        }
        return expression;
    }
}

const normalizePower = normalizeFactory(MyRegExp.power, regArray => {
    return `pow(${regArray[0].split('^').join(',')})`;
});

const normalizeSqrt = normalizeFactory(MyRegExp.sqrt, regArray => {
    return `sqrt(${regArray[0].split('√')[1]})`;
});

const normalizeFactorial = normalizeFactory(MyRegExp.factorial, regArray => {
    return `factor(${regArray[0].split('!')[0]})`;
});

const normalizeNumberMultiply = normalizeFactory(MyRegExp.numberBeforeOperation, regArray => {
    return regArray[0].replace(/\d+\.?\d*/g, match => match + '*');
});


export default function normalizeExpression(expression) {
    return [expression, normalizeBrace, normalizePower,
        normalizeSqrt, normalizeFactorial, normalizeNumberMultiply].reduce((expression, wrapper) => {
        return wrapper(expression);
    });
}