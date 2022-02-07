import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

type role = 0 | 1 | 2 | 3;
type status = 0 | 1 | 2;

export interface IUser {
    address: string;
    name: string;
    role: number;
    status: number;
    totalLivestock?: number;
    txHash?: string;
}

export type IUserDocument = IUser & Document;
