/**
 * Complaint entities used by the shared complaint UI.
 *
 * The shapes mirror the backend's OpenAPI document: `Complaint` is
 * `ComplaintsInterface`, `ComplaintReply` is `ComplaintRepliesInterface`, and
 * both enums are `snake_case` on the wire — `ComplaintStatus` is
 * `["open","in_progress","resolved","closed"]`. Matching them in any other
 * casing never hits; the shared status helpers all take the raw value.
 */

export const COMPLAINT_STATUSES = [
  "open",
  "in_progress",
  "resolved",
  "closed",
] as const;

export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

/** The moves a complainer or staff can write. `open` is the state a complaint
 *  is raised in, not one anyone can move it *into*. */
export type ComplaintWritableStatus = Extract<
  ComplaintStatus,
  "in_progress" | "resolved" | "closed"
>;

/** Mirrors `ComplaintsInterface`. */
export interface Complaint {
  identifier: string;
  customerIdentifier: string;
  orderIdentifier: string | null;
  subject: string;
  description: string;
  status: ComplaintStatus | null;
  createdAt: string;
  updatedAt: string | null;
}

/** Mirrors `ComplaintRepliesInterface` — one message in the email thread. */
export interface ComplaintReply {
  identifier: string;
  complaintIdentifier: string;
  body: string;
  senderEmail: string;
  createdAt: string;
  updatedAt: string | null;
}

/** The customer fields a complaint row needs on screen. */
export interface ComplaintCustomer {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string | null;
}

/** The order fields a complaint row needs on screen. */
export interface ComplaintOrder {
  identifier: string;
}

/**
 * What the shared complaint UI renders. Listing endpoints answer with a
 * complaint and any related customer/order — either may be absent — so the row
 * shape is what the components take in.
 */
export interface ComplaintRow {
  complaint: Complaint;
  customer: ComplaintCustomer | null;
  order: ComplaintOrder | null;
}

export const COMPLAINTS_INBOX_TABS = ["all", "open", "resolved"] as const;

export type ComplaintsInboxTab = (typeof COMPLAINTS_INBOX_TABS)[number];

/** One end of a complaint thread, as rendered by the shared UI. */
export interface ThreadParty {
  /** Display name (customer name, staff name, "Support team"...). */
  name: string;
  email?: string | null;
  avatarSrc?: string;
  avatarText?: string;
}
/** Payload for creating a complaint. */
export interface CreateComplaintPayload {
  subject: string;
  description: string;
  orderIdentifier?: string;
}
