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
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
}


export interface LuggageStorageDTO {
    lsno?: number;
    storageSpot: Spot;
    email: string;
    storageDate?: string;
    storedUntil?: string;
    status?: LuggageStorageStatus;
}

// SpotDTO 타입 정의
export interface SpotDTO {
    spno: number;        // Spot ID
    spotname: string;    // Spot Name
    address: string;     // Address
    url: string;         // Google Map URL
    latitude: number;    // Latitude
    longitude: number;   // Longitude
    sno: number;         // Store Owner ID
    sname: string;       // Store Owner Name
}
