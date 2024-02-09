import { User } from "./User";

export interface Notification {
    id: string;
    title: string | null;
    content: string | null;
    url: string | null;
    user: User;
    is_read: boolean;
    receivedAt: Date;
};