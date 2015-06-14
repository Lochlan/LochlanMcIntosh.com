define([
    'models/app_state',
], function (appState) {
    'use strict';

    describe('app state model', function () {
        var model;

        beforeEach(function () {
            model = appState;
        });

        it('has default properties', function () {
            expect(model.defaults).toBeDefined();
        });

        it('has attribute page_title', function () {
            expect(model.has('page_title')).toBe(true);
        });

        it('has attribute page_title_root', function () {
            expect(model.has('page_title_root')).toBe(true);
        });

        it('should have a getLongPageTitle method', function () {
            expect(model.getLongPageTitle).toBeDefined();
        });

        describe('when calling getLongPageTitle', function () {
            it('should return a string combining page_title_root and page_title', function () {
                expect(model.getLongPageTitle())
                    .toEqual(appState.get('page_title_root') + appState.get('page_title'));
            });
        });

    });

});
