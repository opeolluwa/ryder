import type {
  Complaint,
  ComplaintReply,
  ComplaintRow,
  ThreadParty,
} from "@weangel/shared/types";

export function complaint(): Complaint {
  return {
    identifier: "CMP-0003",
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

export function complaintRow(): ComplaintRow {
  return {
    complaint: complaint(),
    customer: {
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada.o@example.com",
      picture: null,
    },
    order: { identifier: "ORD-778812" },
  };
}

export const threadReplies: ComplaintReply[] = [
  {
    identifier: "RPL-1",
    complaintIdentifier: "CMP-0003",
    body: "Thanks for flagging this. We've escalated the order to the fulfilment team.",
    senderEmail: "support@weangel.ng",
    createdAt: "2026-09-28T15:40:00.000Z",
    updatedAt: null,
  },
  {
    identifier: "RPL-2",
    complaintIdentifier: "CMP-0003",
    body: "Any update on the dispatch? I'd really appreciate an ETA.",
    senderEmail: "ada.o@example.com",
    createdAt: "2026-09-29T08:05:00.000Z",
    updatedAt: null,
  },
];

export const staffParty: ThreadParty = {
  name: "Chioma",
  email: "staff@weangel.ng",
  avatarText: "CH",
};

export function counterpartParty(): ThreadParty {
  return {
    name: "Ada Okafor",
    email: "ada.o@example.com",
    avatarText: "AO",
  };
}

/** Stand-in for an app's data layer while playing with the shared UI. */
export function useComplaintEmailDemo() {
  const thread = ref<ComplaintReply[]>(threadReplies);
  const sendsAreLoading = ref(false);
  const sendCount = ref(0);

  async function sendReply(body: string) {
    sendsAreLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 400));

    thread.value = [
      ...thread.value,
      {
        identifier: `RPL-${Date.now()}`,
        complaintIdentifier: complaint().identifier,
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