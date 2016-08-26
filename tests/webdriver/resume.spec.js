'use strict';

var assert = require('./lib/assertions.js');

describe('Résumé page', function () {
    beforeEach(function () {
        var url = '/resume/';

        browser.url(url);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Résumé');

    assert.shared();
});
