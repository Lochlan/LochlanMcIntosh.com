define([
    'models/transitioner',

    'backbone',
], function (Transitioner, Backbone) {
    'use strict';

    describe('transitioner model', function () {
        var model;

        beforeEach(function () {
            model = new Transitioner();
        });

        [
            'defaults',
            'incomingViewQueue',
        ].forEach(function (property) {
            it('should have a property called ' + property, function () {
                expect(model[property]).toBeDefined();
            });
        });

        [
            'checkQueue',
            'enqueueIncomingView',
        ].forEach(function (method) {
            it('should have a method called ' + method, function () {
                expect(typeof model[method]).toEqual('function');
            });
        });

        describe('when enqueuing a requested view', function () {
            var requestedView;

            describe('when there is not an existing incoming view', function () {
                beforeEach(function () {
                    requestedView = new Backbone.View();
                    model.enqueueIncomingView(requestedView);
                });

                it('should set the incoming view to the requested view', function () {
                    expect(model.get('incoming_view')).toEqual(requestedView);
                });
            });

            describe('when there is an existing incoming view', function () {
                var oldIncomingViewQueueLength;

                beforeEach(function () {
                    model.set({
                        incoming_view: new Backbone.View(),
                    });
                    oldIncomingViewQueueLength = model.incomingViewQueue.length();
                    requestedView = new Backbone.View();
                    model.enqueueIncomingView(requestedView);
                });

                it('should not set the incoming view to the requested view', function () {
                    expect(model.get('incoming_view')).not.toEqual(requestedView);
                });

                it('should change the incoming view queue length', function () {
                    expect(model.incomingViewQueue.length()).not.toEqual(oldIncomingViewQueueLength);
                });
            });
        });

        describe('when checking the queue', function () {
            // TODO
        });
    });

});
