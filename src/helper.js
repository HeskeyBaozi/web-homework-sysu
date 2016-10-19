'use strict';

/**
 *
 * @param target {Element}
 * @param blankTarget {Element}
 * @param map {{element:Element,correctIndex:number}[]}
 * @return {{nextState: (ArrayBuffer|string|Buffer|Blob), blankTargetPath: {from, to}}}
 */
export function move(target, blankTarget, map) {
    const getIndex = getterFactory(map);
    const [
        targetIndex,
        blankIndex
    ] = [
        getIndex(target),
        getIndex(blankTarget)
    ];

    const neighbours = getNeighbours(targetIndex, map);
    if (neighbours.some(object => object.element === blankTarget)) {
        const nextBlockMap = map.slice();
        [
            nextBlockMap[targetIndex],
            nextBlockMap[blankIndex]
        ] = [
            map[blankIndex],
            map[targetIndex]
        ];
        return {
            nextState: nextBlockMap,
            blankTargetPath: {
                from: blankIndex,
                to: targetIndex
            }
        }
    }
}

export function update(nextDescriptor) {
    const patches = diff(nextDescriptor.nextState, this.blockMap);
    render(patches, nextDescriptor.nextState);
    this.blockMap = nextDescriptor.nextState;
}

/**
 *
 * @param targetIndex {number}
 * @param map
 * @return {Array}
 */
export function getNeighbours(targetIndex, map) {
    return [
        {X: 0, Y: -1}, // up
        {X: 1, Y: 0}, // right
        {X: 0, Y: 1}, // down
        {X: -1, Y: 0} // left
    ].map(offset => ({
        X: targetIndex % 4 + offset.X,
        Y: Math.floor(targetIndex / 4) + offset.Y
    })).filter(position => (
        position.X >= 0 && position.X < 4 &&
        position.Y >= 0 && position.Y < 4
    )).map(position => map[position.X + position.Y * 4]);
}

export function getterFactory(map) {
    return target => map.findIndex(object => object.element === target);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function diff(newMap, oldMap) {
    const tokens = [];
    newMap.forEach((newObject, index) => {
        const oldObject = oldMap[index];
        if (newObject.correctIndex !== oldObject.correctIndex) {
            tokens.push({
                before: oldObject.correctIndex,
                after: newObject.correctIndex,
                index
            });
        }
    });
    return tokens;
}

function render(patches, map) {
    patches.forEach(patch => {
        const target = map[patch.index].element;
        target.className = target.className.replace(/order-\d*/, `order-${patch.index}`);
    });
}