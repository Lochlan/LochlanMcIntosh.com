define([
    'underscore',
    'views/contact',
], function (_, ContactView) {
    'use strict';

    describe('contact view', function () {
        var view;

        beforeEach(function () {
            view = new ContactView();
        });

        describe('when constructing', function () {
            it('should exist', function () {
                expect(view).toBeDefined();
            });

            it('should have a model', function () {
                expect(view.model).toBeDefined();
            });

            it('should have a template', function () {
                expect(view.template).toBeDefined();
            });

            it('should have an events hash', function () {
                expect(view.events).toBeDefined();
            });

            it('should have all methods listed in the events hash', function () {
                _.each(view.events, function (methodName) {
                    expect(view[methodName]).toBeDefined();
                });
            });

            it('should have a submit method', function () {
                expect(view.submit).toBeDefined();
            });

            it('should have a submitSuccess method', function () {
                expect(view.submitSuccess).toBeDefined();
            });

            it('should have a submitError method', function () {
                expect(view.submitError).toBeDefined();
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

            describe('when filling out and submitting the form', function () {
                var formInput = {
                    name: 'Test User',
                    email: 'test@lochlanmcintosh.com',
                    subject: 'JavaScript Test Message',
                    text: 'This is a test.',
                };

                beforeEach(function () {
                    _.each(formInput, function (value, key) {
                        view.el.querySelector('form [name="' + key + '"]').value = value;
                    });

                    spyOn(view, 'submit').and.callThrough();
                    spyOn(view.model, 'save').and.callThrough();
                    spyOn(view, 'submitSuccess').and.callThrough();
                    spyOn(view, 'submitError').and.callThrough();
                    view.delegateEvents();

                    jasmine.Ajax.install();
                    view.$('form').submit();
                });

                afterEach(function () {
                    jasmine.Ajax.uninstall();
                });

                it('should call submit', function () {
                    expect(view.submit).toHaveBeenCalled();
                });

                it('should disable the submit button', function () {
                    expect(
                        view.el.querySelector('form input[type="submit"]').disabled
                    ).toEqual(true);
                });

                it('should save the model', function () {
                    expect(view.model.save).toHaveBeenCalled();
                });

                it('should send a request to /api/contact/', function () {
                    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/contact/');
                });

                describe('when the server responds with a 200', function () {
                    beforeEach(function () {
                        jasmine.Ajax.requests.mostRecent().respondWith({
                            'status': 202,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify(formInput),
                        });
                    });

                    it('should call submitSuccess', function () {
                        expect(view.submitSuccess).toHaveBeenCalled();
                    });
                });

                describe('when the server responds with a 400', function () {
                    beforeEach(function () {
                        jasmine.Ajax.requests.mostRecent().respondWith({
                            'status': 400,
                            'contentType': 'application/json',
                        });
                    });

                    it('should call submitError', function () {
                        expect(view.submitError).toHaveBeenCalled();
                    });
                });

            });
        });
    });

});
