

window.page = window.page || {};

window.page.index = (function (window, $, t10, infrastructure) {
    'use strict';

    var IP_LOADING_ID = '#ip-loading';
    var IP_INPUT_ID = '#ip-input';
    var ASK_REVIEW_MODAL_ID = '#ask-review';

    var IP_RELOAD_BUTTON_CLASS = '.ip-reload-button';
    var IP_INDICATOR_CLASS = '.ip-indicator';

    var MAIN_CONTROLS = '.main-control';

    var COUNTRY_ICON_CLASS = '.country-icon';
    var COUNTRY_ICON_DEFAULT = 'flag country-icon';

    var LINK_TO_HISTORY = '.link-to-records';

    var exports = {};
    var index = exports;

    index.version = 'v0.0.8';

    exports.doReview = function () {

        var repository = new window.UserActivityRepository();

        repository.retrieve().then(function (userActivity) {

            userActivity.hasReviewed = true;

            repository.store(userActivity);

            window.common.openMarketLink();

        });

    };

    var askReview = function () {

        setTimeout(function () {

            $(ASK_REVIEW_MODAL_ID).modal('show');

        }, 800);

    };

    var handleUserActivity = function () {

        var repository = new window.UserActivityRepository();

        repository.retrieve().then(function (userActivity) {

            userActivity.incrementGotIpCount();

            repository.store(userActivity);

            if (window.ReviewRemindingSpecification.shouldRemindReview(userActivity)) {

                askReview();

            }

        });
    };

    var gotNewIpRecord = function (ipRecord) {

        // toast welcome message
        infrastructure.platformUI.toast(t10.t('ip.done'));

        handleUserActivity();

        // new repository
        var repository = new window.IpRecordRepository();

        // record latest
        repository.getLatest().then(function (lastRecord) {

            repository.setLatest(ipRecord);

            if (ipRecord.ipAddr === lastRecord.ipAddr && ipRecord.isSameDay(new Date(lastRecord.createdAt))) {
                // if the got record is same as the latest and recorded date is same
                // then skip history recoding
                return;
            }

            // add to list
            repository.add(ipRecord);
        });

        fillIpAddr(ipRecord.ipAddr);
        fillCountryCode(ipRecord.countryCode);

        // loading icon turn to thumbs up
        $(IP_LOADING_ID).addClass('fa-thumbs-o-up');

        // add info color
        $(IP_INDICATOR_CLASS).addClass('alert-info');
    };

    var gotCachedIpRecord = function (ipRecord) {

        fillIpAddr(ipRecord.ipAddr);
        fillCountryCode(ipRecord.countryCode);

        // loading icon turn into check mark
        $(IP_LOADING_ID).addClass('fa-check');
    };

    var failedToGetNewIpRecord = function () {
        // toast welcome message
        infrastructure.platformUI.toast(t10.t('ip.failed_to_get_new_ip_record'));

        // fill ui
        fillIpAddr(t10.t('ip.failed'), false);

        // loading icon turn to frown
        $(IP_LOADING_ID).addClass('fa-frown-o');

        // add danger color
        $(IP_INDICATOR_CLASS).addClass('alert-danger');
    };

    var fillCountryCode = function (countryCode) {

        if (countryCode == null) {
            return;
        }

        $(COUNTRY_ICON_CLASS).addClass('flag-' + countryCode.toLowerCase());
    };

    var fillIpAddr = function (ipAddr) {

        // set ip label
        $(IP_INPUT_ID).val(ipAddr);

        // stop spin and thumbs up
        $(IP_LOADING_ID).removeClass('fa-refresh').removeClass('fa-spin');


        // enable main controls
        $(MAIN_CONTROLS).css('visibility', 'visible');

        window.common.scan();
    };

    index.startLoading = function () {

        var t10 = window.t10;

        // toast welcome message
        infrastructure.platformUI.toast(t10.t('ip.start_loading'));

        // remove ip label
        $(IP_INPUT_ID).val('');

        // spin refresh icon
        $(IP_LOADING_ID).addClass('fa-refresh').addClass('fa-spin').removeClass('fa-check').removeClass('fa-frown-o').removeClass('fa-thumbs-o-up');

        // remove info color
        $(IP_INDICATOR_CLASS).removeClass('alert-info').removeClass('alert-danger');

        // disable main controls
        $(MAIN_CONTROLS).css('visibility', 'hidden');

        // reset country icon
        $(COUNTRY_ICON_CLASS).attr('class', COUNTRY_ICON_DEFAULT);

        // fetch ip and display
        exports.GeoipLoader().done(gotNewIpRecord).fail(failedToGetNewIpRecord);

        window.common.scan();
    };

    exports.GeoipLoader = function (timeout, retryLimit) {

        var d = $.Deferred();
        var startTime = new Date().getTime();
        var retryCount = 0;

        // default to 15 seconds
        timeout = timeout == null ? 15000 : timeout;

        // default to 10
        retryLimit = retryLimit == null ? 10 : retryLimit;

        var tryToLoad = function () {

            if (startTime + timeout <= new Date().getTime()) {
                d.reject();

                return;
            }

            if (retryCount >= retryLimit) {
                d.reject();

                return;
            }


            window.IpRecordFactory.createFromGeoipReflector(5000).then(function (ipRecord) {
                d.resolve(ipRecord);
            }, tryToLoad);
        };

        tryToLoad();

        return d;

    };

    index.main = function () {

        return window.common.initI18n().then(function () {

            window.common.scan();

            index.initEvents();

            var repository = new window.IpRecordRepository();

            repository.getLatest().then(function (ipRecord) {

                if (ipRecord != null && ipRecord.isFresh()) {

                    gotCachedIpRecord(ipRecord);

                } else {

                    index.startLoading();

                }

            });

        });

    };

    index.initEvents = function () {
        $(IP_RELOAD_BUTTON_CLASS).click(index.startLoading);

        $(LINK_TO_HISTORY).click(function () {
            window.location.href = 'records.html';
        });
    };

    return exports;

}(window, window.$, window.t10, window.infrastructure));
