// Ip record model class

window.IpRecord = (function () {
    'use strict';

    var exports = function (args) {
        this.ipAddr = args.ipAddr;
        this.createdAt = args.createdAt;
        this.countryCode = args.countryCode;
    };

    var pt = exports.prototype;

    pt.setCountryCode = function (code) {
        this.countryCode = code;
    };


    pt.serialize = function () {
        return JSON.stringify(this.toObject());
    };


    pt.toObject = function () {
        return {
            ipAddr: this.ipAddr,
            createdAt: this.createdAt,
            countryCode: this.countryCode
        };
    };

    var FIFTEEN_MINUTES = 15 * 60 * 1000;

    pt.isFresh = function () {
        return this.createdAt != null && new Date().getTime() - this.createdAt < FIFTEEN_MINUTES;
    };


    /**
     * return true iff the record's timestamp is the same day as the given date (in locale timezone)
     * @param Date d date to compare
     * @return true if the record's timestamp is the same day as the given date (in locale timezone) and false otherwise
     */
    pt.isSameDay = function (d) {
        return getDateLabel(d) === getDateLabel(new Date(this.createdAt));

    };


    var getDateLabel = function (d) {
        return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    };


    return exports;

}());
