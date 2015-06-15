define([
    'templates/contact-error',
], function (tpl) {
    'use strict';

    describe('contact error template', function () {
        var template;

        beforeEach(function () {
            template = tpl;
        });

        it('exists', function () {
            expect(template).toBeDefined();
        });

        it('has content when rendered', function () {
            expect(template()).not.toEqual('');
        });

        it('outputs a message when error_status_code == 429', function () {
            expect(template({ error_status_code: 429 })).not.toEqual(template());
        });
    });

});
