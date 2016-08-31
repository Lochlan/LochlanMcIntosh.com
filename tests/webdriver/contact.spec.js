'use strict';

var assert = require('./lib/assertions.js');

describe('Contact page', function () {
    beforeEach(function () {
        var url = '/contact/';

        browser
            .url(url)
            .pause(10); // wait for page load
    });

    assert.itShouldHaveTheTitle('Lochlan McIntosh - Contact');

    assert.itShouldHaveTheElement('form');
    assert.itShouldHaveTheElement('input[name="name"]');
    assert.itShouldHaveTheElement('input[name="email"]');
    assert.itShouldHaveTheElement('input[name="subject"]');
    assert.itShouldHaveTheElement('textarea[name="text"]');

    describe('when submitting the contact form', function () {
        var pageURL;

        describe('when input is valid', function () {
            beforeEach(function () {
                browser
                    .url(function(err, res) {
                        pageURL = res.value;
                    })
                    .setValue('input[name="name"]', 'name')
                    .setValue('input[name="email"]', 'email@email.org')
                    .setValue('input[name="subject"]', 'subject')
                    .setValue('textarea[name="text"]', 'text')
                    .submitForm('form')
                    .pause(2000); // wait for API response
            });

            it('Should output the success message', function () {
                browser
                    .getText('.transitioner_view-active', function(err, text) {
                        expect(text).toEqual('Your message has been submitted successfully. Thank you!');
                    });
            });

            it('should not change the URL', function () {
                // this assertion is ensuring the absence of a query string
                // if the form submit listener fails then the browser will treat the form submission naively
                browser
                    .url(function(err, res) {
                        var currentURL = res.value;
                        expect(currentURL).toEqual(pageURL);
                    });
            });
        });
    });

    assert.shared();
});
