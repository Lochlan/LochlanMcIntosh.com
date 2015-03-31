define([
    'jquery',
    'underscore',
    'backbone',
    'router',
], function ($, _, Backbone, Router) {
    'use strict';

    describe('router', function () {
        var router;

        beforeEach(function() {
            spyOn(Backbone.history, 'start');
            router = new Router();
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(router).toBeDefined();
            });

            it('should have routes', function() {
                expect(router.routes).toBeDefined();
            });

            it('should have corresponding callback methods for every route', function() {
                var routeCallbacks = _.uniq(_.values(router.routes));

                routeCallbacks.forEach(function (callbackName) {
                    expect(typeof router[callbackName]).toBe('function');
                });
            });

            it('should have views', function() {
                expect(router.views).toBeDefined();
            });

            [
                'initialize',
                'transition',
                'contact',
                'home',
                'staticPage',
            ].forEach(function (methodName) {
                it('should have a method called ' + methodName, function () {
                    expect(typeof router[methodName]).toBe('function');
                });
            });

            it('should have a jQuery click handler on document for all in-site links', function() {
                var clickEventData = _.find($._data(document, 'events').click, function (clickEventData) {
                    // TODO use a better conditional
                    // e.g. create <a href="[internal link]">, see if clickEventData.selector matches it
                    return clickEventData.selector === 'a[href^="/"]';
                });

                expect(typeof clickEventData.handler).toBe('function');
            });
        });

        // TODO test router methods

    });

});
