import type { Order } from "../../../src/types/orders";

/**
 * One paid order: a delivery address and two NGN-priced lines. Timestamps use
 * the API's `"YYYY-MM-DD HH:MM:SS"` shape (a space, no timezone).
 */
export const order: Order = {
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

/** Three orders spanning the statuses the list tabs filter on. */
export const orders: Order[] = [
  order,
  {
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
  },
  {
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
  },
];
