
/* global describe, it, expect */

describe('IpRecord', function () {
    'use strict';

    var IpRecord = window.IpRecord;

    it('can be created', function () {
        expect(new IpRecord({
            ipAddr: '8.8.8.8',
            createdAt: 1300000000,
            countryCode: 'JPN'
        })).not.toBe(null);
    });

    it('has fields ipAddr, ctime and countryCode', function () {
        var ipRec = new IpRecord({
            ipAddr: '8.8.8.8',
            createdAt: 1300000000,
            countryCode: 'JPN'
        });

        expect(ipRec.ipAddr).toBe('8.8.8.8');
        expect(ipRec.createdAt).toBe(1300000000);
        expect(ipRec.countryCode).toBe('JPN');
    });

    it('is serializable as JSON format of object with 3 keys ipAddr, ctime and countryCode', function () {
        var ipRec = new IpRecord({
            ipAddr: '8.8.8.8',
            createdAt: 1300000000,
            countryCode: 'JPN'
        });

        var json = ipRec.serialize();

        expect(typeof json).toBe('string');

        var object = JSON.parse(json);

        expect(object).toEqual({
            ipAddr: '8.8.8.8',
            createdAt: 1300000000,
            countryCode: 'JPN'
        });
    });

    describe('setCountryCode method', function () {

        it('sets countryCode', function () {
            var ipRec = new IpRecord({
                ipAddr: '8.8.8.8',
                createdAt: 1300000000,
                countryCode: 'JPN'
            });

            ipRec.setCountryCode('AAA');

            expect(ipRec.countryCode).toBe('AAA');

        });

    });


    describe('isSameDay', function () {

        it('returns true if the given date is same day', function () {

            var ipRec = new IpRecord({
                ipAddr: '8.8.8.8',
                createdAt: 1300000000000,
                countryCode: 'JPN'
            });

            expect(ipRec.isSameDay(new Date(1300000000000))).toBe(true);
        });

        it('returns false if the given date is not the same day', function () {

            var ipRec = new IpRecord({
                ipAddr: '8.8.8.8',
                createdAt: 13000000000000,
                countryCode: 'JPN'
            });

            expect(ipRec.isSameDay(new Date(1300000000000 + 24 * 3600 * 1000))).toBe(false);
            expect(ipRec.isSameDay(new Date(1300000000000 - 24 * 3600 * 1000))).toBe(false);
        });

    });

});
