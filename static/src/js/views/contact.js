define([
    'underscore',
    'backbone',
    'models/message',
    'templates/contact',
    'templates/contact-submitted',
    'templates/contact-error',
], function (_, Backbone, Model, contactTpl, contactSubmittedTpl, contactErrorTpl) {
    'use strict';

    // Hack for Android 4 (window.name defaults to "context")
    // Swig templates look for variables in the global namespace
    // An unset template variable {{ name }} has the value of window.name
    // See: https://github.com/paularmstrong/swig/issues/559
    window.name = '';

    var ContactView = Backbone.View.extend({

        model: undefined,
        template: contactTpl,

        initialize: function () {
            this.model = new Model();

            this.submitSuccess = this.submitSuccess.bind(this);
            this.submitError = this.submitError.bind(this);

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
                this.submitSuccess,
                this.submitError
            );
        },
        submitSuccess: function () {
            this.template = contactSubmittedTpl;
            this.render();
        },
        submitError: function (reason) {
            if (reason.status === 429) {
                this.template = contactErrorTpl;
            }

            this.model.set(
                _.extend({}, this.model.attributes, {
                    disabled: false,
                    error_status_code: reason.status,
                    errorJSON: reason.responseJSON || this.model.validationError || {},
                })
            );
        },

        events: {
            'submit form': 'submit',
        },

    });

    return ContactView;
});
