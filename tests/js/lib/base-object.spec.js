define([
    'lib/base-object'
], function (BaseObject) {
    'use strict';

    describe('base object', function () {
        var object;

        it('should have an extend method', function () {
            expect(typeof BaseObject.extend).toEqual('function');
        });

        describe('when defined without an initialize method', function () {
            beforeEach(function () {
                spyOn(BaseObject.prototype, 'initialize').and.callThrough();
                object = new BaseObject();
            });

            describe('when constructing', function () {
                it ('should call the prototype initialize method', function () {
                    expect(BaseObject.prototype.initialize).toHaveBeenCalled();
                });
            });
        });

        describe('when defined with an initialize method', function () {
            beforeEach(function () {
                object = new (BaseObject.extend({
                    initialize: jasmine.createSpy('initialize'),
                }))();
            });

            describe('when constructing', function () {
                it ('should call initialize', function () {
                    expect(object.initialize).toHaveBeenCalled();
                });
            });
        });
    });

});
