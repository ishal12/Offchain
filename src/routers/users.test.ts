// import * as UserService from '../services/user.services';
// const request = require('supertest');
// let User = require('../models/user.model');
// const app = require("../server");
// const mockFetchUsers = jest.fn();
// const mockCountDoc = jest.fn();

// // jest.doMock("../services/user.services", () => {
// //     return () => ({
// //         fetchUsers: fetchUsersSpy,
// //         countDoc: countDocSpy,
// //     });
// // });

// jest.mock('../services/user.services', () => ({
//     fetchUsers: () => mockFetchUsers,
//     countDoc: () => mockCountDoc,
// }))

// describe("should test server configuration", () => {
//     test("it should send a welcome email", (done) => {
//         // const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
//         request(app)
//             .get('/users/process')
//             .expect('Content-Type', /json/)
//             .end(function (err: Error, res: any) {
//                 if (err) throw err;
//                 expect(JSON.stringify(res)).toBe('');
//             });
//         expect(mockCountDoc).toHaveBeenCalled();
//     });
// });

describe("should test server configuration", () => {
    test("it should send a welcome email", () => {

    });
});