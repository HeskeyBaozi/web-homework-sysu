'use strict';

const MyRegExp = {
    power: /(e|π|\d+\.?\d*|\(+[^\)]*\)+)\^(\d+\.?\d*|\(+[^\)]*\)+)/g,
    sqrt: /\√(e|π|\d+\.?\d*|\(+[^\)]*\)+)/g,
    factorial: /(\d+\.?\d*|\(+[^\)]*\)+)[\!]/g,
};

const operationMath = [Math.sin, Math.cos, Math.tan, Math.log10,
    Math.log, Math.E, Math.PI, Math.pow, Math.sqrt, factor];

const operationString = ['sin', 'cos', 'tan', 'lg', 'ln', 'e', 'π', 'pow', 'sqrt', 'factor'];

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


export function normalize(expression) {
    return [expression, normalizeBrace, normalizePower, normalizeSqrt, normalizeFactorial].reduce((expression, wrapper) => {
        return wrapper(expression);
    });
}

export function parseExpression(expression) {
    return function () {
        return new Function(...operationString, `return ${expression};`).apply(null, operationMath);
    };
}

function factor(num) {
    if (num === 0) {
        return 1;
    }
    if (num < 0) {
        throw new Error('阶乘不能为负数');
    }

    let result = 1;
    for (let i = 1; i <= num; i++) {
        result = result * i;
    }
    return result;
}