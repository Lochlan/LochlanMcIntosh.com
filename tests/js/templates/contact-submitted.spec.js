define([
    'templates/contact-submitted',
], function (tpl) {
    'use strict';

    describe('contact submitted template', function () {
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
    });

});
