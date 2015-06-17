define([
    'models/app_state',
], function (appState) {
    'use strict';

    describe('app state model', function () {
        var model;

        beforeEach(function () {
            model = appState;
        });

        [
            'defaults',
        ].forEach(function (property) {
            it('should have a property called ' + property, function () {
                expect(model[property]).toBeDefined();
            });
        });

        [
            'page_title',
            'page_title_root',
        ].forEach(function (attribute) {
            it('should have an attribute called ' + attribute, function () {
                expect(model.has(attribute)).toBe(true);
            });
        });

        [
            'getLongPageTitle',
        ].forEach(function (method) {
            it('should have a method called ' + method, function () {
                expect(typeof model[method]).toEqual('function');
            });
        });

        describe('when calling getLongPageTitle', function () {
            it('should return a string combining page_title_root and page_title', function () {
                expect(model.getLongPageTitle())
                    .toEqual(appState.get('page_title_root') + appState.get('page_title'));
            });
        });

    });

});
