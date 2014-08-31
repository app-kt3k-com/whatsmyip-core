
/* global describe, it, expect, waits, sinon, Promise, infrastructure */

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

        it('creates IpRecord using DynDNS api', function () {

            var stubGet = sinon.stub(infrastructure.http, 'get');
            stubGet.withArgs('http://checkip.dyndns.com/').returns(Promise.resolve({responseText: '<html><body>Ip Address is: 11.12.13.14</body></html>'}));

            IpRecordFactory.createUsingDynDNS().then(function (ipRecord) {

                expect(ipRecord instanceof IpRecord).toBe(true);
                expect(ipRecord.ipAddr).toBe('11.12.13.14');

                stubGet.restore();

            });

            waits(100);

        });

    });


    describe('createFromGeoipReflector', function () {

        it('creates IpRecord from GeoipReflector', function () {

            var stubGet = sinon.stub(infrastructure.http, 'get');
            stubGet.withArgs('http://geoip-reflector.herokuapp.com/').returns(Promise.resolve({responseText: '{"ipAddr":"94.119.150.49","countryCode":"GB"}'}));

            IpRecordFactory.createFromGeoipReflector().then(function (ipRecord) {

                expect(ipRecord instanceof IpRecord).toBe(true);
                expect(ipRecord.ipAddr).toBe('94.119.150.49');

                stubGet.restore();

            });

            waits(100);

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

        it('creates ip record from object', function () {

            var ipRecord = IpRecordFactory.createFromObject({'ipAddr': '8.8.8.8', 'countryCode': 'JPN', 'createdAt': 123456});
            expect(ipRecord instanceof IpRecord).toBe(true);

            expect(ipRecord.ipAddr).toBe('8.8.8.8');
            expect(ipRecord.createdAt).toBe(123456);
            expect(ipRecord.countryCode).toBe('JPN');

        });

    });

});
