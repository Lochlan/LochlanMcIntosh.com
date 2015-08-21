define([
    'jquery',
    'backbone',
    'views/contact',
    'views/page_title',
    'views/static',
    'views/transitioner',
], function ($, Backbone, ContactView, PageTitleView, StaticView, TransitionerView) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            '(/)': 'home',
            'about(/)': 'staticPage',
            'contact(/)': 'contact',
            'home(/)': 'staticPage',
            'portfolio(/)': 'staticPage',
            'resume(/)': 'staticPage',

            '*notFound': 'notFound',
        },

        // views that should persist across page transitions
        views: function () {
            return {
                contact: undefined,
                page_title: new PageTitleView(),
                transitioner: undefined,
            };
        },

        initialize: function () {
            this.views = _.result(this, 'views');

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

        transition: function (view) {
            // handle initial page load
            if (!this.views.transitioner) {
                this.views.transitioner = new TransitionerView({
                    active_view: view,
                    el: '.js-Backbone',
                });
                return;
            }

            this.views.transitioner.transition(view);
        },

        // route methods

        contact: function () {
            if (!this.views.contact) {
                this.views.contact = new ContactView();
            }
            this.transition(this.views.contact);
        },

        home: function () {
            this.staticPage('home');
        },

        notFound: function () {
            this.staticPage('notFound');
        },

        staticPage: function (templateName) {
            this.transition(new StaticView({
                // remove any trailing slashes
                template: templateName || Backbone.history.fragment.replace(/[\/]+$/, ''),
            }));
        },

    });

    return Router;
});
