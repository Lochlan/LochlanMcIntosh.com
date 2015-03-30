define([
    'backbone',
    'models/message',
    'templates/contact',
], function (Backbone, Model, template) {
    'use strict';

    var ContactView = Backbone.View.extend({

        model: new Model(),
        template: template,

        render: function () {
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

    });

    return ContactView;
});
