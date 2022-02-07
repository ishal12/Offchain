import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface ISlaughter {
    addressRPH: string;
    beefId: string;
    _livestock?: ObjectId;
    age: number;
    status: 'produktif' | 'bunting' | 'lainnya' | 'diterima' | 'antemortem' | 'postmortem' | 'diproses' | 'packing';
    txAnte?: string;
    txPost?: string;
    txPack?: string;
}

export type ISlaughterDocument = ISlaughter & Document;