import type { NotificationItem } from "../../../src/types/notifications";

export const notifications: NotificationItem[] = [
  {
    identifier: "NTF-001",
    title: "New order received",
    body: "Order ORD-778812 was paid and is ready for fulfilment.",
    createdAt: "2026-10-01T09:15:00.000Z",
    readAt: null,
  },
  {
    identifier: "NTF-002",
    title: "Complaint escalated",
    body: "Complaint CMP-2041 was moved to in progress by Chioma.",
    createdAt: "2026-09-30T17:42:00.000Z",
    readAt: "2026-09-30T18:00:00.000Z",
  },
  {
    identifier: "NTF-003",
    title: "Payout settled",
    body: "Your weekly payout of ₦248,000 has been settled.",
    createdAt: "2026-09-28T08:00:00.000Z",
    readAt: null,
  },
];
