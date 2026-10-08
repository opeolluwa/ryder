import type {
  MessagingStatus,
  MessagingWritableStatus,
  MessagingInboxTab,
} from "../types/messaging";

const OPEN_STATUSES: readonly MessagingStatus[] = ["open", "in_progress"];
const RESOLVED_STATUSES: readonly MessagingStatus[] = ["resolved", "closed"];

export function resolveMessagingStatus(
  status: MessagingStatus | null,
): MessagingStatus {
  return status ?? "open";
}

export function formatMessagingStatus(status: MessagingStatus | null): string {
  const resolved = resolveMessagingStatus(status);
  const spaced = resolved.replace(/_/g, " ");

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function messagingIsOpen(status: MessagingStatus | null): boolean {
  return OPEN_STATUSES.includes(resolveMessagingStatus(status));
}

export function messagingIsResolved(status: MessagingStatus | null): boolean {
  return RESOLVED_STATUSES.includes(resolveMessagingStatus(status));
}

export function isMessagingResolvable(status: MessagingStatus | null): boolean {
  return messagingIsOpen(status);
}

export const MESSAGING_STATUS_TRANSITIONS: Record<
  MessagingStatus,
  readonly MessagingWritableStatus[]
> = {
  open: ["in_progress", "resolved", "closed"],
  in_progress: ["resolved", "closed"],
  resolved: [],
  closed: [],
};

export function messagingStatusTransitions(
  status: MessagingStatus | null,
): readonly MessagingWritableStatus[] {
  return MESSAGING_STATUS_TRANSITIONS[resolveMessagingStatus(status)];
}

export function canTransitionMessaging(
  from: MessagingStatus | null,
  to: MessagingWritableStatus,
): boolean {
  return messagingStatusTransitions(from).includes(to);
}

export function messagingMatchesTab(
  tab: MessagingInboxTab,
  status: MessagingStatus | null,
): boolean {
  if (tab === "all") return true;

  return tab === "open"
    ? messagingIsOpen(status)
    : messagingIsResolved(status);
}

export type MessagingStatusColor =
  | "success"
  | "neutral"
  | "primary"
  | "warning";

const MESSAGING_STATUS_COLORS: Record<MessagingStatus, MessagingStatusColor> = {
  open: "warning",
  in_progress: "primary",
  resolved: "success",
  closed: "neutral",
};

export function messagingStatusColor(
  status: MessagingStatus | null,
): MessagingStatusColor {
  return MESSAGING_STATUS_COLORS[resolveMessagingStatus(status)];
}
