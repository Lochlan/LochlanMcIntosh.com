define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Transitioner = Backbone.Model.extend({
        defaults: function () {
            return {
                active_view: undefined,
                incoming_view: undefined,
            };
        },
    });

    return Transitioner;
});
