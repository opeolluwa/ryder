import type { ComplaintCustomer, ComplaintRow } from "../types/complaints";

/** Derives what the shared complaint UI shows as "the complainer". */

export function initials(
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

export function complaintCustomerName(
  customer: ComplaintCustomer | null | undefined,
): string {
  if (!customer) return "Unknown customer";

  const name = [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || customer.email;
}

export function complaintCustomerLabel(
  row: Pick<ComplaintRow, "customer"> | null,
): string {
  return complaintCustomerName(row?.customer ?? null);
}

export function complaintCustomerAvatar(
  row: Pick<ComplaintRow, "customer"> | null,
): { src?: string; alt: string; text: string } {
  const customer = row?.customer ?? null;

  return {
    src: customer?.picture || undefined,
    alt: complaintCustomerName(customer),
    text: initials(customer?.firstName, customer?.lastName),
  };
}