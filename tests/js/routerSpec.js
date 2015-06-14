define([
    'jquery',
    'underscore',
    'backbone',
    'router',
], function ($, _, Backbone, Router) {
    'use strict';

    describe('router', function () {
        var router;

        beforeEach(function () {
            spyOn(Backbone.history, 'start');
            spyOn(Router.prototype, 'transition').and.callThrough();

            router = new Router();
        });

        afterEach(function () {
            // remove click handler for in-site links
            $(document).off('click');
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(router).toBeDefined();
            });

            it('should have routes', function () {
                expect(router.routes).toBeDefined();
            });

            it('should have corresponding callback methods for every route', function () {
                var routeCallbacks = _.uniq(_.values(router.routes));

                routeCallbacks.forEach(function (callbackName) {
                    expect(typeof router[callbackName]).toBe('function');
                });
            });

            it('should have views', function () {
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

            it('should call Backbone.history.start', function () {
                expect(Backbone.history.start).toHaveBeenCalled();
            });

            it('should have a jQuery click handler on document for all in-site links', function () {
                // $._data is an undocumented method
                var clickEventData = _.find($._data(document, 'events').click, function (clickEventData) {
                    // TODO use a better conditional
                    // e.g. create <a href="[internal link]">, see if clickEventData.selector matches it
                    return clickEventData.selector === 'a[href^="/"]';
                });

                expect(typeof clickEventData.handler).toBe('function');
            });
        });

        describe('when clicking links for each internal route', function () {
            beforeEach(function () {
                var routes = _.allKeys(router.routes);

                routes.forEach(function (route, index, routes) {
                    var href = '';
                    // replace optional slash with slash, except for root link
                    if (!route.match(/^\(\/\)$/)) {
                        href = route.replace(/\(\/\)$/, '/');
                    }

                    $('<a href="/' + href + '" class="test-link">' + index + '</a>').appendTo('body');
                });

                spyOn(Backbone.history, 'navigate');
            });

            afterEach(function () {
                $('a.test-link').remove();
            });

            it('should call Backbone.history.navigate for each route', function () {
                _.each($('a.test-link'), function (link) {
                    var urlFragment = link.href.replace(window.location.origin, '');

                    $(link).click();
                    expect(Backbone.history.navigate).toHaveBeenCalledWith(urlFragment, { trigger: true });
                });
            });
        });

        // route methods

        describe('when calling the route method contact', function () {
            var oldContactView;

            beforeEach(function () {
                oldContactView = router.views.contact;
                router.contact();
            });

            it('should call router.transitioner', function () {
                expect(router.transition).toHaveBeenCalled();
            });

            it('should instantiate the contact view', function () {
                expect(oldContactView).toEqual(undefined);
                expect(typeof router.views.contact).toEqual('object');
            });

            it('should not change the contact view when called again', function () {
                oldContactView = router.views.contact;
                // ignore actual transition
                spyOn(router.views.transitioner, 'transition');
                router.contact();
                expect(oldContactView).toEqual(router.views.contact);
            });
        });

        describe('when calling the route method home', function () {
            beforeEach(function () {
                router.home();
            });

            it('should call router.transitioner', function () {
                expect(router.transition).toHaveBeenCalled();
            });
        });

        describe('when calling the route method staticPage', function () {
            beforeEach(function () {
                // set history fragment for router.staticPage method
                Backbone.history.fragment = 'about';
                router.staticPage();
            });

            it('should call router.transitioner', function () {
                expect(router.transition).toHaveBeenCalled();
            });
        });
    });

});
