'use strict';

var assert = require('./lib/assertions.js');

describe('Résumé page', function () {
    beforeEach(function (done) {
        var url = '/resume/';

        browser
            .url(url)
            .call(done);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Résumé');

    assert.shared();
});
