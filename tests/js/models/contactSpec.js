define([
    'models/contact',
], function (Contact) {
    'use strict';

    describe('contact model', function () {
        var contact;

        beforeEach(function() {
            contact = new Contact({
                email: 'test.user@gmail.com',
                subject: 'Good Luck',
                message: 'I hope all your tests are passing!',
            });
        });

        it('has default properties', function() {
            expect(contact.defaults).toBeDefined();
            expect(contact.defaults.email).toBeDefined();
            expect(contact.defaults.subject).toBeDefined();
            expect(contact.defaults.message).toBeDefined();
        });
    });

});
