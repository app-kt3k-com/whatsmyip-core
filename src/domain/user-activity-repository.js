// user activity repository

window.UserActivityRepository = (function () {

    'use strict';

    var straw = window.straw;

    var THE_KEY = 'user_activity';

    var exports = function () {
    };


    var pt = exports.prototype;


    pt.store = function (userActivity) {
        return straw.sharedPreferences.set(THE_KEY, userActivity.toObject());
    };


    pt.retrieve = function () {
        return straw.sharedPreferences.get(THE_KEY, null).pipe(function (obj) {
            if (obj != null) {
                return new window.UserActivity(obj.gotIpCount, obj.hasReviewed);
            } else {
                return new window.UserActivity(0, false);
            }
        });
    };


    return exports;

}());
