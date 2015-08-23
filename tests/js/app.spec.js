define([
    'app',

    'backbone',
    'router',
    'views/transitioner',
], function (App, Backbone, Router, TransitionerView) {
    'use strict';

    describe('app', function () {
        var app;

        beforeEach(function () {
            spyOn(Router.prototype, 'initialize');
            app = new App();
        });

        describe('when constructing', function () {
            it ('should have a property called router that is an instance of Backbone.Router', function () {
                expect(app.router).toBeDefined();
                expect(app.router instanceof Backbone.Router).toEqual(true);
            });
        });

        describe('when calling goTo.about', function () {
            beforeEach(function () {
                spyOn(app, 'staticPage');
                app.goTo.about();
            });

            it('should call app.staticPage with "about"', function () {
                expect(app.staticPage).toHaveBeenCalledWith('about');
            });
        });

        describe('when calling goTo.contact', function () {
            var oldContactView;

            beforeEach(function () {
                spyOn(app, 'transition');
                oldContactView = app.views.contact;
                app.goTo.contact();
            });

            it('should call app.transition', function () {
                expect(app.transition).toHaveBeenCalled();
            });

            it('should instantiate the contact view', function () {
                expect(oldContactView).toEqual(undefined);
                expect(app.views.contact instanceof Backbone.View).toEqual(true);
            });

            it('should not change the contact view when called again', function () {
                oldContactView = app.views.contact;
                app.goTo.contact();
                expect(oldContactView).toEqual(app.views.contact);
            });
        });

        describe('when calling goTo.home', function () {
            beforeEach(function () {
                spyOn(app, 'staticPage');
                app.goTo.home();
            });

            it('should call app.staticPage with "home"', function () {
                expect(app.staticPage).toHaveBeenCalledWith('home');
            });
        });

        describe('when calling goTo.notFound', function () {
            beforeEach(function () {
                spyOn(app, 'staticPage');
                app.goTo.notFound();
            });

            it('should call app.staticPage with "notFound"', function () {
                expect(app.staticPage).toHaveBeenCalledWith('notFound');
            });
        });

        describe('when calling goTo.resume', function () {
            beforeEach(function () {
                spyOn(app, 'staticPage');
                app.goTo.resume();
            });

            it('should call app.staticPage with "resume"', function () {
                expect(app.staticPage).toHaveBeenCalledWith('resume');
            });
        });

        describe('when calling staticPage', function () {
            beforeEach(function () {
                // set history fragment for router.staticPage method
                spyOn(app, 'transition');
                app.staticPage('about');
            });

            it('should call router.transitioner with a StaticView', function () {
                expect(app.transition).toHaveBeenCalled();
                expect(app.transition.calls.mostRecent().args[0] instanceof Backbone.View).toEqual(true);
            });
        });

        describe('when calling transition', function () {
            var oldTransitionView;
            var newTransitionView;

            beforeEach(function () {
                spyOn(TransitionerView.prototype, 'initialize');
                spyOn(TransitionerView.prototype, 'transition');
                oldTransitionView = app.views.transitioner;
                newTransitionView = new Backbone.View();
                app.transition(newTransitionView);
            });

            it('should instantiate the transition view', function () {
                expect(oldTransitionView).toEqual(undefined);
                expect(app.views.transitioner instanceof Backbone.View).toEqual(true);
            });

            it('should not change the transition view when called again', function () {
                oldTransitionView = app.views.transitioner;
                app.transition(new Backbone.View());
                expect(oldTransitionView).toEqual(app.views.transitioner);
            });

            it('should call app.views.transitioner.transition with the specified view when called again', function () {
                app.transition(newTransitionView)
                expect(app.views.transitioner.transition).toHaveBeenCalledWith(newTransitionView);
            });
        });
    });

});
