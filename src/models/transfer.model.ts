import { Schema, model } from 'mongoose';
import { ITransferType } from '../types';

const transferSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        _livestock: {
            type: Schema.Types.ObjectId,
            ref: 'Livestock'
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        stateFrom: {
            type: String,
            Enum: ['farmer', 'stocker', 'buthcher', 'beef'],
        },
        stateTo: {
            type: String,
            Enum: ['farmer', 'stocker', 'buthcher', 'beef'],
        },
        txHash: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Transfer = model<ITransferType>('Transfer', transferSchema);

module.exports = Transfer;
