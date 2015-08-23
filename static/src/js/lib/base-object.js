define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    function BaseObject() {
        this.initialize.apply(this, arguments);
    }


    _.extend(BaseObject.prototype, {
        initialize: function () {},
    });

    BaseObject.extend = Backbone.Model.extend;

    // console.log(BaseObject.prototype.extend);

    return BaseObject;
});
