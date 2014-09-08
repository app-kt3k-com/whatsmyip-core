
/* global describe, it, expect, sinon, infrastructure, Promise, waits */

describe('UserActivityRepository', function () {
    'use strict';

    describe('store', function () {

        it('store UserActivity to infrastructure.storage', function () {

            var repository = new window.UserActivityRepository();

            var mock = sinon.mock(infrastructure.storage);

            mock.expects('set').once().withExactArgs('user_activity', {gotIpCount: 7, hasReviewed: false});

            repository.store(new window.UserActivity(7, false));

            mock.verify();

            mock.restore();
        });

    });

    describe('retrieve', function () {

        it('retrieves UserActivity from infrastructure.storage', function () {

            var repository = new window.UserActivityRepository();

            var stub = sinon.stub(infrastructure.storage, 'get');
            stub.withArgs('user_activity', null).returns(Promise.resolve({gotIpCount: 7, hasReviewed: true}));

            repository.retrieve().then(function (userActivity) {

                expect(userActivity instanceof window.UserActivity).toBe(true);
                expect(userActivity.gotIpCount).toBe(7);
                expect(userActivity.hasReviewed).toBe(true);

                stub.restore();

            });

            waits(100);

        });

        it('retrieves UserActivity(0, false) if date is not stored', function () {

            var repository = new window.UserActivityRepository();

            var stub = sinon.stub(infrastructure.storage, 'get');
            stub.returns(Promise.resolve(null));

            repository.retrieve().then(function (userActivity) {

                expect(userActivity instanceof window.UserActivity).toBe(true);
                expect(userActivity.gotIpCount).toBe(0);
                expect(userActivity.hasReviewed).toBe(false);

                stub.restore();

            });

            waits(100);

        });

    });
});
