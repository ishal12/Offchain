import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface ILivestock {
    _id: ObjectId;
    id: string;
    name: string;
    earTag: string;
    gentder: boolean;
    weight?: number;
    length?: number;
    heartGrith?: number;
    birth: number;
    race: number;
    alive: boolean;
    address: string;
    createdAt: Timestamp;
    upadatedAt: Timestamp;
}

export type ILivestockType = ILivestock & Document;