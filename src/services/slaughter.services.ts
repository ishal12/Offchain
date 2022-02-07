let Livestock = require("../models/livestock.model");
let Slaughter = require("../models/slaughter.model");

export const fetchSlaughters = (option: Record<string, any>): any => {
    return Slaughter.find(option);
}

export const fetchSlaughter = (option: Record<string, any>): any => {
    return Slaughter.findOne(option);
}

export const countSlaughter = (option: Record<string, any>): any => {
    return Slaughter.countDocuments(option);
}