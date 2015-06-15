define([
    'templates/contact',

    'jquery',
    'underscore',
], function (tpl, $, _) {
    'use strict';

    describe('contact template', function () {
        var template;

        beforeEach(function () {
            template = tpl;
        });

        it('exists', function () {
            expect(template).toBeDefined();
        });

        describe('when rendered', function () {
            var templateFormInputData;
            var templateOutput;
            var formInputs;

            describe('without data', function () {
                beforeEach(function () {
                    templateFormInputData = {
                        name: '',
                        email: '',
                        subject: '',
                        text: '',
                    };
                    templateOutput = template();
                    formInputs = $(templateOutput).find('form').serializeObject();
                });

                it('has content', function () {
                    expect(templateOutput).not.toEqual('');
                });

                it('has form inputs equal to the template input', function () {
                    expect(formInputs).toEqual(templateFormInputData);
                });
            });

            describe('with data', function () {
                beforeEach(function () {
                    templateFormInputData = {
                        name: 'Test User',
                        email: 'test@lochlanmcintosh.com',
                        subject: 'JavaScript Test Message',
                        text: 'This is a test.',
                    };
                    templateOutput = template(templateFormInputData);
                    formInputs = $(templateOutput).find('form').serializeObject();
                });

                it('has content', function () {
                    expect(templateOutput).not.toEqual('');
                });

                it('has form inputs equal to the template input', function () {
                    expect(formInputs).toEqual(templateFormInputData);
                });
            });

            [
                'name',
                'email',
                'subject',
                'text',
            ].forEach(function (propertyName) {
                describe('with a ' + propertyName + ' error', function () {
                    var errorMessage;

                    beforeEach(function () {
                        var errorJSON = {};
                        errorMessage = 'test ' + propertyName + ' error';
                        errorJSON[propertyName] = [errorMessage];
                        templateOutput = template({
                            errorJSON: errorJSON,
                        });
                    });

                    it('has content', function () {
                        expect(templateOutput).not.toEqual('');
                    });

                    it('changes the output', function () {
                        expect(templateOutput).not.toEqual(template());
                    });

                    it('displays the error message', function () {
                        expect(templateOutput.indexOf(errorMessage)).not.toEqual(-1);
                    });
                });
            });

            describe('with an error status code', function () {
                beforeEach(function () {
                    templateOutput = template({
                        error_status_code: 429,
                    });
                });

                it('has content', function () {
                    expect(templateOutput).not.toEqual('');
                });

                it('changes the output', function () {
                    expect(templateOutput).not.toEqual(template());
                });
            });

            describe('with error detail', function () {
                var errorMessage;
                beforeEach(function () {
                    errorMessage = 'detailed error message';
                    templateOutput = template({
                        errorJSON: {
                            detail: errorMessage,
                        },
                    });
                });

                it('has content', function () {
                    expect(templateOutput).not.toEqual('');
                });

                it('changes the output', function () {
                    expect(templateOutput).not.toEqual(template());
                });

                it('displays the error message', function () {
                    expect(templateOutput.indexOf(errorMessage)).not.toEqual(-1);
                });
            });
        });
    });

});
