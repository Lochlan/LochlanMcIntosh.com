define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Message = Backbone.Model.extend({
        defaults: {
            email: '',
            name: '',
            subject: '',
            text: '',
        },

        urlRoot: '/api/contact/',

    });

    return Message;
});
