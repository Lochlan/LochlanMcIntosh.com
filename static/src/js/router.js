define([
    'backbone',
    'views/contact',
    'views/static',
    'views/transitioner',
], function (Backbone, ContactView, StaticView, TransitionerView) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            '': 'home',
            'about': 'transitioner',
            'contact': 'contact',
            'home': 'transitioner',
            'portfolio': 'transitioner',
            'resume': 'transitioner',
        },

        views: {
            transitioner: new TransitionerView({ el: '.js-Backbone'}),
        },

        initialize: function () {
            Backbone.history.start({
                root: location.pathname,
            });
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
                template: Backbone.history.fragment,
            }));
        },

    });

    return Router;
});
