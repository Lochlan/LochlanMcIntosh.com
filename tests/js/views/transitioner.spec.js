define([
    'views/transitioner',

    'backbone',
    'models/app_state',
], function (TransitionerView, Backbone, appState) {
    'use strict';

    describe('transitioner view', function () {
        var view;
        var initialActiveView;

        beforeEach(function () {
            spyOn(Backbone.View.prototype, 'render').and.callThrough();
            spyOn(TransitionerView.prototype, 'render').and.callThrough();

            initialActiveView = new Backbone.View();
            view = new TransitionerView({
                active_view: initialActiveView,
            });
        });

        afterEach(function () {
            view.remove();
        });

        describe('when constructing without an active view', function () {
            it ('should throw an error', function () {
                expect(function () { new TransitionerView(); }).toThrow();
            });
        });

        describe('when constructing', function () {
            it ('should exist', function () {
                expect(view).toBeDefined();
            });

            [
                'model',
                'template',
            ].forEach(function (propertyName) {
                it('should have a property called ' + propertyName, function () {
                    expect(view[propertyName]).toBeDefined();
                });
            });

            [
                'getTransitionEndEventName',
                'onTransitioned',
                'startTransitionAnimation',
                'transition',
            ].forEach(function (methodName) {
                it('should have a method called ' + methodName, function () {
                    expect(typeof view[methodName]).toEqual('function');
                });
            });

            it('should set the active view to the one passed in', function () {
                expect(view.model.get('active_view')).toEqual(initialActiveView);
            });

            it('should have transitioner_container class on el', function () {
                expect(view.el.classList.contains('transitioner_container')).toBe(true);
            });
        });

        describe('when rendered before a transition', function () {
            beforeEach(function () {
                view.render();
            });

            it('should have content in el', function () {
                expect(view.el.innerHTML).not.toEqual('');
            });

            it('should render the active view', function () {
                expect(view.model.get('active_view').render).toHaveBeenCalled();
            });

            it('should have the "hide" class on [data-backbone-transitioner-incoming]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]')
                        .classList.contains('hide')
                ).toEqual(true);
            });
        });

        describe('when starting a transition', function () {
            var requestedView;

            beforeEach(function (done) {
                spyOn(appState, 'set').and.callThrough();
                spyOn(view, 'startTransitionAnimation').and.callThrough();

                requestedView = new Backbone.View();
                view.transition(requestedView);

                // must be created after view.transition calls render
                spyOn(view.model.get('active_view').$el, 'on').and.callThrough();

                // account for 20ms setTimeout in transition method
                setTimeout(function () {
                    done();
                }, 25);
            });

            it('should set the incoming view to the one requested', function () {
                expect(view.model.get('incoming_view')).toEqual(requestedView);
            });

            it('should call render', function () {
                expect(view.render).toHaveBeenCalled();
            });

            it('should render the active view', function () {
                expect(view.model.get('active_view').render).toHaveBeenCalled();
            });

            it('should render the incoming view', function () {
                expect(view.model.get('incoming_view').render).toHaveBeenCalled();
            });

            it('should remove the "hide" class from [data-backbone-transitioner-incoming]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]')
                        .classList.contains('hide')
                ).not.toEqual(true);
            });

            it('should change the page title to the contents of [data-page-title]', function () {
                expect(appState.set).toHaveBeenCalledWith('page_title', undefined);
            });

            it('should call startTransitionAnimation', function () {
                expect(view.startTransitionAnimation).toHaveBeenCalled();
            });

            // startTransitionAnimation

            it('should set a post-transition callback function', function () {
                expect(view.model.get('active_view').$el.on).toHaveBeenCalled();
            });

            it('should add the data-transitioning attribute to [data-backbone-transitioner-active]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-active]')
                        .getAttribute('data-transitioning')
                ).toBeDefined();
            });

            it('should add the data-transitioning attribute to [data-backbone-transitioner-incoming]', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-incoming]')
                        .getAttribute('data-transitioning')
                ).toBeDefined();
            });
        });

        describe('when a transition-end event is triggered on the active view', function () {
            var oldActiveView;
            var oldIncomingView;

            beforeEach(function (done) {
                spyOn(view, 'onTransitioned').and.callThrough();

                view.transition(new Backbone.View());

                oldActiveView = view.model.get('active_view');
                oldIncomingView = view.model.get('incoming_view');

                // account for 20ms setTimeout in transition method
                setTimeout(function () {
                    // Fake transitionend event
                    // Since no CSS is loaded the transition classes don't do anything
                    view.model.get('active_view').$el.trigger(view.getTransitionEndEventName());
                    done();
                }, 25);
            });

            it('should call onTransitioned', function () {
                expect(view.onTransitioned).toHaveBeenCalled();
            });

            it('should remove the old active view', function () {
                expect(
                    view.el.querySelector('[data-backbone-transitioner-active]').innerHTML
                ).not.toEqual(oldActiveView.el);
            });

            it('should set the active view to the old incoming view', function () {
                expect(view.model.get('active_view')).toEqual(oldIncomingView);
            });

            it('should set the incoming view to undefined', function () {
                expect(view.model.get('incoming_view')).not.toBeDefined();
            });
        });
    });

});
