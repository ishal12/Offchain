import { IUser, IUserDocument } from "../types";

let User = require('../models/user.model');

export const fetchUsers = (option?: Record<string, any>): any => {
    if (option) {
        return User.find(option)
    };
    return User.find();
}

export const fetchUser = (option: Record<string, any>): any => {
    return User.findOne(option);
}

// export const createUser = (payload: Record<string, IUser>): any => {
//     const data = new User(payload);
//     console.log(data);
//     return data.save();
// }

export const countDoc = (option?: Record<string, any>): any => {
    if (option) {
        return User.countDocuments(option)
    };
    return User.countDocuments();
}