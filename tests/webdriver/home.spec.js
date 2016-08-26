'use strict';

var assert = require('./lib/assertions.js');

describe('Home page', function () {
    beforeEach(function () {
        var url = '/';

        browser.url(url);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Portland, OR. Web Developer and Software Engineer');

    assert.shared();
});
