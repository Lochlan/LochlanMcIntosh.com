define([
    'underscore',
    'backbone',
    'models/message',
    'templates/contact',
    'templates/contact-submitted',
], function (_, Backbone, Model, contactTpl, contactSubmittedTpl) {
    'use strict';

    var ContactView = Backbone.View.extend({

        model: new Model(),
        template: contactTpl,

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

        submit: function (event) {
            event.preventDefault();

            this.model.save(
                _.extend({
                    disabled: true,
                    error_status_code: 0,
                }, this.$('form').serializeObject())
            ).then(
                this.submitSuccess.bind(this),
                this.submitError.bind(this)
            );
        },
        submitSuccess: function () {
            this.template = contactSubmittedTpl;
            this.render();
        },
        submitError: function (reason) {
            this.model.set(
                _.extend({}, this.model.attributes, {
                    disabled: false,
                    error_status_code: reason.status,
                })
            );
        },

        events: {
            'submit form': 'submit',
        },

    });

    return ContactView;
});
