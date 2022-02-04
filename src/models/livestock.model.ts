import { Schema, model } from 'mongoose';
import { ILivestockType } from '../types';

const livestockSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        earTag: {
            type: String,
            required: true,
        },
        gender: {
            type: Boolean,
            required: true,
        },
        weight: {
            type: Number,
        },
        length: {
            type: Number,
        },
        heartGrith: {
            type: Number,
        },
        birth: {
            type: Number,
            required: true,
        },
        race: {
            type: Number,
            required: true,
        },
        alive: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Livestock = model<ILivestockType>('Livestock', livestockSchema);

module.exports = Livestock;
