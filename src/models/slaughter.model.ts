import { Schema, model } from 'mongoose';
import { ISlaughterDocument } from '../types';

const slaughterSchema = new Schema(
    {
        addressRPH: {
            type: String,
            required: true,
        },
        beefId: {
            type: String,
            required: true,
        },
        _livestock: {
            type: Schema.Types.ObjectId,
            ref: "Livestock",
        },
        age: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['produktif', 'bunting', 'lainnya', 'diterima', 'antemortem', 'postmortem', 'diproses', 'packing'],
            required: true,
        },
        txAnte: {
            type: String,
        },
        txPost: {
            type: String,
        },
        txPack: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Slaughter = model<ISlaughterDocument>('Slaughter', slaughterSchema);

module.exports = Slaughter;
