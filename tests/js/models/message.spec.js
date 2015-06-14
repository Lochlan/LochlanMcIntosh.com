define([
    'models/message',
], function (Message) {
    'use strict';

    describe('message model', function () {
        var model;

        beforeEach(function () {
            model = new Message();
        });

        [
            'defaults',
        ].forEach(function (propertyName) {
            it('should have a property called ' + propertyName, function () {
                expect(model[propertyName]).toBeDefined();
            });
        });

        [
            'validate',
        ].forEach(function (methodName) {
            it('should have a method called ' + methodName, function () {
                expect(typeof model[methodName]).toEqual('function');
            });
        });

        [
            'email',
            'name',
            'subject',
            'text',
        ].forEach(function (propertyName) {
            it('should have a default property called ' + propertyName, function () {
                expect(model.defaults[propertyName]).toBeDefined();
            });
        });

        describe('when saving', function () {
            var onFulfilled;
            var onRejected;

            beforeEach(function () {
                onFulfilled = jasmine.createSpy('onFulfilled');
                onRejected = jasmine.createSpy('onRejected');
                spyOn(model, 'validate').and.callThrough();

                jasmine.Ajax.install();
            });

            afterEach(function () {
                jasmine.Ajax.uninstall();
            });

            describe('when given valid data', function () {
                var returnedSavedModel;

                beforeEach(function () {
                    returnedSavedModel = model.save({
                        email: 'test.user@dev.lochlanmcintosh.com',
                        name: 'Test User',
                        subject: 'Good Luck',
                        text: 'I hope all your tests are passing!',
                    }).then(onFulfilled, onRejected);
                });

                it('should not call onRejected before the server responds', function () {
                    expect(onRejected).not.toHaveBeenCalled();
                });
            });

            describe('when given invalid data', function () {
                beforeEach(function () {
                    model.save({
                        email: '',
                        name: '',
                        subject: '',
                        text: '',
                    }).then(onFulfilled, onRejected);
                });

                it('should call onRejected before the server responds', function () {
                    expect(onRejected).toHaveBeenCalled();
                });
            });
        });
    });

});
