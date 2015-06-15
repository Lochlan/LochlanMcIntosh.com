define([
    'templates/not-found',
], function (tpl) {
    'use strict';

    describe('not found template', function () {
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
