export interface NotificationItem {
  identifier: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
}

export function isNotificationUnread(n: NotificationItem): boolean {
  return n.readAt === null;
}
