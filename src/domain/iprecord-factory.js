// Ip record factory class

window.IpRecordFactory = (function (infrastructure) {
    'use strict';

    var exports = {};

    /**
     * (Async) create IpRecord object from a http request to checkip.dyndns.com/
     * @return promise which will be done with IpRecord object or failed with error messages
     */
    exports.createUsingDynDNS = function () {
        return infrastructure.http.get('http://checkip.dyndns.com/').then(function (obj) {
            return exports.createFromDynDNSResponseText(obj.responseText);
        });
    };

    /**
     * create IpRecord object from response text from http://checkip.dyndns.com/
     * @param {string} text response text from http://checkip.dyndns.com/
     * @return {IpRecord} IpRecord object representing current ip address
     */
    exports.createFromDynDNSResponseText = function (text) {
        var ipAddr = parseDynDNS(text);

        if (ipAddr == null) {
            // if ip address not found in api response text
            return null;
        }

        return new window.IpRecord({
            ipAddr: ipAddr,
            createdAt: new Date().getTime()
        });

    };


    /**
     *
     */
    exports.createFromGeoipReflector = function (timeout) {
        return infrastructure.http.get('http://geoip-reflector.herokuapp.com/', timeout).then(function (obj) {
            return exports.createFromGeoipReflectorResponseText(obj.responseText);
        });
    };


    /**
     * create from geoip-reflector's response text
     * @param json json string of geoip-reflector
     */
    exports.createFromGeoipReflectorResponseText = function (json) {
        var data = JSON.parse(json);

        return new window.IpRecord({
            ipAddr: data.ipAddr,
            countryCode: data.countryCode,
            createdAt: new Date().getTime()
        });
    };


    /**
     * create IpRecord object from serialized JSON expression
     * @param {string} str JSON expression of IpRecord
     * @return {IpRecord} IpRecord represented by given JSON expression
     */
    exports.createFromJsonString = function (str) {
        var args;

        try {
            args = JSON.parse(str);
        } catch (e) {
            return null;
        }

        return new window.IpRecord(args);
    };


    /**
     * create IpRecord from object
     * @param {object} obj object representation of IpRecord
     * @return {IpRecord} IpRecord object
     */
    exports.createFromObject = function (obj) {
        return new window.IpRecord(obj);
    };


    var reIpAddr = /(\d+\.\d+\.\d+\.\d+)/;

    /**
     * @param {string} text check-ip api's response text
     * @return {string} string represents ip address; null if ip address not found
     */
    var extractIpAddrFromText = function (text) {
        var match = reIpAddr.exec(text);

        if (match) {
            return match[1];
        } else {
            return null;
        }
    };

    var parseDynDNS = function (text) {
        return extractIpAddrFromText(text);
    };

    return exports;

}(window.infrastructure));
