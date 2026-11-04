import type {
  ConversationReply,
  ConversationRow,
  ThreadParty,
} from "../../../src/types/messaging";

/** The conversation every demo opens on: in progress, with a customer and order. */
export const row: ConversationRow = {
  conversation: {
    identifier: "CNV-4102",
    customerIdentifier: "CUS-001",
    orderIdentifier: "ORD-778812",
    subject: "Where is my order?",
    description:
      "My order was marked paid four days ago but it still hasn't shipped.",
    status: "in_progress",
    createdAt: "2026-09-28T09:12:00.000Z",
    updatedAt: "2026-09-28T15:40:00.000Z",
  },
  participant: {
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada.o@example.com",
    picture: null,
  },
  order: { identifier: "ORD-778812" },
};

/** Three conversations, one per inbox tab: open, in progress and resolved. */
export const rows: ConversationRow[] = [
  row,
  {
    conversation: {
      identifier: "CNV-4103",
      customerIdentifier: "CUS-002",
      orderIdentifier: null,
      subject: "Wrong size delivered",
      description:
        "I ordered a medium and received an extra-large. Can I exchange it?",
      status: "open",
      createdAt: "2026-09-30T18:40:00.000Z",
      updatedAt: null,
    },
    participant: {
      firstName: "Tunde",
      lastName: "Bello",
      email: "tunde.b@example.com",
      picture: null,
    },
    order: null,
  },
  {
    conversation: {
      identifier: "CNV-4098",
      customerIdentifier: "CUS-003",
      orderIdentifier: "ORD-778104",
      subject: "Refund received, thank you",
      description:
        "The refund landed this morning. Thanks for sorting it out so quickly.",
      status: "resolved",
      createdAt: "2026-09-21T11:05:00.000Z",
      updatedAt: "2026-09-24T08:00:00.000Z",
    },
    participant: {
      firstName: "Mariam",
      lastName: "Sule",
      email: "mariam.s@example.com",
      picture: null,
    },
    order: { identifier: "ORD-778104" },
  },
];

/** Two replies on `row`, one from support and one from the customer. */
export const replies: ConversationReply[] = [
  {
    identifier: "MSG-1",
    conversationIdentifier: row.conversation.identifier,
    body: "Thanks for flagging this. We've escalated the order to the fulfilment team.",
    senderEmail: "support@ryder.example",
    createdAt: "2026-09-28T15:40:00.000Z",
    updatedAt: null,
  },
  {
    identifier: "MSG-2",
    conversationIdentifier: row.conversation.identifier,
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

/** The other side of the conversation: the customer who opened it. */
export const counterpart: ThreadParty = {
  name: "Ada Okafor",
  email: "ada.o@example.com",
  avatarText: "AO",
};

/** Order options shaped for MessagingForm's `orders` prop. */
export const orders: Array<{
  identifier: string;
  status?: string;
  itemsCount?: number;
}> = [
  { identifier: "ORD-778812", status: "in_progress", itemsCount: 3 },
  { identifier: "ORD-778104", status: "delivered", itemsCount: 1 },
  { identifier: "ORD-779350", status: "cancelled", itemsCount: 2 },
];

/** Reply badge counts keyed by conversation identifier. */
export const replyCounts: Record<string, number> = {
  "CNV-4102": replies.length,
  "CNV-4103": 1,
  "CNV-4098": 4,
};
