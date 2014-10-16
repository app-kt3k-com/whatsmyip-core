
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


    var IP_RELOAD_BUTTON_CLASS = '.ip-reload-button';

    var IP_LOADING_ID = '#ip-loading';
    var IP_INPUT_ID = '#ip-input';

    var IP_INDICATOR_CLASS = '.ip-indicator';

    var COUNTRY_ICON_CLASS = '.country-icon';
    var COUNTRY_ICON_DEFAULT = 'flag country-icon';


    exports.ipControl = {
        onReload: function (handler) {
            $('#ip-control ' + IP_RELOAD_BUTTON_CLASS).click(handler);
        },

        gotNewRecord: function (ipRecord) {

            this.fillControl(ipRecord);

            // loading icon turn to thumbs up
            $(IP_LOADING_ID).addClass('fa-thumbs-o-up');

            // add info color
            $(IP_INDICATOR_CLASS).addClass('alert-info');

        },

        gotCachedRecord: function (ipRecord) {
            this.fillControl(ipRecord);

            // loading icon turn into check mark
            $(IP_LOADING_ID).addClass('fa-check');

        },

        fillControl: function (ipRecord) {
            this.fillIpAddr(ipRecord.ipAddr);
            this.fillCountryFlag(ipRecord.countryCode);
        },

        fillIpAddr: function (ipAddr) {
            // set ip label
            $(IP_INPUT_ID).val(ipAddr);

            // stop spin
            $(IP_LOADING_ID).removeClass('fa-refresh').removeClass('fa-spin');
        },

        fillCountryFlag: function (countryCode) {

            if (countryCode == null) {
                return;
            }

            $(COUNTRY_ICON_CLASS).addClass('flag-' + countryCode.toLowerCase());

        },

        failed: function (message) {

            this.fillIpAddr(message);

            // loading icon turn to frown
            $(IP_LOADING_ID).addClass('fa-frown-o');

            // add danger color
            $(IP_INDICATOR_CLASS).addClass('alert-danger');

        },

        loading: function () {

            // remove ip label
            $(IP_INPUT_ID).val('');

            // spin refresh icon
            $(IP_LOADING_ID).addClass('fa-refresh').addClass('fa-spin').removeClass('fa-check').removeClass('fa-frown-o').removeClass('fa-thumbs-o-up');

            // remove info color
            $(IP_INDICATOR_CLASS).removeClass('alert-info').removeClass('alert-danger');

            // reset country icon
            $(COUNTRY_ICON_CLASS).attr('class', COUNTRY_ICON_DEFAULT);

        }
    };

    var MAIN_CONTROLS = '.main-control';

    var LINK_TO_RECORDS = '.link-to-records';

    exports.mainControls = {
        onReload: function (handler) {
            $(MAIN_CONTROLS + IP_RELOAD_BUTTON_CLASS).click(handler);
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
