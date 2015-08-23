define([
    'underscore',
    'lib/base-object',
    'router',
    'views/contact',
    'views/page_title',
    'views/static',
    'views/transitioner',
], function (_, BaseObject, Router, ContactView, PageTitleView, StaticView, TransitionerView) {
    'use strict';

    var App = BaseObject.extend({

        router: function () {
            return new Router({ app: this });
        },

        views: function () {
            // views that should persist across page transitions
            return {
                contact: undefined,
                page_title: new PageTitleView(),
                transitioner: undefined,
            };
        },

        initialize: function () {
            this.views = _.result(this, 'views');
            this.goTo = _.result(this, 'goTo');
            this.router = _.result(this, 'router');
        },

        goTo: function () {
            return _.object(_.map({
                about: function () {
                    this.staticPage('about');
                },

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

                resume: function () {
                    this.staticPage('resume');
                },
            }, function (method, key) {
                return [key, method.bind(this)];
            }.bind(this)));
        },

        staticPage: function (templateName) {
            this.transition(new StaticView({
                template: templateName,
            }));
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
    });

    return App;
});
