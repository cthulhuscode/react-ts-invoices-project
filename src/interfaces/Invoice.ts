export const paymentTerms = [
  { desc: "Net 1 Day", value: 1 },
  { desc: "Net 7 Days", value: 7 },
  { desc: "Net 14 Days", value: 14 },
  { desc: "Net 30 Days", value: 30 },
] as const;

export type PaymentTerms = (typeof paymentTerms)[number];

export enum Statuses {
  draft = "Draft",
  pending = "Pending",
  paid = "Paid",
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface CustomDate {
  timestamp: string;
  dateString: string;
  friendlyDate: string;
}

export interface InvoiceListItem {
  id: string;
  name: string;
  amount: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string | null;
  status: Statuses;
  billFrom: Address;
  billTo: Address;
  client: {
    name: string;
    email: string;
  };
  date: CustomDate;
  paymentTerms: PaymentTerms;
  paymentDue: CustomDate;
  projectDescription: string;
  itemList: Record<string | number, InvoiceListItem>;
  totalPrice: number;
}
