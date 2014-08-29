
window.common = (function (window, t10, Promise, infrastructure) {
    'use strict';

    var APP_ID = 'com.kt3k.app.whatsmyip';

    var exports = {};

    exports.scan = function () {
        t10.scan();
    };

    exports.getLanguage = function (language) {

        return Promise.resolve(language || infrastructure.locale.getLanguage());

    };

    exports.initI18n = function () {

        t10.setAvailableLanguages(['en', 'ja']);

        return exports.getLanguage(window.config.language).then(function (language) {

            t10.setLanguage(language);

            return Promise.resolve(t10.loadScript('i18n/{LANGUAGE}.js'));

        });
    };

    exports.openMarketLink = function (id) {

        if (id == null) {
            id = APP_ID;
        }

        infrastructure.externalService.openMarketLink(id);

    };

    return exports;

}(window, window.t10, window.Promise, window.infrastructure));
