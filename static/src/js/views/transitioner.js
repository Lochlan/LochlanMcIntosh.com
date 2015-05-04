define([
    'underscore',
    'backbone',
    'models/transitioner',
    'templates/transitioner',
    'views/static',
], function (_, Backbone, Model, template, StaticView) {
    'use strict';

    // TODO consider using Modernizr instead of this function
    // taken from http://stackoverflow.com/a/9090128/1491909
    function transitionEndEventName() {
        var i;
        var el = document.createElement('div');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    }

    var TransitionerView = Backbone.View.extend({

        model: undefined,
        template: template,

        initialize: function (options) {
            options = options || {};

            // set inital view to options.active_view or whatever is already on the page
            this.model = new Model({
                active_view: options.active_view || new StaticView({
                    template: _.template(this.$('[data-backbone-transitioner-active]').html() || ''),
                }),
            });

            // set element on active view
            this.model.get('active_view')
                .setElement(this.$('[data-backbone-transitioner-active]'));

            this.$el.addClass('transitioner_container');
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));

            this.model.get('active_view')
                .setElement(this.$('[data-backbone-transitioner-active]'))
                .render();

            if (this.model.has('incoming_view')) {
                this.model.get('incoming_view')
                    .setElement(this.$('[data-backbone-transitioner-incoming]'))
                    .render();
            }

            return this;
        },

        transition: function (requestedView) {
            this.model.set({
                incoming_view: requestedView,
            });

            this.render();

            this.model.get('incoming_view')
                .$el.removeClass('hide');

            // hack to trigger CSS transitions on newly-inserted DOM elements
            // without it elements will often render in a post-transition state
            window.setTimeout(this.startTransitionAnimation.bind(this), 20);
        },
        startTransitionAnimation: function () {
            this.model.get('active_view')
                .$el.one(transitionEndEventName(), this.onTransitioned.bind(this));

            this.model.get('active_view')
                .$el.addClass('transitioner_view_animate');

            this.model.get('incoming_view')
                .$el.addClass('transitioner_view_animate');
        },
        onTransitioned: function () {
            this.model.get('active_view')
                .undelegateEvents()
                .remove();

            this.model.set({
                active_view: this.model.get('incoming_view'),
                incoming_view: undefined,
            });

            this.render();
        },

    });

    return TransitionerView;
});
