// const mockingoose = require('mockingoose');
import { fetchLivestock, countLivestock, fetchFeeds, countTransfer, countFeed, fetchUser, fetchLivestocks, fetchFeed, fetchTransfers } from './livestock.services';
let Livestock = require('../models/livestock.model');
let Feed = require('../models/feed.model');
let Transfer = require('../models/transfer.model');
let User = require('../models/user.model');

describe('fetchLivestocks', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct livestocks when running fetchLivestocks with options ', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => '');
        fetchLivestocks({ address: 'req.params.address' });
        expect(a).toHaveBeenCalled();
    });

    it('should return correct livestocks when running fetchLivestocks without options ', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => '');
        fetchLivestocks();
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchLivestocks failed ', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => { return new Error('x') });
        fetchLivestocks();
        expect(a).toThrow();
    });
});

describe('fetchLivestock', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct livestock when running fetchlivestock', async () => {
        const a = jest.spyOn(Livestock, 'findOne').mockImplementationOnce(() => '');
        fetchLivestock({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchLivestock error', async () => {
        const a = jest.spyOn(Livestock, 'findOne').mockImplementationOnce(() => { return new Error('error') });
        fetchLivestock({ id: 'req.params.id' });
        expect(a).toThrowError();
    });
});

describe('fetchFeeds', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct feeds when running fetchFeeds', async () => {
        const a = jest.spyOn(Feed, 'find').mockImplementationOnce(() => '');
        fetchFeeds({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchFeeds error', async () => {
        const a = jest.spyOn(Feed, 'find').mockImplementationOnce(() => { return new Error('error') });
        fetchFeeds({ id: 'req.params.id' });
        expect(a).toThrowError();
    });
});

describe('fetchFeed', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct feed when running fetchFeed', async () => {
        const a = jest.spyOn(Feed, 'findOne').mockImplementationOnce(() => '');
        fetchFeed({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchFeed error', async () => {
        const a = jest.spyOn(Feed, 'findOne').mockImplementationOnce(() => { return new Error('error') });
        fetchFeed({ id: 'req.params.id' });
        expect(a).toThrowError();
    });
});

describe('fetchUser', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct user when running fetchUser', async () => {
        const a = jest.spyOn(User, 'findOne').mockImplementationOnce(() => '');
        fetchUser({ address: 'req.body.addressFrom' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchUser error', async () => {
        const a = jest.spyOn(User, 'findOne').mockImplementationOnce(() => { return new Error('error') });
        fetchUser({ address: 'req.body.addressFrom' });
        expect(a).toThrowError();
    });
});

describe('fetchTransfers', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct transfer when running fetchTransfer', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => '');
        fetchTransfers({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchTransfer error', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => { return new Error('error') });
        fetchTransfers({ id: 'req.params.id' });
        expect(a).toThrowError();
    });
});

describe('countLivestock', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct livestock and count with option', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => '');
        fetchLivestocks({ status: { $in: ['0', '1'] } });
        countLivestock({ status: { $in: ['0', '1'] } });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should return correct livestock and count without option', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => '');
        fetchLivestocks();
        countLivestock();
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should throw error when countLivestock failed', async () => {
        const a = jest.spyOn(Livestock, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Livestock, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        fetchLivestocks();
        countLivestock();
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });
});

describe('countFeed', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct feeds and count with option', async () => {
        const a = jest.spyOn(Feed, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Feed, 'countDocuments').mockImplementationOnce(() => '');
        fetchFeeds({ id: 'req.params.id' });
        countFeed({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should throw error when countFeed failed', async () => {
        const a = jest.spyOn(Feed, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Feed, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        fetchFeeds({ id: 'req.params.id' });
        countFeed({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });
});

describe('countTransfer', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct transfers and count with option', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Transfer, 'countDocuments').mockImplementationOnce(() => '');
        fetchTransfers({ id: 'req.params.id' });
        countTransfer({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should throw error when countTransfer failed', async () => {
        const a = jest.spyOn(Transfer, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(Transfer, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        fetchTransfers({ id: 'req.params.id' });
        countTransfer({ id: 'req.params.id' });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });
});
