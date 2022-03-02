import { countSlaughter, fetchSlaughter, fetchSlaughters } from "./slaughter.services";

let Slaughter = require("../models/slaughter.model");

describe('fetchSlaughters', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return slaughter when running fetchSlaughters', async () => {
        const a = jest.spyOn(Slaughter, 'find').mockImplementationOnce(() => '');
        fetchSlaughters({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when running fetchSlaughters', async () => {
        const a = jest.spyOn(Slaughter, 'find').mockImplementationOnce(() => { return new Error() });
        fetchSlaughters({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toThrow();
    });
});

describe('fetchSlaughter', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return slaughter when running fetchSlaughter', async () => {
        const a = jest.spyOn(Slaughter, 'findOne').mockImplementationOnce(() => '');
        fetchSlaughter({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error whenfetchSlaughter failed', async () => {
        const a = jest.spyOn(Slaughter, 'findOne').mockImplementationOnce(() => { return new Error() });
        fetchSlaughter({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toThrow();
    });
});

describe('countSlaughter', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return count slaughter when running countSlaughter', async () => {
        const a = jest.spyOn(Slaughter, 'countDocuments').mockImplementationOnce(() => '');
        countSlaughter({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error countSlaughter failed', async () => {
        const a = jest.spyOn(Slaughter, 'countDocuments').mockImplementationOnce(() => { return new Error() });
        countSlaughter({ addressRPH: 'req.params.address', status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } });
        expect(a).toThrow();
    });
});