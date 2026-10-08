export const MESSAGING_STATUSES = [
  "open",
  "in_progress",
  "resolved",
  "closed",
] as const;

export type MessagingStatus = (typeof MESSAGING_STATUSES)[number];

export type MessagingWritableStatus = Extract<
  MessagingStatus,
  "in_progress" | "resolved" | "closed"
>;

export interface Conversation {
  identifier: string;
  customerIdentifier: string;
  orderIdentifier: string | null;
  subject: string;
  description: string;
  status: MessagingStatus | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ConversationReply {
  identifier: string;
  conversationIdentifier: string;
  body: string;
  senderEmail: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ConversationParticipant {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string | null;
}

export interface ConversationOrder {
  identifier: string;
}

export interface ConversationRow {
  conversation: Conversation;
  participant: ConversationParticipant | null;
  order: ConversationOrder | null;
}

export const MESSAGING_INBOX_TABS = ["all", "open", "resolved"] as const;

export type MessagingInboxTab = (typeof MESSAGING_INBOX_TABS)[number];

export interface ThreadParty {
  name: string;
  email?: string | null;
  avatarSrc?: string;
  avatarText?: string;
}

export interface CreateConversationPayload {
  subject: string;
  description: string;
  orderIdentifier?: string;
}
