
/* global describe, it, expect, sinon, straw, $ */

describe('IpRecordFactory', function () {
    'use strict';

    var IpRecord = window.IpRecord;
    var IpRecordFactory = window.IpRecordFactory;

    it('is a object', function () {
        expect(IpRecordFactory).not.toEqual(null);
        expect(typeof IpRecordFactory).toBe('object');
    });

    describe('createFromDynDNSResponseText', function () {

        it('creates a IpRecord from dyndns api response text', function () {
            var ipRec = IpRecordFactory.createFromDynDNSResponseText('<html><body>Ip Address is: 8.8.8.8</body></html>');

            expect(ipRec).not.toEqual(null);
            expect(ipRec instanceof IpRecord).toBe(true);

            expect(ipRec.ipAddr).toBe('8.8.8.8');
            expect(typeof ipRec.createdAt).toBe('number');
            expect(ipRec.countryCode).toEqual(null);

        });

        it('returns null when api response text broken', function () {
            var ipRec = IpRecordFactory.createFromDynDNSResponseText('broken!');

            expect(ipRec).toEqual(null);

        });

    });


    describe('createUsingDynDNS', function () {

        it('create IpRecord using DynDNS api', function () {

            var stubGet = sinon.stub(straw.http, 'get');
            stubGet.withArgs('http://checkip.dyndns.com/').returns($.Deferred().resolve({content: '<html><body>Ip Address is: 11.12.13.14</body></html>'}));

            IpRecordFactory.createUsingDynDNS().done(function (ipRecord) {

                expect(ipRecord instanceof IpRecord).toBe(true);
                expect(ipRecord.ipAddr).toBe('11.12.13.14');

            });

            stubGet.restore();

        });

    });


    describe('createFromJsonString', function () {

        it('creates ip record from JSON string', function () {

            var ipRecord = IpRecordFactory.createFromJsonString('{"ipAddr":"8.8.8.8","countryCode":"JPN","createdAt":123456}');
            expect(ipRecord instanceof IpRecord).toBe(true);

            expect(ipRecord.ipAddr).toBe('8.8.8.8');
            expect(ipRecord.createdAt).toBe(123456);
            expect(ipRecord.countryCode).toBe('JPN');

        });

        it('returns null if Json string broken', function () {

            var ipRecord = IpRecordFactory.createFromJsonString('{broken!}');

            expect(ipRecord).toBe(null);
        });

    });


    describe('createFromObject', function () {

        it('create ip record from object', function () {

            var ipRecord = IpRecordFactory.createFromObject({'ipAddr': '8.8.8.8', 'countryCode': 'JPN', 'createdAt': 123456});
            expect(ipRecord instanceof IpRecord).toBe(true);

            expect(ipRecord.ipAddr).toBe('8.8.8.8');
            expect(ipRecord.createdAt).toBe(123456);
            expect(ipRecord.countryCode).toBe('JPN');

        });

    });

});
