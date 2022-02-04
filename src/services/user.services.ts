import { IUser, IUserDocument } from "../types";

let User = require('../models/user.model');

export const fetchUsers = (option?: Record<string, any>): any => {
    if (option) {
        console.log(typeof User.find(option));
        return User.find(option)
    };
    console.log(typeof User.find());
    return User.find();
}

export const fetchUser = (option: Record<string, any>): any => {
    return User.findOne(option);
}

export const countDoc = (option?: Record<string, any>): any => {
    if (option) {
        console.log(typeof User.countDocuments(option));
        return User.countDocuments(option)
    };
    console.log(typeof User.countDocuments());
    return User.countDocuments();
}