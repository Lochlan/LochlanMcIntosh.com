'use strict';

var assert = require('./lib/assertions.js');

describe('About page', function () {
    beforeEach(function () {
        var url = '/about/';

        browser.url(url);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - About Me');

    assert.shared();
});
