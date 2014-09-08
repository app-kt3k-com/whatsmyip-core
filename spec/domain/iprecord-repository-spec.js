
/* global describe, it, expect, sinon, infrastructure, Promise, waits */

describe('IpRecordRepository', function () {
    'use strict';

    //var IpRecord = window.IpRecord;
    var IpRecordRepository = window.IpRecordRepository;

    it('is a function', function () {
        expect(IpRecordRepository).not.toEqual(null);
        expect(typeof IpRecordRepository).toBe('function');
    });


    describe('getAll', function () {

        it('calls get method of infrastructure.storage with appropriate arguments and returns its value', function () {

            var stub = sinon.stub(infrastructure.storage, 'get');

            stub.withArgs('ip-records', []).returns(Promise.resolve([{ipAddr: '8.8.8.8', countryCode: 'JPN', createdAt: 1300000000}]));

            var repo = new IpRecordRepository();
            repo.getAll().then(function (ipRecords) {
                expect(ipRecords.length).toBe(1);

                var ipRecord = ipRecords[0];
                expect(ipRecord.ipAddr).toBe('8.8.8.8');
                expect(ipRecord.countryCode).toBe('JPN');
                expect(ipRecord.createdAt).toBe(1300000000);

                stub.restore();
            });

            waits(100);
        });
    });


    describe('add', function () {

        it('adds item to repository and drop last one if max num exceeded', function () {

            var repo = new IpRecordRepository();

            var array0 = [];
            var array1 = [];

            // create MAX(=256) length arrays
            for (var i = 0; i < 256; i++) {
                array0.push('abc');
                array1.push('abc');
            }

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns(Promise.resolve(array0));

            array1.pop(); // drop the last element
            array1.unshift('bcd'); // new item pushed

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(array1).returns(Promise.resolve(true));

            repo.add({toObject: function () {
                return 'bcd';

            }}).then(function (result) {
                expect(result).toBe(true);

                stubGetAll.restore();
                stubSave.restore();
            }, function () {
                expect(true).toBe(false);

                stubGetAll.restore();
                stubSave.restore();
            });

            waits(100);

        });

        it('adds item to repository', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns(Promise.resolve(['abc', 'def']));

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(['ghi', 'abc', 'def']).returns(Promise.resolve(true));

            repo.add({toObject: function () {
                return 'ghi';

            }}).then(function (result) {
                expect(result).toBe(true);

                stubGetAll.restore();
                stubSave.restore();
            }, function () {
                expect(true).toBe(false);

                stubGetAll.restore();
                stubSave.restore();
            });

            waits(100);

        });

        it('fails when this.getAll fails', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns(Promise.reject('ok!'));

            repo.add({toObject: function () {}}).then(function () {
                expect(true).toBe(false);

                stubGetAll.restore();
            }, function (result) {
                expect(result).toBe('ok!');

                stubGetAll.restore();
            });

            waits(100);

        });

        it('fails when this.save fails', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns(Promise.resolve([]));

            var stubSave = sinon.stub(repo, 'save');
            stubSave.returns(Promise.reject('ok!'));

            repo.add({toObject: function () {}}).then(function () {
                expect(true).toBe(false);

                stubGetAll.restore();
                stubSave.restore();
            }, function (result) {
                expect(result).toBe('ok!');

                stubGetAll.restore();
                stubSave.restore();
            });

            waits(100);

        });
    });


    describe('save', function () {

        it('calls save method of infrastructure.storage', function () {

            var stubSet = sinon.stub(infrastructure.storage, 'set');
            stubSet.withArgs('ip-records', ['abc']).returns('ok');

            var repo = new IpRecordRepository();

            var result = repo.save(['abc']);

            expect(result).toBe('ok');

            stubSet.restore();

        });
    });


});
