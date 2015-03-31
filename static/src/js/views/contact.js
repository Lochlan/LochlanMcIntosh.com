define([
    'underscore',
    'backbone',
    'models/message',
    'templates/contact',
], function (_, Backbone, Model, template) {
    'use strict';

    var ContactView = Backbone.View.extend({

        model: new Model(),
        template: template,

        render: function () {
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

        submit: function (event) {
            event.preventDefault();

            var userInput = _.object(
                _.map(this.$('form [name]'), function (field) {
                    return [field.name, field.value];
                })
            );

            this.model.save(userInput)
                .then(function (value) {
                    console.log('success', value);
                    this.$('form')[0].reset();

                    // TODO output success message
                }.bind(this), function (reason) {
                    console.log('error', reason);

                    // TODO output error
                });
        },

        events: {
            'submit form': 'submit',
        },

    });

    return ContactView;
});
