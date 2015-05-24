define([
    'models/message',
], function (Message) {
    'use strict';

    describe('message model', function () {
        var message;

        beforeEach(function () {
            message = new Message({
                email: 'test.user@dev.lochlanmcintosh.com',
                name: 'Test User',
                subject: 'Good Luck',
                text: 'I hope all your tests are passing!',
            });
        });

        it('has default properties name, email, subject, and text', function () {
            expect(message.defaults).toBeDefined();
            expect(message.defaults.name).toBeDefined();
            expect(message.defaults.email).toBeDefined();
            expect(message.defaults.subject).toBeDefined();
            expect(message.defaults.text).toBeDefined();
        });
    });

});
