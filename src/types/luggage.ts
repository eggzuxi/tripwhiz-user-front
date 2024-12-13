// Type Definitions
export interface Spot {
    spno: number;
    spotname: string;
    address: string;
}

export interface LuggageStorage {
    storageSpot: Spot;
    email: string;
    storageDate?: string;
    storedUntil?: string;
    status?: LuggageStorageStatus;
}

export enum LuggageStorageStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    STORED = 'STORED',
}

export interface LuggageStorageDTO {
    lsno?: number;
    storageSpot: Spot;
    email: string;
    storageDate?: string;
    storedUntil?: string;
    status?: LuggageStorageStatus;
}