'use strict';

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;

/**
 * @param text {string}
 * @param ctxString {string}
 * @return {string | void}
 */
export function parseText(text, ctxString) {
    const tagRE = defaultTagRE;

    // 如果没有双括号
    if (!tagRE.test(text) || typeof ctxString === 'undefined')
        return;
    const tokens = [];

    let match; // 匹配信息
    let lastIndex = tagRE.lastIndex = 0; // 上一次匹配到的位置
    while ((match = tagRE.exec(text)) !== null) {
        //匹配的初始位置
        let index = match.index;

        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        const exp = match[1].trim();
        console.log('match = ',match);
        tokens.push(`${ctxString}.${exp}`);
        lastIndex = index + match[0].length;
    }
    return tokens.join('+');
}
