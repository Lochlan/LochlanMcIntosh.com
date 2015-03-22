define([
    'jquery',
    'underscore',
    'views/transitioner',
    'views/static',
], function ($, _, TransitionerView, StaticView) {
    'use strict';

    describe('transitioner view', function () {
        var view;

        beforeEach(function() {
            $('<section id="transitionerView"></section>').appendTo('body');
            view = new TransitionerView({
                el: '#transitionerView',
            });
        });

        afterEach(function () {
            $('#transitionerView').remove();
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(view).toBeDefined();
            });

            it('should have a model', function() {
                expect(view.model).toBeDefined();
            });

            it('should have a template', function() {
                expect(view.template).toBeDefined();
            });
        });

        describe('when rendered before a transition', function () {
            beforeEach(function () {
                view.render();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            it('should not have content in [data-backbone-transitioner-active]', function () {
                expect(view.el.querySelector('[data-backbone-transitioner-active]').innerHTML)
                    .toEqual('');
            });

            it('should not have content in [data-backbone-transitioner-incoming]', function () {
                expect(view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML)
                    .toEqual('');
            });
        });

        describe('when starting a transition', function () {
            var templateContent = '<h1>Hello, world!</h1>';

            beforeEach(function (done) {
                spyOn(view, 'render').and.callThrough();
                spyOn(view, 'startTransitionAnimation').and.callThrough();

                view.transition(new StaticView({
                    template: _.template(templateContent),
                }));

                // account for 20ms setTimeout in transition method
                setTimeout(function () {
                    done();
                }, 25);
            });

            it('should call render', function () {
                expect(view.render).toHaveBeenCalled();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            it('should have content in [data-backbone-transitioner-incoming]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                ).not.toEqual('');
            });

            it('should have content in [data-backbone-transitioner-incoming] equal to the template content', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                ).toEqual(templateContent);
            });

            it('should call startTransitionAnimation', function () {
                expect(view.startTransitionAnimation).toHaveBeenCalled();
            });

            it('should have an active_view with class "transitioner_view_animate"', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-active]')
                        .classList.contains('transitioner_view_animate')
                ).toEqual(true);
            });

            it('should have an incoming_view with class "transitioner_view_animate"', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]')
                        .classList.contains('transitioner_view_animate')
                ).toEqual(true);
            });
        });

        describe('after a transition', function () {
            var templateContent = '<h1>Hello, world!</h1>';

            beforeEach(function (done) {
                spyOn(view, 'onTransitioned').and.callThrough();

                view.transition(new StaticView({
                    template: _.template(templateContent),
                }));

                // account for 20ms setTimeout in transition method
                setTimeout(function () {
                    // Fake transitionend event
                    // Since no CSS is loaded the transition classes don't do anything
                    $('[data-backbone-transitioner-active]').trigger('webkitTransitionEnd');
                    done();
                }, 30);
            });

            it('should call onTransitioned', function () {
                expect(view.onTransitioned).toHaveBeenCalled();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            it('should have content in [data-backbone-transitioner-active]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                ).not.toEqual('');
            });

            it('should have content in [data-backbone-transitioner-active] equal to the template content', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                ).toEqual(templateContent);
            });

            it('should have no content in [data-backbone-transitioner-incoming]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                ).toEqual('');
            });
        });
    });

});
