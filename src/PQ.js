'use strict';

class PriorityQueue extends Array {
    constructor(compare) {
        super();
        this.push(null);
        this.compare = compare;
        this.enqueue = function (item) {
            this.push(item);

            let currentIndex = this.length - 1;
            while (currentIndex > 1) {
                const parentIndex = currentIndex >> 1;
                if (this.compare(this[currentIndex], this[parentIndex]) < 0) {
                    swap(this, parentIndex, currentIndex);
                } else {
                    break;
                }
                currentIndex = parentIndex;
            }
        };

        this.dequeue = function () {
            const TopItem = this[1];
            this[1] = this.pop();
            if (this.length === 2) {
                this.pop();
            }

            const Q = [1];
            while (Q.length) {
                const parentIndex = Q.shift();
                let minChildIndex = parentIndex;


                const childIndexArray = [parentIndex << 1, (parentIndex << 1) | 1];
                childIndexArray.filter(childIndex => {
                    return childIndex < this.length;
                }).forEach(childIndex => {
                    if (this.compare(this[childIndex], this[minChildIndex]) < 0) {
                        minChildIndex = childIndex;
                    }
                });

                if (parentIndex !== minChildIndex) {
                    swap(this, parentIndex, minChildIndex);
                    Q.push(minChildIndex);
                }
            }
            return TopItem;
        };

        this.empty = function () {
            return this.length <= 1;
        }
    }


}

function swap(array, leftIndex, rightIndex) {
    const temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}

export default PriorityQueue;