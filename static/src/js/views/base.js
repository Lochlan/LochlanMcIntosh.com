define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({
        constructor: function () {
            [
                'collection',
                'model',
            ].forEach(function (propertyName) {
                this[propertyName] = _.result(this, propertyName);
            }.bind(this));

            Backbone.View.apply(this, arguments);
        },
    });

    return BaseView;
});
