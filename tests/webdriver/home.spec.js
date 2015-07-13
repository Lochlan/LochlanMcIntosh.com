'use strict';

var assert = require('./lib/assertions.js');

describe('Home page', function () {
    beforeEach(function (done) {
        var url = '/';

        browser
            .url(url)
            .call(done);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Portland, OR. Web Developer and Software Engineer');

    assert.shared();
});
