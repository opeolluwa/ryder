import type {
  Conversation,
  ConversationReply,
  ConversationRow,
  ThreadParty,
} from "@opeolluwa/ryder/types";

export function conversation(): Conversation {
  return {
    identifier: "MSG-0001",
    customerIdentifier: "CUS-001",
    orderIdentifier: "ORD-778812",
    subject: "Order still marked in progress",
    description:
      "Payment went through two days ago but the order was never shipped. Please look into it.",
    status: "in_progress",
    createdAt: "2026-09-28T09:12:00.000Z",
    updatedAt: null,
  };
}

export function conversationRow(): ConversationRow {
  return {
    conversation: conversation(),
    participant: {
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada.o@example.com",
      picture: null,
    },
    order: { identifier: "ORD-778812" },
  };
}

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

export function useMessagingDemo() {
  const thread = ref<ConversationReply[]>([...threadReplies]);
  const sendsAreLoading = ref(false);
  const sendCount = ref(0);

  async function sendReply(body: string) {
    sendsAreLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 400));

    thread.value = [
      ...thread.value,
      {
        identifier: `RPL-${Date.now()}`,
        conversationIdentifier: conversation().identifier,
        body,
        senderEmail: staffParty.email!,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    ];

    sendsAreLoading.value = false;
    sendCount.value += 1;
  }

  return { thread, sendsAreLoading, sendCount, sendReply };
}
