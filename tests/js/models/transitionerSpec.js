define([
    'models/transitioner',
], function (Transitioner) {
    'use strict';

    describe('transitioner model', function () {
        var model;

        beforeEach(function () {
            model = new Transitioner();
        });

        it('has default properties', function () {
            expect(model.defaults).toBeDefined();
        });

        it('has attribute active_view', function () {
            expect(model.has('active_view')).toBe(true);
        });
    });

});
