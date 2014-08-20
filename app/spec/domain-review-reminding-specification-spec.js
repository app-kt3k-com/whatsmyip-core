
/* global describe, it, expect */

describe('ReviewRemindingSpecification', function () {
    'use strict';

    describe('shouldRemindReview', function () {

        it('returns false if the user has already reviewed the app', function () {
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(0, true))).toBe(false);
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(1, true))).toBe(false);
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(2, true))).toBe(false);
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(3, true))).toBe(false);
        });

        it('returns false if the user has not yet reviewed the app and got-ip count doesn\'t equal to 0 mod 4', function () {
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(1, false))).toBe(false);
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(2, false))).toBe(false);
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(3, false))).toBe(false);

        });

        it('returns true if the user has not yet reviewed the app and got-ip count equal to 0 mod 4', function () {
            expect(window.ReviewRemindingSpecification.shouldRemindReview(new window.UserActivity(4, false))).toBe(true);
        });

    });

});
