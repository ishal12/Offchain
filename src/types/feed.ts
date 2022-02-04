import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface IFeed {
    _id: ObjectId;
    id: string;
    _livestock: ObjectId;
    feedType: 'hijauan' | 'konsentrat' | 'tambahan' | 'vitamin' | 'obat';
    amount: number;
    measurement?: 'ml' | 'g' | 'kg' | 'l';
    actor: string;
    createdAt: Timestamp;
    upadatedAt: Timestamp;
}

export type IFeedType = IFeed & Document;