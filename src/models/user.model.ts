import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
    {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            enum: [0, 1, 2, 3],
            required: true,
        },
        status: {
            type: Number,
            enum: [0, 1, 2],
            required: true,
        },
        totalLivestock: {
            type: Number,
        },
        txHash: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);

module.exports = User;
