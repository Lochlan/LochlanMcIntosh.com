define([
    'models/message',
], function (Message) {
    'use strict';

    describe('message model', function () {
        var message;

        beforeEach(function() {
            message = new Message({
                email: 'test.user@gmail.com',
                subject: 'Good Luck',
                message: 'I hope all your tests are passing!',
            });
        });

        it('has default properties', function() {
            expect(message.defaults).toBeDefined();
            expect(message.defaults.email).toBeDefined();
            expect(message.defaults.subject).toBeDefined();
            expect(message.defaults.message).toBeDefined();
        });
    });

});
