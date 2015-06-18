define([], function () {
    'use strict';

    function Queue() {
        this.data = [];
        this.offset = 0;
    }

    Queue.prototype.length = function () {
        return this.data.length - this.offset;
    };

    Queue.prototype.isEmpty = function () {
        return this.data.length === 0;
    };

    Queue.prototype.enqueue = function (element) {
        this.data.push(element);
    };

    Queue.prototype.dequeue = function () {
        if (this.data.length === 0) {
            return;
        }

        var element = this.data[this.offset];
        if (this.data.length <= 2 * ++this.offset) {
            this.data = this.data.slice(this.offset);
            this.offset = 0;
        }
        return element;
    };

    Queue.prototype.peek = function () {
        return this.data.length ? this.data[this.offset] : undefined;
    };

    return Queue;
});
