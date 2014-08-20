
/* global describe, it, expect, sinon, straw, $ */

describe('UserActivityRepository', function () {
    'use strict';

    describe('store', function () {

        it('store UserActivity to sharedPreferences', function () {

            var repository = new window.UserActivityRepository();

            var mock = sinon.mock(straw.sharedPreferences);

            mock.expects('set').once().withExactArgs('user_activity', {gotIpCount: 7, hasReviewed: false});

            repository.store(new window.UserActivity(7, false));

            mock.verify();

            mock.restore();
        });

    });

    describe('retrieve', function () {

        it('retrieves UserActivity from sharedPreferences', function () {

            var repository = new window.UserActivityRepository();

            var stub = sinon.stub(straw.sharedPreferences, 'get');
            stub.withArgs('user_activity', null).returns($.Deferred().resolve({gotIpCount: 7, hasReviewed: true}));

            repository.retrieve().done(function (userActivity) {

                expect(userActivity instanceof window.UserActivity).toBe(true);
                expect(userActivity.gotIpCount).toBe(7);
                expect(userActivity.hasReviewed).toBe(true);

            });

            stub.restore();

        });

        it('retrieves UserActivity(0, false) if date is not stored', function () {

            var repository = new window.UserActivityRepository();

            var stub = sinon.stub(straw.sharedPreferences, 'get');
            stub.returns($.Deferred().resolve(null));

            repository.retrieve().done(function (userActivity) {

                expect(userActivity instanceof window.UserActivity).toBe(true);
                expect(userActivity.gotIpCount).toBe(0);
                expect(userActivity.hasReviewed).toBe(false);

            });

            stub.restore();

        });

    });
});
