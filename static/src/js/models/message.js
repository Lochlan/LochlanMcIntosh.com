define([
    'backbone',
], function (Backbone) {
    'use strict';

    // TODO build this out!
    var Message = Backbone.Model.extend({
        defaults: {
            email: '',
            subject: '',
            message: '',
        },
    });

    return Message;
});
