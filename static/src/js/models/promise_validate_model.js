define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var PromiseValidateModel = Backbone.Model.extend({
        save: function () {
            var modelSaveReturnValue = Backbone.Model.prototype.save.apply(this, arguments);

            // validation has failed
            if (modelSaveReturnValue === false) {
                return $.Deferred().reject().promise();
            }

            return modelSaveReturnValue;
        },
    });

    return PromiseValidateModel;
});
