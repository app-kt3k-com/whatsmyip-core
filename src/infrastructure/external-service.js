
window.infrastructure = window.infrastructure || {};

window.infrastructure.externalService = (function (straw) {
    'use strict';

    var exports = {};

    exports.openMarketLink = function (id) {

        straw.uri.open('market://details?id=' + id).fail(function () {

            straw.browser.open('https://play.google.com/store/apps/id=' + id);

        });

    };

    return exports;

}(window.straw));
