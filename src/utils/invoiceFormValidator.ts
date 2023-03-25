import type { Invoice } from "../interfaces";
import { invoiceSchema } from "../schemas";

export const areInvoiceFormFieldsCorrect = (invoice: Partial<Invoice>) =>
  invoiceSchema.safeParse(invoice);
