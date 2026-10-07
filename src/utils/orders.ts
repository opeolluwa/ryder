import type { Order, OrderDelivery } from "../types/orders";

/**
 * Total quantity across an order's lines, for the one place a summary is wanted.
 */
export function orderItemCount(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Sum an order's lines per currency. The market can price in more than one
 * currency and each line carries its own ISO 4217 code, so a single summed total
 * would be a meaningless number rather than merely a wrong-looking one.
 *
 * `amount` is already in major units as a decimal string, so it is summed as-is.
 * Checkout rejects an order spanning more than one currency, so a single code is
 * the normal case; when a row somehow carries two, the total is reported per
 * currency rather than added together.
 */
export function totalsByCurrency(order: Order) {
  const totals = new Map<string, number>();

  for (const item of order.items) {
    const currency = item.price.currency;
    const amount = Number(item.price.amount);
    const quantity = item.quantity;

    if (!currency || !Number.isFinite(amount)) continue;

    totals.set(currency, (totals.get(currency) ?? 0) + amount * quantity);
  }

  return [...totals.entries()].map(([currency, total]) => ({
    currency,
    total,
  }));
}

/**
 * Checkout copies the address onto the order rather than referencing the
 * customer's address book, so what is shown here is where the shipment is
 * actually going even if the customer edits their saved address afterwards.
 */
export function deliveryLines(delivery: OrderDelivery | null | undefined) {
  if (!delivery) return [];

  return [
    delivery.addressLineOne,
    delivery.addressLineTwo,
    [delivery.cityOrTown, delivery.state].filter(Boolean).join(", "),
    delivery.localGovtArea,
  ].filter((line): line is string => Boolean(line && line.trim()));
}