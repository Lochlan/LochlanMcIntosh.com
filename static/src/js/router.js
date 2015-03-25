define([
    'jquery',
    'backbone',
    'views/contact',
    'views/static',
    'views/transitioner',
], function ($, Backbone, ContactView, StaticView, TransitionerView) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            '(/)': 'home',
            'about(/)': 'transitioner',
            'contact(/)': 'contact',
            'home(/)': 'transitioner',
            'portfolio(/)': 'transitioner',
            'resume(/)': 'transitioner',
        },

        views: {
            transitioner: new TransitionerView({ el: '.js-Backbone'}),
        },

        initialize: function () {
            Backbone.history.start({
                pushState: true,
                location: '/',
            });

            $(document).on('click', 'a[href^="/"]', function(event) {
                event.preventDefault();
                Backbone.history.navigate(event.currentTarget.pathname, {
                    trigger: true,
                });
            });
        },

        initialSiteLoad: true,
        execute: function(callback, args) {
            // don't trigger route on initial site load
            if (this.initialSiteLoad) {
                this.initialSiteLoad = false;
                return;
            }
            if (callback) {
                callback.apply(this, args);
            }
        },

        // route methods

        contact: function () {
            this.views.transitioner.transition(new ContactView());
        },

        home: function () {
            this.views.transitioner.transition(new StaticView({
                template: 'home',
            }));
        },

        transitioner: function () {
            this.views.transitioner.transition(new StaticView({
                // remove any trailing slashes
                template: Backbone.history.fragment.replace(/[\/]+$/, ''),
            }));
        },

    });

    return Router;
});
