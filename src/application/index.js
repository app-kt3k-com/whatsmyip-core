

window.page = window.page || {};

window.page.index = (function (window, $, t10, infrastructure, ui) {
    'use strict';

    var exports = {};
    var index = exports;

    index.version = 'v0.1.2';

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

            ui.index.askReviewModal.show();

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

        ui.index.ipControl.gotNewRecord(ipRecord);

        // enable main controls
        ui.index.mainControls.show();

    };

    var gotCachedIpRecord = function (ipRecord) {

        ui.index.ipControl.gotCachedRecord(ipRecord);

        // enable main controls
        ui.index.mainControls.show();

    };

    var failedToGetNewIpRecord = function () {
        // toast welcome message
        infrastructure.platformUI.toast(t10.t('ip.failed_to_get_new_ip_record'));

        // fill ui
        ui.index.ipControl.failed(t10.t('ip.failed'));

        // enable main controls
        ui.index.mainControls.show();

    };

    index.startLoading = function () {

        // toast welcome message
        infrastructure.platformUI.toast(t10.t('ip.start_loading'));

        // ip control start loading
        ui.index.ipControl.loading();

        // disable main controls
        ui.index.mainControls.hide();

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

            return repository.getLatest().then(function (ipRecord) {

                if (ipRecord != null && ipRecord.isFresh()) {

                    gotCachedIpRecord(ipRecord);

                } else {

                    index.startLoading();

                }

            });

        });

    };

    index.initEvents = function () {
        ui.index.ipControl.onReload(index.startLoading);

        ui.index.mainControls.onReload(index.startLoading);

        ui.index.mainControls.onClickHistoryButton(function () {
            window.location.href = 'records.html';
        });
    };

    return exports;

}(window, window.$, window.t10, window.infrastructure, window.ui));
