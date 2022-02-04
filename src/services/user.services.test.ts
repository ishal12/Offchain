// const mockingoose = require('mockingoose');
import { fetchUsers, countDoc, fetchUser } from './user.services';
let User = require('../models/user.model');

describe('user.services', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct users and count when running fetchUsers with options', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        fetchUsers({ status: { $in: ['2'] } });
        expect(a).toHaveBeenCalled();
    });

    it('should return correct users and count when running fetchUsers without options', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        fetchUsers();
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchUsers failed', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => { return new Error('x') });
        fetchUsers();
        expect(a).toThrowError();
    });

    it('should return correct users and count', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(User, 'countDocuments').mockImplementationOnce(() => '');
        fetchUsers();
        countDoc();
        expect(a).toHaveBeenCalledTimes(2);
        expect(b).toHaveBeenCalled();
    });

    it('should return correct user fetchUser with options', async () => {
        const a = jest.spyOn(User, 'findOne').mockImplementationOnce(() => '');
        fetchUser({ address: '0x00123' });
        expect(a).toHaveBeenCalled();
    });

    it('should throw error when fetchUser failed', async () => {
        const a = jest.spyOn(User, 'findOne').mockImplementationOnce(() => { return new Error('x') });
        fetchUser({ address: '0x00123' });
        expect(a).toThrowError();
    });
    /// TEST

    // it('should return user created createUser with payload', async () => {
    //     const payload = {
    //         address: '0x0',
    //         name: 'test',
    //         role: 0,
    //         status: 1,
    //         // totalLivestock: 0,
    //         // txHash: '0x0123'
    //     };
    //     mockingoose(User).toReturn('berhasil', 'save');
    //     createUser(payload).then((result: any) => {
    //         expect(result).toBe('berhasil');
    //     });
    //     expect(a).toHaveBeenCalled();
    // });

    // it('should throw error when createUser failed', async () => {
    //     const payload = {
    //         address: '0x0',
    //         name: 'test',
    //         role: 0,
    //         status: 1,
    //         totalLivestock: 0,
    //         txHash: '0x0123'
    //     };
    //     mockingoose(User).toReturn(payload, 'save')

    //     expect(a).toThrowError();
    // })

    /** TESTING */
    // router.route("/").get(async (req, res) => {
    //     var users: any = [];
    //     var count = 0;

    //     User.find()
    //       .then((result) => {
    //         if (result) users = result;
    //       })
    //       .catch((err) => res.status(400).json(err));

    //     User.countDocuments()
    //       .then((result) => (count = result))
    //       .catch((err) => res.status(400).json(err));

    //     res.json({ users, count });
    //   });

    //   // UNIT TEST
    //   const server = express();
    //   describe("GET /hello", () => {
    //     it("should return 200 & valid response if request param list is empity", async (done) => {
    //       mockingoose(User).toReturn([{Object}], "find");
    //       mockingoose(User).toReturn(10, "countDocuments");

    //       request(server)
    //         .get(/process/)
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .end((err, res) => {
    //           if (err) return done(err);
    //           expect(res.payload).toMatchObject({ users: [{Object}], count: 10 });
    //           done();
    //         });
    //     });
    //   });
});
