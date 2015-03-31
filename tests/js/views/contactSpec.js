define([
    'underscore',
    'views/contact',
], function (_, ContactView) {
    'use strict';

    describe('contact view', function () {
        var view;

        beforeEach(function() {
            view = new ContactView();
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(view).toBeDefined();
            });

            it('should have a model', function() {
                expect(view.model).toBeDefined();
            });

            it('should have a template', function() {
                expect(view.template).toBeDefined();
            });
        });

        describe('when rendered', function () {
            beforeEach(function () {
                view.render();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            it ('should have form fields', function () {
                expect(view.$('form [name]').length).not.toEqual(0);
            });

            it ('should have empty form fields', function () {
                _.map(view.$('form [name]'), function (input) {
                    expect(input.value).toEqual('');
                });
            });

            it ('should have placeholders on all form fields', function () {
                _.map(view.$('form [name]'), function (input) {
                    expect(input.placeholder).not.toEqual('');
                });
            });
        });
    });

});
