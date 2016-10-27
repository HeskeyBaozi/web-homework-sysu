'use strict';

import _ from 'lodash';

const MyRegExp = {
    power: /(e|π|\d+\.?\d*|\(+[^\)]*\)+)\^(\d+\.?\d*|\(+[^\)]*\)+)/g,
    sqrt: /\√(e|π|\d+\.?\d*|\(+[^\)]*\)+)/g,
    factorial: /(\d+\.?\d*|\(+[^\)]*\)+)[\!]/g,
    numberBeforeOperation: /\d+\.?\d*(sin|cos|tan|lg|ln|pow|sqrt|e|π)/g
};

function normalizeBrace(expression) {
    const differs = [
        expression.match(/\(/g) && expression.match(/\(/g).length || 0,
        expression.match(/\)/g) && expression.match(/\)/g).length || 0
    ].reduce((left, right) => left - right);
    return differs < 0 ? undefined : getRightBraceExpression(expression, differs);
}

function getRightBraceExpression(expression, differs) {
    let result = expression;
    _.times(differs, () => {
        result += ')';
    });
    return result;
}

function normalizeFactory(reg, placer) {
    return expression => {
        let regArray = reg.exec(expression);
        while (regArray !== null) {
            expression = expression.replace(reg, placer(regArray));
            regArray = reg.exec(expression);
        }
        return expression;
    }
}

const normalizePower = normalizeFactory(MyRegExp.power, regArray => `pow(${regArray[0].split('^').join(',')})`);
const normalizeSqrt = normalizeFactory(MyRegExp.sqrt, regArray =>`sqrt(${regArray[0].split('√')[1]})`);
const normalizeFactorial = normalizeFactory(MyRegExp.factorial, regArray => `factor(${regArray[0].split('!')[0]})`);
const normalizeNumberMultiply = normalizeFactory(MyRegExp.numberBeforeOperation, regArray => regArray[0].replace(/\d+\.?\d*/g, match => match + '*'));


export default function normalizeExpression(expression) {
    return _.flow(normalizeBrace, normalizePower, normalizeSqrt, normalizeFactorial, normalizeNumberMultiply)(
        expression
    );
}