define([
    'models/promise_validate_model',
], function (PromiseValidateModel) {
    'use strict';

    var TestModelFailingValidation = PromiseValidateModel.extend({
        url: '/some/fake/url',
        validate: function () {
            return 'returning anything is considered a failure';
        },
    });

    var TestModelPassingValidation = PromiseValidateModel.extend({
        url: '/some/fake/url',
    });

    describe('promise validate model', function () {
        var model;

        beforeEach(function () {
            jasmine.Ajax.install();
        });

        afterEach(function () {
            jasmine.Ajax.uninstall();
        });

        describe('when saving', function () {
            var modelSaveReturnValue;

            describe('and failing validation', function () {
                beforeEach(function () {
                    model = new TestModelFailingValidation();
                    modelSaveReturnValue = model.save();
                });

                it('returns a thennable object', function () {
                    expect(modelSaveReturnValue.then).toBeDefined();
                });
            });

            describe('and passing validation', function () {
                beforeEach(function () {
                    model = new TestModelPassingValidation();
                    modelSaveReturnValue = model.save();
                });

                it('returns a thennable object', function () {
                    expect(modelSaveReturnValue.then).toBeDefined();
                });
            });
        });
    });

});
