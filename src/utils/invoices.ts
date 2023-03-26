import { v4 as uuidv4 } from "uuid";
import { useDate } from "../hooks";
import type { Invoice } from "../interfaces";
import { paymentTerms, Statuses } from "../interfaces";
import { invoiceSchema } from "../schemas";

const { getDateStringFromTimestamp, formatDate } = useDate();

export const areInvoiceFormFieldsCorrect = (invoice: Partial<Invoice>) =>
  invoiceSchema.safeParse(invoice);

export const generateInitialInvoice = (): Partial<Invoice> => ({
  id: uuidv4(),
  status: Statuses.pending,
  billFrom: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  billTo: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  client: {
    name: "",
    email: "",
  },
  date: {
    timestamp: new Date().toISOString(),
    dateString: getDateStringFromTimestamp(new Date()),
    friendlyDate: formatDate(new Date()),
  },
  paymentTerms: paymentTerms[0],
  paymentDue: {
    timestamp: new Date().toISOString(),
    dateString: getDateStringFromTimestamp(new Date()),
    friendlyDate: formatDate(new Date()),
  },
  projectDescription: "",
  itemList: [
    {
      id: uuidv4(),
      name: "",
      amount: 0,
      price: 0,
      total: 0,
    },
  ],
  totalPrice: 0,
});
