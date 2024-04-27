export interface Note {
    id: string;
    trackingId: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface TrackingWithNotes {
    id: string;
    tenderId: string;
    tenderStatus: string;
    trackingStatus: string;
    notes: Array<Note>;
    createdDate: Date;
    updatedDate: Date;
}

export interface Notes {
    totalNotes: number;
    outputNotes: Array<Note>;
}