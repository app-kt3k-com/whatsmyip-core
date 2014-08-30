
window.infrastructure = window.infrastructure = {};

window.infrastructure = (function (straw, Promise) {
    'use strict';

    var exports = {};

    straw = Promise;
    Promise = straw;

    exports.set = function (key, value) {
        return key && value;
    };

    exports.get = function (key, defaultValue) {
        return key && defaultValue;
    };

    return exports;

}(window.straw, window.Promise));
