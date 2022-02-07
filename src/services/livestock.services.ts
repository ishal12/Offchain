let Livestock = require('../models/livestock.model');
let Feed = require('../models/feed.model');
let Transfer = require('../models/transfer.model');
let User = require('../models/user.model');

export const fetchLivestocks = (option?: Record<string, any>): any => {
    if (option) {
        return Livestock.find(option);
    };
    return Livestock.find();
}

export const fetchLivestock = (option: Record<string, any>): any => {
    return Livestock.findOne(option);
}

export const fetchFeeds = (option: Record<string, any>): any => {
    return Feed.find(option);
}

export const fetchFeed = (option: Record<string, any>): any => {
    return Feed.findOne(option);
}

export const fetchUser = (option: Record<string, any>): any => {
    return User.findOne(option);
}

export const fetchTransfers = (option: Record<string, any>): any => {
    return Transfer.find(option);
}

export const countLivestock = (option?: Record<string, any>): any => {
    if (option) {
        return Livestock.countDocuments(option)
    };
    return Livestock.countDocuments();
}

export const countFeed = (option: Record<string, any>): any => {
    return Feed.countDocuments(option);
}

export const countTransfer = (option: Record<string, any>): any => {
    return Transfer.countDocuments(option);
}