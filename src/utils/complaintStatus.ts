import type {
  ComplaintStatus,
  ComplaintWritableStatus,
  ComplaintsInboxTab,
} from "../types/complaints";

/**
 * Complaint-status vocabulary, shared by the list tabs, the header pill and the
 * status menu.
 *
 * `in_progress` counts as open, and `closed` as resolved, so the two inbox
 * tabs partition the list without leaving a complaint unreachable. These are
 * the snake_case strings the API actually emits; the PascalCase spellings used
 * here previously never matched a real value.
 */

const OPEN_STATUSES: readonly ComplaintStatus[] = ["open", "in_progress"];
const RESOLVED_STATUSES: readonly ComplaintStatus[] = ["resolved", "closed"];

/** `status` is nullable in the model but NOT NULL in the database; the UI has
 *  always treated a missing value as Open, so the tabs do the same. */
export function resolveStatus(status: ComplaintStatus | null): ComplaintStatus {
  return status ?? "open";
}

/** Human-readable form of a status for display.
 *
 * The wire values are snake_case; rendering them verbatim would put
 * "in_progress" in a badge. */
export function formatStatus(status: ComplaintStatus | null): string {
  const resolved = resolveStatus(status);
  const spaced = resolved.replace(/_/g, " ");

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function complaintIsOpen(status: ComplaintStatus | null): boolean {
  return OPEN_STATUSES.includes(resolveStatus(status));
}

export function complaintIsResolved(status: ComplaintStatus | null): boolean {
  return RESOLVED_STATUSES.includes(resolveStatus(status));
}

/** Whether staff can still resolve this complaint.
 *
 *  Resolution is one-way, so this is false for anything already resolved and
 *  the UI must not offer to move it back. */
export function isResolvable(status: ComplaintStatus | null): boolean {
  return complaintIsOpen(status);
}

/**
 * The moves a complaint is allowed to make, keyed off where it is now.
 *
 * Forward only, for the reason `isResolvable` gives: once a complaint is
 * resolved or closed it is an outcome, not a queue item. An item it cannot
 * take is left out of the menu rather than shown and failing.
 */
export const COMPLAINT_STATUS_TRANSITIONS: Record<
  ComplaintStatus,
  readonly ComplaintWritableStatus[]
> = {
  open: ["in_progress", "resolved", "closed"],
  in_progress: ["resolved", "closed"],
  resolved: [],
  closed: [],
};

export function complaintStatusTransitions(
  status: ComplaintStatus | null,
): readonly ComplaintWritableStatus[] {
  return COMPLAINT_STATUS_TRANSITIONS[resolveStatus(status)];
}

export function canTransitionComplaint(
  from: ComplaintStatus | null,
  to: ComplaintWritableStatus,
): boolean {
  return complaintStatusTransitions(from).includes(to);
}

export function complaintMatchesTab(
  tab: ComplaintsInboxTab,
  status: ComplaintStatus | null,
): boolean {
  if (tab === "all") return true;

  return tab === "open"
    ? complaintIsOpen(status)
    : complaintIsResolved(status);
}

/** Badge/dot colour per status, e.g. for `<UBadge :color>`. */
export type ComplaintStatusColor =
  | "success"
  | "neutral"
  | "primary"
  | "warning";

const COMPLAINT_STATUS_COLORS: Record<ComplaintStatus, ComplaintStatusColor> = {
  open: "warning",
  in_progress: "primary",
  resolved: "success",
  closed: "neutral",
};

export function complaintStatusColor(
  status: ComplaintStatus | null,
): ComplaintStatusColor {
  return COMPLAINT_STATUS_COLORS[resolveStatus(status)];
}