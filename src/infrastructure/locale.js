
window.infrastructure = window.infrastructure || {};

window.infrastructure.locale = (function (straw, Promise) {
    'use strict';

    var exports = {};

    exports.getLanguage = function () {

        return Promise.resolve(straw.locale.getLanguage());
    };

    return exports;

}(window.straw, window.Promise));
