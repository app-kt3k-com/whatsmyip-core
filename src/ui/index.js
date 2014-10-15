
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

    return exports;

}(window, window.$));
