import * as UserServices from '../services/user.services';
import { getUser, getUserProcess } from './user.controller';
let User = require('../models/user.model');

const mockFetchUsers = jest.fn().mockResolvedValueOnce([
    { name: "Action Name" },
    { name: "Action Name" },
    { name: "Action Name" }, { name: "Action Name" }, { name: "Action Name" }
]);
const mockCountDoc = jest.fn();

jest.mock('../services/user.services', () => ({
    fetchUsers: () => mockFetchUsers,
    countDoc: () => mockCountDoc,
}));

describe('getUserProcess', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should ret', async () => {
        const a = jest.spyOn(User, 'skip').mockImplementationOnce(() => '');
        await getUserProcess(0, 2);
        expect(mockFetchUsers).toHaveBeenCalled()
        expect(mockCountDoc).toHaveBeenCalled()
    })
})