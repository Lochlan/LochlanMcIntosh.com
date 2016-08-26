'use strict';

var _ = require('underscore');

var exports = module.exports = {};

exports.itShouldHaveTheElement = function (selector) {
    it('should have the element ' + selector, function () {
        browser
            .element(selector, function (err, el) {
                expect(el).toBeDefined();
            });
    });
};

exports.itShouldHaveTheTitle = function (specifiedTitle) {
    it('should have the title ' + specifiedTitle, function () {
        browser
            .getTitle(function (err, title) {
                expect(err).toBe(undefined);
                expect(title).toBe(specifiedTitle);
            });
    });
};

exports.shared = function () {
    xdescribe('when clicking the footer link', function () {
        var initialWindowHandle;
        var openedWindowHandle;

        beforeEach(function () {
            browser
                .windowHandle(function (err, windowHandle) {
                    initialWindowHandle = windowHandle.value;
                })
                .click('.footer > a')
                .windowHandles(function (err, windowHandles) {
                    openedWindowHandle = _.without(windowHandles.value, initialWindowHandle)[0]
                });
        });

        afterEach(function () {
            // close opened window
            browser
                .switchTab(openedWindowHandle)
                .close(initialWindowHandle);
        });

        it('should open an additional window', function () {
            browser
                .windowHandles(function (err, windowHandles) {
                    expect(windowHandles.value.length).toBe(2);
                });
        });
    });
};
