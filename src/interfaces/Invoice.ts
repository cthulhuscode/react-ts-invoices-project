export const paymentTerms = [
  "Net 1 Day",
  "Net 7 Days",
  "Net 14 Days",
  "Net 30 Days",
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

interface AddressTo extends Address {
  client: {
    name: string;
    email: string;
  };
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
  billTo: AddressTo;
  date: string;
  paymentTerms: PaymentTerms;
  projectDescription: string;
  itemList: InvoiceListItem[];
}
