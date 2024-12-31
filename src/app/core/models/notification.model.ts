import { Response } from './response.model';

export interface Notification {
    id: string;
    notificationTitle: string;
    message: string;
    time: string;
    isRead: boolean;
    from?: string;
    thumbnail?: string;
    link?: string;
}

export interface NotificationResponse extends Response{
    count: number;
    notifications: Notification[];
}