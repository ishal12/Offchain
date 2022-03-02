import { countLivestock, countTransfer, fetchTransfers, countSlaughter, fetchSlaughters } from "./report.services";

let Livestock = require('../models/livestock.model');
let Slaughters = require('../models/slaughter.model');
let Transfer = require('../models/transfer.model');

describe('fetchSlaughters', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return slaughters when running fetchSlaughters', async () => {
        const a = jest.spyOn(Slaughters, 'find').mockImplementationOnce(() => '');
        fetchSlaughters({ status: { $in: ['diterima', 'postmortem', 'packing'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchSlaughters failed', async () => {
        const a = jest.spyOn(Slaughters, 'find').mockImplementationOnce(() => { return new Error('x') });
        fetchSlaughters({ status: { $in: ['diterima', 'postmortem', 'packing'] } });
        expect(a).toThrow();
    });
});

describe('fetchTransfers', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return slaughters when running fetchTransfers', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => '');
        fetchTransfers();
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchSlaughters failed', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => { return new Error('x') });
        fetchTransfers();
        expect(a).toThrow();
    });
});

describe('countLivestock', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return count when running countLivestock with option', async () => {
        const a = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => '');
        countLivestock({ status: { $in: ['diterima', 'postmortem', 'packing'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should return count when running countLivestock without option', async () => {
        const a = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => '');
        countLivestock();
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when countLivestock failed', async () => {
        const a = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        countLivestock();
        expect(a).toThrow();
    });
});

describe('countTransfer', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return count when running countTransfer with option', async () => {
        const a = jest.spyOn(Transfer, 'countDocuments').mockImplementationOnce(() => '');
        countTransfer({ createdAt: { $gte: 'startOfToday' } });
        expect(a).toHaveBeenCalled();
    });

    it('should return count when running countTransfer without option', async () => {
        const a = jest.spyOn(Transfer, 'countDocuments').mockImplementationOnce(() => '');
        countTransfer();
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when countTransfer failed', async () => {
        const a = jest.spyOn(Transfer, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        countTransfer();
        expect(a).toThrow();
    });
});

describe('countSlaughter', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return slaughters when running fetchSlaughters', async () => {
        const a = jest.spyOn(Slaughters, 'countDocuments').mockImplementationOnce(() => '');
        countSlaughter({ status: { $in: ['diterima', 'postmortem', 'packing'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchSlaughters failed', async () => {
        const a = jest.spyOn(Slaughters, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        countSlaughter({ status: { $in: ['diterima', 'postmortem', 'packing'] } });
        expect(a).toThrow();
    });
});