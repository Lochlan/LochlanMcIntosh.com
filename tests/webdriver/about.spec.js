'use strict';

var assert = require('./lib/assertions.js');

describe('About page', function () {
    beforeEach(function (done) {
        var url = '/about/';

        browser
            .url(url)
            .call(done);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - About Me');

    assert.shared();
});
