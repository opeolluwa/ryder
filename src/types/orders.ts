/**
 * Order entities used by the shared order UI.
 *
 * The shapes mirror the backend's OpenAPI document: `Order` is
 * `OrderResponse`, `OrderItem` is `OrderItemResponse`, and `OrderStatus` is a
 * `snake_case` enum on the wire — `["cancelled","fulfilled","pending","paid","conflicted"]`.
 * Both the staff console and the storefront read the same response shape off
 * their (differently scoped) endpoints, so one set of components serves both.
 */

export const ORDER_STATUSES = [
  "cancelled",
  "fulfilled",
  "pending",
  "paid",
  "conflicted",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Mirrors `ProductPriceResponse`. `amount` is a string in major units. */
export interface OrderPrice {
  currency: string;
  amount: string;
}

/** Mirrors `ProductSummary` — the product projection embedded in lines. */
export interface OrderProduct {
  identifier: string;
  name: string;
  picture: string | null;
  description: string;
  category?: string | null;
}

/** Mirrors `OrderItemResponse` — one line of an order. */
export interface OrderItem {
  identifier: string;
  quantity: number;
  product: OrderProduct;
  price: OrderPrice;
}

/** Mirrors `DeliveryResponse`. */
export interface OrderDelivery {
  identifier: string;
  recipientName: string;
  recipientPhone: string;
  addressLineOne: string;
  addressLineTwo: string | null;
  localGovtArea: string | null;
  cityOrTown: string | null;
  state: string | null;
  deliveryNotes: string | null;
}

/**
 * Mirrors `OrderResponse`. An order is a basket of `items`, not one product:
 * the line quantity, product and price live on the item rather than the order.
 * `status` is nullable on the schema, and `createdAt` is the row timestamp the
 * backend serializes as `"YYYY-MM-DD HH:MM:SS"`.
 */
export interface Order {
  identifier: string;
  customerIdentifier: string;
  status: OrderStatus | null;
  paymentReference: string | null;
  createdAt: string;
  delivery: OrderDelivery | null;
  items: OrderItem[];
}

/** One tab in a shared order list. `count` rides in a separate map because it
 *  changes with the data while the tab set does not. */
export interface OrderListTab {
  value: string;
  label: string;
}