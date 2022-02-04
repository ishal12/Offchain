import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface ISlaughter {
    _id: ObjectId;
    addressRPH: string;
    beefId: string;
    _livestock?: ObjectId;
    age: number;
    status: 'produktif' | 'bunting' | 'lainnya' | 'diterima' | 'antemortem' | 'postmortem' | 'diproses' | 'packing';
    txAnte?: string;
    txPost?: string;
    txPack?: string;
    createdAt: Timestamp;
    upadatedAt: Timestamp;
}

export type ISlaughterType = ISlaughter & Document;