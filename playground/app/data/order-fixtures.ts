import type {
  Order,
  OrderListTab,
  OrderStatus,
} from "@opeolluwa/ryder/types";
import { resolveOrderStatus } from "@opeolluwa/ryder/utils";

/**
 * The inbox tabs are the same partition `backoffice-console` uses: every status
 * shows in exactly one tab, and `open` groups the two that still need an admin
 * to act. `conflicted` deliberately has no tab — it means money arrived but
 * disagreed with the order, so it is flagged in place rather than hidden.
 */
export type OrdersInboxTab = "all" | "open" | "fulfilled" | "cancelled";

export const ORDER_TABS: OrderListTab[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
];

const OPEN_STATUSES: OrderStatus[] = ["pending", "paid"];

export function orderMatchesTab(order: Order, tab: OrdersInboxTab): boolean {
  if (tab === "all") return true;

  const status = resolveOrderStatus(order.status);

  if (tab === "open") return OPEN_STATUSES.includes(status);

  return status === tab;
}

const TAB_EMPTY_COPY: Record<OrdersInboxTab, { title: string; description: string }> = {
  all: {
    title: "No orders yet",
    description: "Orders placed by customers will appear here.",
  },
  open: {
    title: "No open orders",
    description: "Orders awaiting payment or fulfilment will appear here.",
  },
  fulfilled: {
    title: "No fulfilled orders",
    description: "Orders marked as fulfilled will appear here.",
  },
  cancelled: {
    title: "No cancelled orders",
    description: "Orders that have been cancelled will appear here.",
  },
};

export function emptyStateForTab(tab: OrdersInboxTab) {
  return TAB_EMPTY_COPY[tab];
}

/**
 * A paid order with a delivery address and two NGN-priced lines. Timestamps use
 * the API's `"YYYY-MM-DD HH:MM:SS"` shape.
 */
export function paidOrder(): Order {
  return {
    identifier: "ORD-7KQ2M9X4",
    customerIdentifier: "CUS-3P8V1N6",
    status: "paid",
    paymentReference: "PSK-1738829045123",
    createdAt: "2026-01-14 09:42:18",
    delivery: {
      identifier: "DLV-5R1T7W3B",
      recipientName: "Adaeze Okafor",
      recipientPhone: "+234 803 555 0142",
      addressLineOne: "17 Ozumba Mbadiwe Avenue",
      addressLineTwo: "Flat 4, Dolphin Estate",
      localGovtArea: "Ikoyi",
      cityOrTown: "Lagos",
      state: "Lagos",
      deliveryNotes: "Call the gatehouse on arrival.",
    },
    items: [
      {
        identifier: "ITM-9A4C2H6L",
        quantity: 2,
        product: {
          identifier: "PRD-4M8B1X5Z",
          name: "Ankara Print Maxi Dress",
          picture: null,
          description: "Floor-length Ankara maxi with a side slit.",
        },
        price: { currency: "NGN", amount: "18500" },
      },
      {
        identifier: "ITM-2F7D9J3N",
        quantity: 1,
        product: {
          identifier: "PRD-6T0Q4V8Y",
          name: "Woven Raffia Tote",
          picture: null,
          description: "Hand-woven raffia tote with leather handles.",
        },
        price: { currency: "NGN", amount: "7200" },
      },
    ],
  };
}

export function pendingOrder(): Order {
  return {
    identifier: "ORD-1H5N8R2W",
    customerIdentifier: "CUS-9L4S0D7",
    status: "pending",
    paymentReference: null,
    createdAt: "2026-01-16 17:05:44",
    delivery: null,
    items: [
      {
        identifier: "ITM-3X6B9C1M",
        quantity: 1,
        product: {
          identifier: "PRD-8W2K5J0F",
          name: "Hand-Dyed Indigo Cap",
          picture: null,
          description: "Bucket cap in hand-dyed indigo cotton.",
        },
        price: { currency: "NGN", amount: "4500" },
      },
    ],
  };
}

export function fulfilledOrder(): Order {
  return {
    identifier: "ORD-9C2M6F0T",
    customerIdentifier: "CUS-2H7P4Q8",
    status: "fulfilled",
    paymentReference: "PSK-1738105518766",
    createdAt: "2026-01-08 14:12:30",
    delivery: {
      identifier: "DLV-6X3Z9V1N",
      recipientName: "Ngozi Eze",
      recipientPhone: "+234 802 444 9101",
      addressLineOne: "8 Aguiyi Ironsi Street",
      addressLineTwo: null,
      localGovtArea: "Maitama",
      cityOrTown: "Abuja",
      state: "FCT",
      deliveryNotes: null,
    },
    items: [
      {
        identifier: "ITM-4R7Y2K5H",
        quantity: 1,
        product: {
          identifier: "PRD-1M6T3P9V",
          name: "Kente Throw Pillow",
          picture: null,
          description: "Handwoven kente-print lounge cushion.",
        },
        price: { currency: "NGN", amount: "9800" },
      },
    ],
  };
}

export function cancelledOrder(): Order {
  return {
    identifier: "ORD-4T7Y1U6P",
    customerIdentifier: "CUS-5E2A8G3",
    status: "cancelled",
    paymentReference: null,
    createdAt: "2026-01-11 12:23:07",
    delivery: null,
    items: [
      {
        identifier: "ITM-7Z1V4B8Q",
        quantity: 3,
        product: {
          identifier: "PRD-2N9G6L1K",
          name: "Shea Butter Soap Set",
          picture: null,
          description: "Set of three cold-pressed shea butter bars.",
        },
        price: { currency: "NGN", amount: "2400" },
      },
      {
        identifier: "ITM-5C8R3T0Y",
        quantity: 1,
        product: {
          identifier: "PRD-0P3D7F4H",
          name: "Kola Nut Lip Balm",
          picture: null,
          description: "Tinted lip balm with cold-pressed kola nut.",
        },
        price: { currency: "NGN", amount: "1800" },
      },
    ],
  };
}

/** Money arrived but disagreed with the order — flagged, never on a tab. */
export function conflictedOrder(): Order {
  return {
    identifier: "ORD-3F8S5W0J",
    customerIdentifier: "CUS-7K1D6B4",
    status: "conflicted",
    paymentReference: "PSK-1738944129876",
    createdAt: "2026-01-15 08:19:52",
    delivery: null,
    items: [
      {
        identifier: "ITM-2B6G9Q4D",
        quantity: 1,
        product: {
          identifier: "PRD-9C4T7R0M",
          name: "Adire Table Runner",
          picture: null,
          description: "Hand-dyed indigo adire runner, 180cm.",
        },
        price: { currency: "NGN", amount: "11500" },
      },
    ],
  };
}

export function ordersFixture(): Order[] {
  return [
    paidOrder(),
    pendingOrder(),
    fulfilledOrder(),
    cancelledOrder(),
    conflictedOrder(),
  ];
}

const STATUS_UPDATE_DELAY_MS = 350;

/**
 * Local stand-in for the backoffice's `useOrdersInbox`: the rows live once, at
 * module level, so the `/orders` list page and `/orders/[id]` detail page share
 * one inbox — a status change on the detail page is immediately visible when
 * you go back to the list. `changeStatus` returns once the row is updated so
 * callers can close dialogs at the right moment.
 */
const inboxRows = ref<Order[]>(ordersFixture());
const mutatingStatus = ref(false);

async function changeStatus(identifier: string, status: OrderStatus) {
  mutatingStatus.value = true;

  await new Promise((resolve) => setTimeout(resolve, STATUS_UPDATE_DELAY_MS));

  const row = inboxRows.value.find((order) => order.identifier === identifier);

  if (row) {
    row.status = status;
  }

  mutatingStatus.value = false;
}

function resetStatuses() {
  inboxRows.value = ordersFixture();
  mutatingStatus.value = false;
}

export function useOrdersDemo() {
  return {
    rows: inboxRows,
    mutating: mutatingStatus,
    changeStatus,
    reset: resetStatuses,
  };
}