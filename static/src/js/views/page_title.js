define([
    'backbone',
    'models/app_state',
], function (Backbone, appState) {
    'use strict';

    var PageTitleView = Backbone.View.extend({

        initialize: function () {
            this.listenTo(appState, 'change:page_title', this.render);
        },

        render: function () {
            document.title = appState.getLongPageTitle();
            return this;
        },

    });

    return PageTitleView;
});
