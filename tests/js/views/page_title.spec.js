define([
    'views/page_title',
    'models/app_state',
], function (PageTitleView, appState) {
    'use strict';

    describe('page title view', function () {
        var view;

        beforeEach(function () {
            document.title = '';
            spyOn(PageTitleView.prototype, 'render').and.callThrough();

            view = new PageTitleView();
        });

        afterEach(function () {
            view.remove();
        });

        describe('when constructing', function () {
            it('should exist', function () {
                expect(view).toBeDefined();
            });
        });

        describe('when app state page title changes', function () {
            var old_page_title;

            beforeEach(function () {
                old_page_title = document.title;
                appState.set({ page_title: 'foo' });
            });

            afterEach(function () {
                appState.set({ page_title: '' });
            });

            it('should call render', function () {
                expect(view.render).toHaveBeenCalled();
            });

            it('should change the page title', function () {
                expect(document.title).not.toEqual(old_page_title);
            });

            it('should change the page title to the app state model page_title_root + page_title', function () {
                expect(
                    appState.get('page_title_root') + appState.get('page_title')
                ).toEqual(document.title);
            });
        });

    });

});
