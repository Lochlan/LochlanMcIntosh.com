define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({

        app: undefined,

        routes: {
            '(/)': 'home',
            'about(/)': 'about',
            'contact(/)': 'contact',
            'home(/)': 'home',
            'resume(/)': 'resume',

            '*notFound': 'notFound',
        },

        initialize: function (options) {
            this.app = options.app;

            Backbone.history.start({
                pushState: true,
                location: '/',
            });

            $(document).on('click', 'a[href^="/"]', function (event) {
                event.preventDefault();
                Backbone.history.navigate(event.currentTarget.pathname, {
                    trigger: true,
                });
            });
        },

        // route methods

        about: function () {
            this.app.goTo.about();
        },
        contact: function () {
            this.app.goTo.contact();
        },
        home: function () {
            this.app.goTo.home();
        },
        notFound: function () {
            this.app.goTo.notFound();
        },
        resume: function () {
            this.app.goTo.resume();
        },
    });

    return Router;
});
