import type {
  ConversationParticipant,
  ConversationRow,
} from "../types/messaging";

export function participantInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  return (
    [firstName, lastName]
      .filter((part): part is string => !!part && part.length > 0)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?"
  );
}

export function participantName(
  participant: ConversationParticipant | null | undefined,
): string {
  if (!participant) return "Unknown";

  const name = [participant.firstName, participant.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || participant.email;
}

export function participantLabel(
  row: Pick<ConversationRow, "participant"> | null,
): string {
  return participantName(row?.participant ?? null);
}

export function participantAvatar(
  row: Pick<ConversationRow, "participant"> | null,
): { src?: string; alt: string; text: string } {
  const p = row?.participant ?? null;

  return {
    src: p?.picture || undefined,
    alt: participantName(p),
    text: participantInitials(p?.firstName, p?.lastName),
  };
}
