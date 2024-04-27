export interface TrackingData {
    id: string;
    tenderId: string;
    UserId?: string;
    tenderStatusId: 6 | 7 | 8 | 18 | 19;
    tenderStatus: string;
    trackingStatus: string;
    base64File?: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface Tracking {
    totalTrackings: number;
    outputTrackings: Array<TrackingData>
}