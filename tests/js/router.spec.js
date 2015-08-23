define([
    'router',

    'jquery',
    'underscore',
    'backbone',
], function (Router, $, _, Backbone) {
    'use strict';

    describe('router', function () {
        var router;
        var routeMethods = [
            'about',
            'contact',
            'home',
            'notFound',
            'resume',
        ];

        beforeEach(function () {
            spyOn(Backbone.history, 'start');
            var app = { goTo: jasmine.createSpyObj('goTo', routeMethods) };
            router = new Router({ app: app });
        });

        afterEach(function () {
            // remove click handler for in-site links
            $(document).off('click');
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(router).toBeDefined();
            });

            [
                'app',
                'routes',
            ].forEach(function (propertyName) {
                it('should have a property called ' + propertyName, function () {
                    expect(router[propertyName]).toBeDefined();
                });
            });

            [
                'initialize',
            ].concat(routeMethods).forEach(function (methodName) {
                it('should have a method called ' + methodName, function () {
                    expect(typeof router[methodName]).toBe('function');
                });
            });

            it('should have corresponding callback methods for every route', function () {
                var routeCallbacks = _.uniq(_.values(router.routes));

                routeCallbacks.forEach(function (callbackName) {
                    expect(typeof router[callbackName]).toBe('function');
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

        routeMethods.forEach(function (methodName) {
            describe('when calling the route method ' + methodName, function () {
                beforeEach(function () {
                    router[methodName]();
                });

                it('should call router.app.goTo.' + methodName, function () {
                    expect(router.app.goTo[methodName]).toHaveBeenCalled();
                });
            });
        });
    });

});
