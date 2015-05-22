define([
    'backbone',
], function (Backbone) {
    'use strict';

    var AppState = Backbone.Model.extend({
        defaults: function () {
            return {
                page_title: '', // empty string guarantees title will change
                page_title_root: 'Lochlan McIntosh - ',
            };
        },

        getLongPageTitle: function () {
            return this.get('page_title_root') + this.get('page_title');
        },
    });

    return new AppState();
});
