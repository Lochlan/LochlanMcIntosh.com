define([
    'models/promise_validate_model',
], function (PromiseValidateModel) {
    'use strict';

    var Message = PromiseValidateModel.extend({
        defaults: {
            email: '',
            name: '',
            subject: '',
            text: '',
        },

        validate: function (attributes, options) {

            var errors = _.extend(
                {},
                _.object(
                    // remove any implicitly returned undefined values from _.map
                    _.compact(
                        _.map([
                            'email',
                            'name',
                            'subject',
                            'text',
                        ], function (field) {
                            if (attributes[field].length === 0) {
                                return [field, ['This field may not be blank.']];
                            }
                        })
                    )
                )
            );

            return JSON.stringify(errors) === '{}' ? undefined : errors;

        },

        urlRoot: '/api/contact/',

    });

    return Message;
});
