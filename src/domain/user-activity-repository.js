// user activity repository

window.UserActivityRepository = (function (infrastructure) {

    'use strict';

    var THE_KEY = 'user_activity';

    var exports = function () {
    };


    var pt = exports.prototype;


    pt.store = function (userActivity) {
        return infrastructure.storage.set(THE_KEY, userActivity.toObject());
    };


    pt.retrieve = function () {
        return infrastructure.storage.get(THE_KEY, null).then(function (obj) {
            if (obj != null) {
                return new window.UserActivity(obj.gotIpCount, obj.hasReviewed);
            } else {
                return new window.UserActivity(0, false);
            }
        });
    };


    return exports;

}(window.infrastructure));
