'use strict';

var assert = require('./lib/assertions.js');

describe('Contact page', function () {
    beforeEach(function (done) {
        var url = '/contact/';

        browser
            .url(url)
            .call(done);
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Contact');

    assert.itShouldHaveTheElement('form');
    assert.itShouldHaveTheElement('input[name="name"]');
    assert.itShouldHaveTheElement('input[name="email"]');
    assert.itShouldHaveTheElement('input[name="subject"]');
    assert.itShouldHaveTheElement('textarea[name="text"]');

    assert.shared();
});
