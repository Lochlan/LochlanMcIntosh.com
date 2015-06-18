define([
    'underscore',
    'backbone',
    'models/app_state',
    'models/transitioner',
    'templates/transitioner',
], function (_, Backbone, appState, Transitioner, template) {
    'use strict';

    var TransitionerView = Backbone.View.extend({

        model: undefined,
        template: template,

        initialize: function (options) {
            if (!options || !options.active_view) {
                throw new Error('options.active_view required');
            }

            this.model = new Transitioner({
                active_view: options.active_view,
            });

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

        // TODO consider using Modernizr instead of this function
        // taken from http://stackoverflow.com/a/9090128/1491909
        getTransitionEndEventName: function () {
            var i;
            var el = document.createElement('div');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'otransitionend',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (i in transitions) {
                if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                    return transitions[i];
                }
            }
        },

        transition: function (requestedView) {
            this.model.set({
                incoming_view: requestedView,
            });

            this.render();

            this.model.get('incoming_view')
                .$el.removeClass('hide');

            appState.set('page_title',
                this.model.get('incoming_view').$('[data-page-title]').data('page-title'));

            // hack to trigger CSS transitions on newly-inserted DOM elements
            // without it elements will often render in a post-transition state
            window.setTimeout(this.startTransitionAnimation.bind(this), 20);
        },
        startTransitionAnimation: function () {
            this.model.get('active_view')
                .$el.one(this.getTransitionEndEventName(), this.onTransitioned.bind(this));

            this.model.get('active_view').el.setAttribute('data-transitioning', true);
            this.model.get('incoming_view').el.setAttribute('data-transitioning', true);
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
