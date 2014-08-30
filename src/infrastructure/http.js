
window.infrastructure = window.infrastructure || {};

window.infrastructure.http = (function (straw, Promise) {
    'use strict';

    var exports = {};

    exports.get = function (url) {
        return Promise.resolve(straw.http.get(url)).then(function (result) {
            return {
                responseText: result.content
            };
        });
    };

    return exports;

}(window.straw, window.Promise));
