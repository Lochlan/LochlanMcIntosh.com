define([
    'underscore',
    'views/static',
], function (_, StaticView) {
    'use strict';

    describe('static view', function () {
        var view;

        describe('when constructing', function () {
            // TODO Reduce code duplication in these tests
            describe('without a passed-in or specified template', function () {

                beforeEach(function() {
                    view = new StaticView();
                });

                // shared

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                it('should have an initialize method', function () {
                    expect(view.initialize).toBeDefined();
                });

                it('should have a render method', function () {
                    expect(view.render).toBeDefined();
                });

                it('should have a renderTemplate method', function () {
                    expect(view.renderTemplate).toBeDefined();
                });

                 it('should have a setTemplate method', function () {
                    expect(view.setTemplate).toBeDefined();
                });

                // unshared

                it('should not have a template set', function() {
                    expect(view.template).not.toBeDefined();
                });

                it('should throw an exception if render is called without an argument', function() {
                    expect(view.render.bind(view)).toThrow();
                });
            });

            describe('with a specified template', function () {
                beforeEach(function() {
                    view = new StaticView({
                        template: 'home',
                    });
                });

                // shared

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                it('should have an initialize method', function () {
                    expect(view.initialize).toBeDefined();
                });

                it('should have a render method', function () {
                    expect(view.render).toBeDefined();
                });

                it('should have a renderTemplate method', function () {
                    expect(view.renderTemplate).toBeDefined();
                });

                 it('should have a setTemplate method', function () {
                    expect(view.setTemplate).toBeDefined();
                });

                // unshared

                it('should have a template set', function() {
                    expect(view.template).toBeDefined();
                });

                it('should not throw an exception if render is called without an argument', function() {
                    expect(view.render.bind(view)).not.toThrow();
                });
            });

            describe('with a passed-in template', function () {
                var template = _.template('<h1>Hello, world!</h1>');

                beforeEach(function() {
                    view = new StaticView({
                        template: template,
                    });
                });

                // shared

                it ('should exist', function () {
                    expect(view).toBeDefined();
                });

                it('should have an initialize method', function () {
                    expect(view.initialize).toBeDefined();
                });

                it('should have a render method', function () {
                    expect(view.render).toBeDefined();
                });

                it('should have a renderTemplate method', function () {
                    expect(view.renderTemplate).toBeDefined();
                });

                 it('should have a setTemplate method', function () {
                    expect(view.setTemplate).toBeDefined();
                });

                // unshared

                it('should have a template set', function() {
                    expect(view.template).toBeDefined();
                });

                it('should not throw an exception if render is called without an argument', function() {
                    expect(view.render.bind(view)).not.toThrow();
                });
            });
        });

        describe('when rendered with a passed-in template', function () {
            var template = _.template('<h1>Hello, world!</h1>');

            beforeEach(function () {
                view = new StaticView();
                view.render(template);
            });

            it('should have a template set to the passed-in value', function() {
                expect(view.template).toEqual(template);
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });
        });

        describe('when rendered with renderTemplate', function () {
            beforeEach(function () {
                view = new StaticView();
                spyOn(view, 'render').and.callThrough();
                view.renderTemplate('about');
            });

            it('should have a template set', function() {
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

});
