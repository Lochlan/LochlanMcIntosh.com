define([
    'backbone',
    'templates/about',
    'templates/home',
    'templates/not-found',
    'templates/resume',
], function (Backbone,
    aboutTemplate, homeTemplate, notFoundTemplate, resumeTemplate
) {
    'use strict';

    var StaticView = Backbone.View.extend({

        template: undefined,
        templates: {
            about: aboutTemplate,
            home: homeTemplate,
            notFound: notFoundTemplate,
            resume: resumeTemplate,
        },

        initialize: function (options) {
            if (options && options.template) {
                this.setTemplate(options.template);
            }
        },

        render: function (template) {
            if (template) {
                this.setTemplate(template);
            }

            this.$el.html(this.template());

            return this;
        },

        renderTemplate: function (templateKey) {
            return this.render(templateKey);
        },

        setTemplate: function (template) {
            if (typeof template === 'string') {
                this.template = this.templates[template];
            } else {
                this.template = template;
            }
        },

    });

    return StaticView;
});
