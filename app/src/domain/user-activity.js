// user activity model
// this represent user's usage of the application
// it is used for meta behaviour of the application like review reminding

window.UserActivity = (function () {

    'use strict';

    /**
     * user activity constructor
     * @param number gotIpCount
     * @param boolean hasReviewed
     */
    var exports = function (gotIpCount, hasReviewed) {
        this.gotIpCount = gotIpCount;
        this.hasReviewed = hasReviewed;
    };

    var pt = exports.prototype;


    /**
     * increment got ip count
     */
    pt.incrementGotIpCount = function () {
        this.gotIpCount ++;
    };


    /**
     * returns object representation of the instance
     * @return object object representation of the instance
     */
    pt.toObject = function () {
        return {
            gotIpCount: this.gotIpCount,
            hasReviewed: this.hasReviewed
        };
    };


    /**
     * returns JSON representation of the instance
     * @return string JSON representation of the instance
     */
    pt.toJson = function () {
        return JSON.stringify(this.toObject());
    };


    return exports;

}());
