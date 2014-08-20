
/* global describe, it, expect, sinon, straw, $ */

describe('IpRecordRepository', function () {
    'use strict';

    //var IpRecord = window.IpRecord;
    var IpRecordRepository = window.IpRecordRepository;

    it('is a function', function () {
        expect(IpRecordRepository).not.toEqual(null);
        expect(typeof IpRecordRepository).toBe('function');
    });


    describe('getAll', function () {

        it('calls get method of straw.sharedPreferences plugin with appropriate arguments and returns its value', function () {

            var stub = sinon.stub(straw.sharedPreferences, 'get');

            stub.withArgs('ip-records', []).returns($.Deferred(function (d) {
                d.resolve([{ipAddr: '8.8.8.8', countryCode: 'JPN', createdAt: 1300000000}]);
            }));

            var repo = new IpRecordRepository();
            repo.getAll().done(function (ipRecords) {
                expect(ipRecords.length).toBe(1);

                var ipRecord = ipRecords[0];
                expect(ipRecord.ipAddr).toBe('8.8.8.8');
                expect(ipRecord.countryCode).toBe('JPN');
                expect(ipRecord.createdAt).toBe(1300000000);
            });

            stub.restore();
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
            stubGetAll.returns($.Deferred().resolve(array0));

            array1.pop(); // first element is dropped
            array1.unshift('bcd'); // new item pushed

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(array1).returns($.Deferred().resolve(true));

            repo.add({toObject: function () {
                return 'bcd';
            }}).done(function (result) {
                expect(result).toBe(true);
            }).fail(function () {
                expect(true).toBe(false);
            });

            stubGetAll.restore();
            stubSave.restore();

        });

        it('adds item to repository', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns($.Deferred().resolve(['abc', 'def']));

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(['ghi', 'abc', 'def']).returns($.Deferred().resolve(true));

            repo.add({toObject: function () {
                return 'ghi';
            }}).done(function (result) {
                expect(result).toBe(true);
            }).fail(function () {
                expect(true).toBe(false);
            });

            stubGetAll.restore();
            stubSave.restore();

        });

        it('fails when this.getAll fails', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns($.Deferred().reject('ok!'));

            repo.add({toObject: function () {}}).done(function () {
                expect(true).toBe(false);
            }).fail(function (result) {
                expect(result).toBe('ok!');
            });

            stubGetAll.restore();

        });

        it('fails when this.save fails', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns($.Deferred().resolve([]));

            var stubSave = sinon.stub(repo, 'save');
            stubSave.returns($.Deferred().reject('ok!'));

            repo.add({toObject: function () {}}).done(function () {
                expect(true).toBe(false);
            }).fail(function (result) {
                expect(result).toBe('ok!');
            });

            stubGetAll.restore();
            stubSave.restore();

        });
    });


    describe('save', function () {

        it('calls save method of straw.sharedPreferences plugin', function () {

            var stubSet = sinon.stub(straw.sharedPreferences, 'set');
            stubSet.withArgs('ip-records', ['abc']).returns('ok');

            var repo = new IpRecordRepository();

            var result = repo.save(['abc']);

            expect(result).toBe('ok');

            stubSet.restore();
        });
    });


});
