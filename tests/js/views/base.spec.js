define([
    'views/base',

    'backbone',
], function (BaseView, Backbone) {
    'use strict';

    describe('base view', function () {
        var view;

        beforeEach(function () {
            view = new BaseView();
        });

        describe('when defined with a model object', function () {
            var model;

            beforeEach(function () {
                model = new Backbone.Model();
                view = new (BaseView.extend({
                    model: model,
                }))();
            });

            describe('when constructing', function () {
                it('should have a model attribute set to the defined object', function () {
                    expect(view.model).toEqual(model);
                });
            });
        });

        describe('when defined with a model function', function () {
            var model;

            beforeEach(function () {
                view = new (BaseView.extend({
                    model: function () {
                        model = new Backbone.Model();
                        return model;
                    },
                }))();
            });

            describe('when constructing', function () {
                it('should have a model attribute set to the defined function\'s return value', function () {
                    expect(view.model).toEqual(model);
                });
            });
        });
    });

});
