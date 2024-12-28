import { Response } from './response.model';

export interface Notification {
    id: number;
    notificationTitle: string;
    message: string;
    time: string;
    isRead: boolean;
    from?: string;
    thumbnail?: string;
}

export interface NotificationResponse extends Response{
    count: number;
    notifications: Notification[];
}