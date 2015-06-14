define([
    'views/static',

    'underscore',
    'backbone',
], function (StaticView, _, Backbone) {
    'use strict';

    describe('static view', function () {
        var view;

        afterEach(function () {
            view.remove();
        });

        describe('when constructing', function () {

            describe('without a passed-in or specified template', function () {
                beforeEach(function () {
                    view = new StaticView();
                });

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                [
                    'initialize',
                    'render',
                ].forEach(function (methodName) {
                    it('should have a method called ' + methodName + ' that overrides the prototype', function () {
                        expect(typeof view[methodName]).toEqual('function');
                        expect(view[methodName]).not.toEqual(Backbone.View.prototype[methodName]);
                    });
                });

                [
                    'renderTemplate',
                    'setTemplate',
                ].forEach(function (methodName) {
                    it('should have a method called ' + methodName, function () {
                        expect(typeof view[methodName]).toEqual('function');
                    });
                });

                it('should not have a template set', function () {
                    expect(view.template).not.toBeDefined();
                });

                it('should throw an exception if render is called without an argument', function () {
                    expect(view.render.bind(view)).toThrow();
                });

                describe('when rendered with a passed-in template', function () {
                    var template = _.template('<h1>Hello, world!</h1>');

                    beforeEach(function () {
                        view.render(template);
                    });

                    it('should have a template set to the passed-in value', function () {
                        expect(view.template).toEqual(template);
                    });

                    it('should have content in el', function () {
                        expect(view.el.innerHTML).not.toEqual('');
                    });
                });

                describe('when rendered with renderTemplate', function () {
                    beforeEach(function () {
                        spyOn(view, 'render').and.callThrough();
                        view.renderTemplate('about');
                    });

                    it('should have a template set', function () {
                        expect(view.template).toBeDefined();
                    });

                    it('should call render', function () {
                        expect(view.render).toHaveBeenCalled();
                    });

                    it('should have content in el', function () {
                        expect(view.el.innerHTML).not.toEqual('');
                    });
                });
            });

            describe('with a specified template', function () {
                beforeEach(function () {
                    view = new StaticView({
                        template: 'home',
                    });
                });

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                it('should have a template set', function () {
                    expect(view.template).toBeDefined();
                });

                it('should not throw an exception if render is called without an argument', function () {
                    expect(view.render.bind(view)).not.toThrow();
                });
            });

            describe('with a passed-in template', function () {
                var template = _.template('<h1>Hello, world!</h1>');

                beforeEach(function () {
                    view = new StaticView({
                        template: template,
                    });
                });

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                it('should have a template set', function () {
                    expect(view.template).toBeDefined();
                });

                it('should not throw an exception if render is called without an argument', function () {
                    expect(view.render.bind(view)).not.toThrow();
                });
            });
        });
    });

});
