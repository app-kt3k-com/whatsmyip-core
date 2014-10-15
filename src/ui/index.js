
window.ui = window.ui || {};

window.ui.index = (function (window, $) {
    'use strict';

    var exports = {};

    var LINK_TO_HISTORY = '.link-to-records';

    exports.linkToHistory = {
        bind: function (handler) {
            $(LINK_TO_HISTORY).click(handler);
        }
    };

    var ASK_REVIEW_MODAL_ID = '#ask-review';

    exports.askReviewModal = {
        show: function () {
            $(ASK_REVIEW_MODAL_ID).modal('show')
        }
    };

    return exports;

}(window, window.$));
