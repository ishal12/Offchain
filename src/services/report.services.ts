let Livestock = require('../models/livestock.model');
let Slaughters = require('../models/slaughter.model');
let Transfer = require('../models/transfer.model');

export const fetchSlaughters = (option: Record<string, any>): any => {
    return Slaughters.find(option);
};

export const fetchTransfers = (): any => {
    return Transfer.find();
};

export const countLivestock = (option?: Record<string, any>): any => {
    if (option) {
        return Livestock.countDocuments(option)
    };
    return Livestock.countDocuments();
};

export const countTransfer = (option?: Record<string, any>): any => {
    if (option) {
        return Transfer.countDocuments(option)
    };
    return Transfer.countDocuments();
};

export const countSlaughter = (option: Record<string, any>): any => {
    return Slaughters.countDocuments(option);
};

