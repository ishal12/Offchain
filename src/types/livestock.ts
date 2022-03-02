import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface ILivestock {
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
}

export type ILivestockDocument = ILivestock & Document;