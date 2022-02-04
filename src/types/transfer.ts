import { ObjectId, Timestamp } from 'bson';
import { Document } from 'mongoose';

export interface ITransfer {
    _id: ObjectId;
    id: string;
    _livestock?: ObjectId;
    from: string;
    to: string;
    stateFrom?: 'farmer' | 'stocker' | 'butcher' | 'beef';
    stateTo?: 'farmer' | 'stocker' | 'butcher' | 'beef';
    txHash: string;
    createdAt: Timestamp;
    upadatedAt: Timestamp;
}

export type ITransferType = ITransfer & Document;