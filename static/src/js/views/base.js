define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({
        constructor: function () {
            this.model = _.result(this, 'model');
            Backbone.View.apply(this, arguments);
        },
    });

    return BaseView;
});
