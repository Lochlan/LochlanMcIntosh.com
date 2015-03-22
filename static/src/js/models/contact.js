define([
    'backbone',
], function (Backbone) {
    'use strict';

    // TODO build this out!
    var Contact = Backbone.Model.extend({
        defaults: {
            email: '',
            subject: '',
            message: '',
        },
    });

    return Contact;
});
