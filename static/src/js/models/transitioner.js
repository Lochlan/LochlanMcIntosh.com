define([
    'backbone',
    'lib/queue',
], function (Backbone, Queue) {
    'use strict';

    var Transitioner = Backbone.Model.extend({
        defaults: function () {
            return {
                active_view: undefined,
                incoming_view: undefined,
            };
        },

        incomingViewQueue: undefined,

        initialize: function () {
            this.incomingViewQueue = new Queue();
        },

        enqueueIncomingView: function (requestedView) {
            if (this.get('incoming_view') === undefined) {
                this.set({ incoming_view: requestedView });
                return;
            }
            this.incomingViewQueue.enqueue(requestedView);
        },

        checkQueue: function () {
            var incomingView = this.incomingViewQueue.dequeue();
            if (incomingView) {
                this.set({ incoming_view: incomingView });
                return;
            }
            this.unset('incoming_view', { silent: true });
        },
    });

    return Transitioner;
});
