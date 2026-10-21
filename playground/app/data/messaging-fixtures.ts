import type {
  Conversation,
  ConversationReply,
  ConversationRow,
  ThreadParty,
} from "@opeolluwa/ryder/types";

function conversation(
  identifier: string,
  subject: string,
  description: string,
  status: Conversation["status"],
  createdAt: string,
): Conversation {
  return {
    identifier,
    customerIdentifier: `CUS-${identifier.slice(4)}`,
    orderIdentifier: "ORD-778812",
    subject,
    description,
    status,
    createdAt,
    updatedAt: null,
  };
}

export function conversationRowFor(
  identifier: string,
  participant: NonNullable<ConversationRow["participant"]>,
  subject: string,
  description: string,
  status: Conversation["status"],
  createdAt: string,
): ConversationRow {
  return {
    conversation: conversation(identifier, subject, description, status, createdAt),
    participant,
    order: { identifier: "ORD-778812" },
  };
}

export function conversationRow(): ConversationRow {
  return conversationRowFor(
    "MSG-0001",
    {
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada.o@example.com",
      picture: null,
    },
    "Order still marked in progress",
    "Payment went through two days ago but the order was never shipped. Please look into it.",
    "in_progress",
    "2026-09-28T09:12:00.000Z",
  );
}

/**
 * One shared inbox, so the `/messaging` list and `/messaging/[id]` detail page
 * render the same conversations and threads — a reply sent on the detail page
 * is in the reply counts when you go back to the list.
 */
export const conversationRows: ConversationRow[] = [
  conversationRow(),
  conversationRowFor(
    "MSG-0002",
    {
      firstName: "Chinedu",
      lastName: "Nwosu",
      email: "chinedu.n@example.com",
      picture: null,
    },
    "Delivery address change",
    "My parcel is going to my office now — please update the address before dispatch.",
    "open",
    "2026-09-30T14:02:00.000Z",
  ),
  conversationRowFor(
    "MSG-0003",
    {
      firstName: "Bola",
      lastName: "Adeyemi",
      email: "bola.a@example.com",
      picture: null,
    },
    "Discount not applied",
    "The 10% welcome code did not come off at checkout. Can you sort this out?",
    "resolved",
    "2026-09-25T11:47:00.000Z",
  ),
];

export const threadReplies: ConversationReply[] = [
  {
    identifier: "RPL-1",
    conversationIdentifier: "MSG-0001",
    body: "Thanks for flagging this. We've escalated the order to the fulfilment team.",
    senderEmail: "support@example.com",
    createdAt: "2026-09-28T15:40:00.000Z",
    updatedAt: null,
  },
  {
    identifier: "RPL-2",
    conversationIdentifier: "MSG-0001",
    body: "Any update on the dispatch? I'd really appreciate an ETA.",
    senderEmail: "ada.o@example.com",
    createdAt: "2026-09-29T08:05:00.000Z",
    updatedAt: null,
  },
  {
    identifier: "RPL-3",
    conversationIdentifier: "MSG-0001",
    body: "Your order has been dispatched and should arrive by Friday. Tracking number: TRK-449921.",
    senderEmail: "support@example.com",
    createdAt: "2026-09-30T10:22:00.000Z",
    updatedAt: null,
  },
];

const msg0002Replies: ConversationReply[] = [
  {
    identifier: "RPL-4",
    conversationIdentifier: "MSG-0002",
    body: "Sure — send over the office address and I'll get it updated.",
    senderEmail: "support@example.com",
    createdAt: "2026-09-30T14:45:00.000Z",
    updatedAt: null,
  },
];

export const staffParty: ThreadParty = {
  name: "Chioma",
  email: "support@example.com",
  avatarText: "CH",
};

export function counterpartParty(): ThreadParty {
  return {
    name: "Ada Okafor",
    email: "ada.o@example.com",
    avatarText: "AO",
  };
}

const SEND_REPLY_DELAY_MS = 400;

const inboxRows = ref<ConversationRow[]>([...conversationRows]);
const threads = ref<Record<string, ConversationReply[]>>({
  "MSG-0001": [...threadReplies],
  "MSG-0002": [...msg0002Replies],
  "MSG-0003": [],
});
const sendsAreLoading = ref(false);
const sentCount = ref(0);

export function useMessagingDemo() {
  async function sendReply(identifier: string, body: string) {
    sendsAreLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, SEND_REPLY_DELAY_MS));

    const existing = threads.value[identifier] ?? [];

    threads.value[identifier] = [
      ...existing,
      {
        identifier: `RPL-${Date.now()}`,
        conversationIdentifier: identifier,
        body,
        senderEmail: staffParty.email!,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    ];

    sendsAreLoading.value = false;
    sentCount.value += 1;
  }

  return {
    rows: inboxRows,
    threads,
    sendsAreLoading,
    sentCount,
    sendReply,
  };
}