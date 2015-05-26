define([
    'jquery',
    'underscore',
    'views/transitioner',
    'views/static',
    'templates/transitioner',
], function ($, _, TransitionerView, StaticView, transitionerTemplate) {
    'use strict';

    describe('transitioner view', function () {
        var view;

        beforeEach(function () {
            $('<section id="transitionerView">' + transitionerTemplate() + '</section>')
                .appendTo('body');

            view = new TransitionerView({
                el: '#transitionerView',
            });
        });

        afterEach(function () {
            view.remove();
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(view).toBeDefined();
            });

            it('should have a model', function () {
                expect(view.model).toBeDefined();
            });

            it('should have a template', function () {
                expect(view.template).toBeDefined();
            });

            it('should have transitioner_container class on el', function () {
                expect(view.el.classList.contains('transitioner_container')).toBe(true);
            });

            describe('with a specified active view', function () {
                var activeView;

                beforeEach(function () {
                    activeView = new StaticView({
                        template: _.template('<h1>Hello, world!</h1>'),
                    });

                    // hack: remove the view created in the outer beforeEach
                    view.setElement($('<div></div>'));
                    view.remove();

                    view = new TransitionerView({
                        active_view: activeView,
                        el: '#transitionerView',
                    });
                });

                afterEach(function () {
                    activeView.remove();
                });

                it('should set that active view in the model', function () {
                    expect(view.model.get('active_view')).toBe(activeView);
                });

                it("should set the active view's el to [data-backbone-transitioner-active]", function () {
                    expect(view.model.get('active_view').el)
                        .toBe(view.el.querySelector('[data-backbone-transitioner-active]'));
                });
            });
        });

        describe('when rendered before a transition', function () {
            beforeEach(function () {
                view.render();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            describe('active view', function () {
                it('should not have content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                    ).toEqual('');
                });
            });

            describe('incoming view', function () {
                it('should not have content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                    ).toEqual('');
                });

                it('should have the "hide" class', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]')
                            .classList.contains('hide')
                    ).toEqual(true);
                });
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

            it('should call startTransitionAnimation', function () {
                expect(view.startTransitionAnimation).toHaveBeenCalled();
            });

            describe('active view', function () {
                it('should have data attribute "transitioning"', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-active]')
                            .dataset.transitioning
                    ).toBeDefined();
                });
            });

            describe('incoming view', function () {
                it('should have content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                    ).not.toEqual('');
                });

                it('should have content equal to the template content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                    ).toEqual(templateContent);
                });

                it('should have data attribute "transitioning"', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]')
                            .dataset.transitioning
                    ).toBeDefined();
                });
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
                    $('[data-backbone-transitioner-active]').trigger(view.getTransitionEndEventName());
                    done();
                }, 30);
            });

            it('should call onTransitioned', function () {
                expect(view.onTransitioned).toHaveBeenCalled();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            describe('active view', function () {
                it('should have content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                    ).not.toEqual('');
                });

                it('should have content equal to the template content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                    ).toEqual(templateContent);
                });
            });

            describe('incoming view', function () {
                it('should have no content', function () {
                    expect(
                        view.el.querySelector('[data-backbone-transitioner-incoming]').innerHTML
                    ).toEqual('');
                });
            });
        });
    });

});
