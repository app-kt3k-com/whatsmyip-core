
window.ui = window.ui || {};

window.ui.index = (function (window, $) {
    'use strict';

    var exports = {};

    exports.linkToHistory = {
        bind: function (handler) {
            $('.link-to-records').click(handler);
        }
    };

    exports.askReviewModal = {
        show: function () {
            $('#ask-review').modal('show');
        }
    };

    var IP_RELOAD_BUTTON = '.ip-reload-button'

    exports.ipControl = {
        onReload: function (handler) {
            $('#ip-control ' + IP_RELOAD_BUTTON).click(handler);
        },

        succeed: function (ipRecord) {
        },

        fail: function () {
        },

        loading: function () {
        }
    };

    var MAIN_CONTROLS = '.main-control';

    var LINK_TO_RECORDS = '.link-to-records';

    exports.mainControls = {
        onReload: function (handler) {
            $(MAIN_CONTROLS + IP_RELOAD_BUTTON).click(handler);
        },

        onClickHistoryButton: function (handler) {
            $(MAIN_CONTROLS + LINK_TO_RECORDS).click(handler);
        },

        show: function () {
            $(MAIN_CONTROLS).css('visibility', 'visible');
        },

        hide: function () {
            $(MAIN_CONTROLS).css('visibility', 'hidden');
        },
    };

    return exports;

}(window, window.$));
