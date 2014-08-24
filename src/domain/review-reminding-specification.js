
window.ReviewRemindingSpecification = (function () {
    'use strict';

    var exports = {};

    var REVIEW_REMINDING_PERIOD = 4;

    exports.shouldRemindReview = function (userActivity) {

        if (userActivity.hasReviewed) {
            return false;
        }

        if (userActivity.gotIpCount % REVIEW_REMINDING_PERIOD === 0) {
            return true;
        }

        return false;

    };

    return exports;

}());
