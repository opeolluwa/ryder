import type {
  ComplaintReply,
  ComplaintRow,
  ThreadParty,
} from "../../../src/types/complaints";

/** The complaint every demo opens on: in progress, with a customer and order. */
export const row: ComplaintRow = {
  complaint: {
    identifier: "CMP-2041",
    customerIdentifier: "CUS-001",
    orderIdentifier: "ORD-778812",
    subject: "Order still marked in progress",
    description:
      "Payment went through two days ago but the order was never shipped. Please look into it.",
    status: "in_progress",
    createdAt: "2026-09-28T09:12:00.000Z",
    updatedAt: null,
  },
  customer: {
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada.o@example.com",
    picture: null,
  },
  order: { identifier: "ORD-778812" },
};

/** Three complaints, one per inbox tab: open, in progress and resolved. */
export const rows: ComplaintRow[] = [
  row,
  {
    complaint: {
      identifier: "CMP-2042",
      customerIdentifier: "CUS-002",
      orderIdentifier: null,
      subject: "Wrong size delivered",
      description:
        "I ordered a medium and received an extra-large. Can I exchange it?",
      status: "open",
      createdAt: "2026-09-30T18:40:00.000Z",
      updatedAt: null,
    },
    customer: {
      firstName: "Tunde",
      lastName: "Bello",
      email: "tunde.b@example.com",
      picture: null,
    },
    order: null,
  },
  {
    complaint: {
      identifier: "CMP-2038",
      customerIdentifier: "CUS-003",
      orderIdentifier: "ORD-778104",
      subject: "Refund not received",
      description:
        "The refund from last week still hasn't hit my account.",
      status: "resolved",
      createdAt: "2026-09-21T11:05:00.000Z",
      updatedAt: "2026-09-24T08:00:00.000Z",
    },
    customer: {
      firstName: "Mariam",
      lastName: "Sule",
      email: "mariam.s@example.com",
      picture: null,
    },
    order: { identifier: "ORD-778104" },
  },
];

/** Two messages on `row.complaint` — one from support, one from the customer. */
export const replies: ComplaintReply[] = [
  {
    identifier: "RPL-1",
    complaintIdentifier: row.complaint.identifier,
    body: "Thanks for flagging this. We've escalated the order to the fulfilment team.",
    senderEmail: "support@ryder.example",
    createdAt: "2026-09-28T15:40:00.000Z",
    updatedAt: null,
  },
  {
    identifier: "RPL-2",
    complaintIdentifier: row.complaint.identifier,
    body: "Any update on the dispatch? I'd really appreciate an ETA.",
    senderEmail: "ada.o@example.com",
    createdAt: "2026-09-29T08:05:00.000Z",
    updatedAt: null,
  },
];

/** The replier — support staff working the inbox. */
export const self: ThreadParty = {
  name: "Chioma (Support)",
  email: "support@ryder.example",
  avatarText: "CS",
};

/** The other side of the conversation: the customer who raised the complaint. */
export const counterpart: ThreadParty = {
  name: "Ada Okafor",
  email: "ada.o@example.com",
  avatarText: "AO",
};

/** Order options shaped for ComplaintForm's `orders` prop. */
export const orders: Array<{
  identifier: string;
  status?: string;
  itemsCount?: number;
}> = [
  { identifier: "ORD-778812", status: "in_progress", itemsCount: 3 },
  { identifier: "ORD-778104", status: "delivered", itemsCount: 1 },
  { identifier: "ORD-779350", status: "cancelled", itemsCount: 2 },
];

/** Reply badge counts keyed by complaint identifier. */
export const replyCounts: Record<string, number> = {
  "CMP-2041": replies.length,
  "CMP-2042": 1,
  "CMP-2038": 4,
};
