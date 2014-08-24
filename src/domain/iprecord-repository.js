// Ip record repository class

window.IpRecordRepository = (function ($, straw) {
    'use strict';

    var MAX_NUM_IP_RECORD = 256;

    var IP_RECORD_KEY = 'ip-records';
    var IP_LATEST_KEY = 'ip-latest';

    var exports = function () {
    };

    var prototype = exports.prototype;


    /**
     * get all ip address record list
     * @return promise to resolve with IpRecord[] list of ip address records
     */
    prototype.getAll = function () {
        return straw.sharedPreferences.get(IP_RECORD_KEY, []).pipe(function (records) {
            return records.map(function (obj) {
                return window.IpRecordFactory.createFromObject(obj);
            });
        });
    };


    /**
     * add new ip record
     * @param IpRecord ipRecord ip address record to store in repository
     * @return promise to resolve with success flag boolean
     */
    prototype.add = function (ipRecord) {

        var self = this;

        return this.getAll().pipe(function (records) {

            records.unshift(ipRecord.toObject());

            records = records.slice(0, MAX_NUM_IP_RECORD);

            return self.save(records);

        }).promise();
    };


    /**
     * store object as ip address record list
     * @param Object records ip address record list to store
     * @return promise to resolve with success flag boolean
     */
    prototype.save = function (records) {
        return straw.sharedPreferences.set(IP_RECORD_KEY, records);

    };


    prototype.getLatest = function () {
        return straw.sharedPreferences.get(IP_LATEST_KEY, []).pipe(function (obj) {
            return new window.IpRecordFactory.createFromObject(obj);
        });
    };


    prototype.setLatest = function (ipRecord) {
        return straw.sharedPreferences.set(IP_LATEST_KEY, ipRecord.toObject());
    };


    return exports;

}(window.$, window.straw));
