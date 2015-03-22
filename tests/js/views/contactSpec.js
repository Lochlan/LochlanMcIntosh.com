define([
    'views/contact',
], function (ContactView) {
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
        });
    });

});
