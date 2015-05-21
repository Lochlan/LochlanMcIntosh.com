define([
    'backbone',
], function (Backbone) {
    'use strict';

    var Transitioner = Backbone.Model.extend({
        defaults: function () {
            return {
                active_view: new Backbone.View(),
                incoming_view: undefined,
            };
        },
    });

    return Transitioner;
});
