
window.infrastructure = window.infrastructure || {};

window.infrastructure.storage = (function (straw, Promise) {
    'use strict';

    var exports = {};

    exports.set = function (key, value) {
        return Promise.resolve(straw.sharedPreferences.set(key, value));
    };

    exports.get = function (key, defaultValue) {
        return Promise.resolve(straw.sharedPreferences.get(key, defaultValue));
    };

    return exports;

}(window.straw, window.Promise));
