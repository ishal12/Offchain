import { fetchUsers, countDoc, fetchUser } from './user.services';
let User = require('../models/user.model');

describe('fetchUsers', () => {
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

describe('fetchUser', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
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
});

// describe('createUser', () => {
//     afterEach(() => {
//         jest.resetModules();
//         jest.restoreAllMocks();

//         // it('should create user when running createUser ', () => {
//         //     // const payload: Record<string, any> = {
//         //     //     address: "0x1234",
//         //     //     name: 'test',
//         //     //     role: 0,
//         //     //     status: 1,
//         //     //     totalLivestock: 0,
//         //     //     txHash: "0x241S31"
//         //     // };
//         //     // mockingoose(User).toReturn('berhasil', 'save');
//         //     // const res = createUser(payload);
//         //     // expect(res).toBe('berhasil');
//         //     const a = jest.spyOn(User.prototype, 'save').mockImplementation(() => '');
//         //     const payload: any = {
//         //         address: "0x1234",
//         //         name: 'test',
//         //         role: 0,
//         //         status: 1,
//         //         totalLivestock: 0,
//         //         txHash: "0x241S31"
//         //     };
//         //     createUser(payload);
//         //     expect(a).toHaveBeenCalled();
//         // });
//     });
// });

describe('countDoc', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should return correct users and count with option', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(User, 'countDocuments').mockImplementationOnce(() => '');
        fetchUsers();
        countDoc();
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should return correct users and count without option', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(User, 'countDocuments').mockImplementationOnce(() => '');
        fetchUsers();
        countDoc({ status: { $in: ['0', '1'] } });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });

    it('should throw error when countDoc failed', async () => {
        const a = jest.spyOn(User, 'find').mockImplementationOnce(() => '');
        const b = jest.spyOn(User, 'countDocuments').mockImplementationOnce(() => { return new Error('x') });
        fetchUsers();
        countDoc({ status: { $in: ['0', '1'] } });
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
    });
});
