'use strict';

describe('Home page', function() {
    var pageURL = '/';

    it('should have the right title', function(done) {

        browser
            .url(pageURL)
            .getTitle(function(err, title) {
                expect(err).toBe(undefined);
                expect(title).toBe('Lochlan McIntosh - Portland, OR. Web Developer and Software Engineer');
            })
            .call(done);

    });

});
