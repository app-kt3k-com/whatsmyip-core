
window.page = window.page || {};

window.page.records = (function (window, $) {
    'use strict';

    var exports = {};

    exports.initEvents = function () {
        $('.some-class').click(function () {});
    };


    var zeroPad = function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };


    exports.dateFormat = function (date) {
        return date.getFullYear() + '/' + zeroPad(date.getMonth() + 1, 2) + '/' + zeroPad(date.getDate(), 2) +
        ' ' + zeroPad(date.getHours(), 2) + ':' + zeroPad(date.getMinutes(), 2) + ':' + zeroPad(date.getSeconds(), 2);
    };


    exports.init = function () {

        // init repository
        var repository = new window.IpRecordRepository();

        repository.getAll().then(function (ipRecords) {
            //$('.debug').text(JSON.stringify(ipRecords));

            var table = $('<table class="table" />');

            table.append($('<tr><th><i class="fa fa-info-circle"></i> IP Address</th><th><i class="fa fa-calendar-o"></i> Date</th><th><i class="fa fa-globe"></i></th></tr>'));

            for (var i = 0; i < ipRecords.length; i++) {
                var record = ipRecords[i];

                var date = new Date(record.createdAt);

                var format = exports.dateFormat(date);

                var countryFlagClass = record.countryCode != null ? record.countryCode.toLowerCase() : 'null';

                table.append($('<tr><td>' + record.ipAddr + '</td><td>' + format + '</td><td><img class="flag flag-' + countryFlagClass + '" /></td></tr>'));
            }

            $('.debug').append(table);
        });

    };


    exports.main = function () {

        return window.common.initI18n().then(function () {

            window.common.scan();

            exports.initEvents();

            exports.init();

        });

    };

    return exports;

}(window, window.$));
