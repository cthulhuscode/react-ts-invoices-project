import { z } from "zod";
import type { EnumValues } from "zod";
import { paymentTerms, Statuses } from "../interfaces";

const street = z.string().trim().min(1);
const city = z.string().trim().min(1);
const postCode = z.string().trim().min(1);
const country = z.string().trim().min(1);

const timestamp = z.string().trim().min(1);
const dateString = z.string().trim().min(1);
const friendlyDate = z.string().trim().min(1);

const id = z.string().trim().uuid().optional();
const name = z.string().trim().min(1);
const projectDescription = z.string().trim().min(1);
const email = z.string().trim().email().min(5);

const price = z.number().nonnegative();
const total = z.number().nonnegative();
const amount = z.number().nonnegative();

const paymentTermsDescSchema = z.enum(
  Object.values(paymentTerms).map((pT) => pT.desc) as EnumValues
);
const paymentTermsValSchema = z.enum(
  Object.values(paymentTerms).map((pT) => pT.value.toString()) as EnumValues
);
const statusesSchema = z.enum(Object.values(Statuses) as EnumValues);

const addressSchema = z.object({
  street,
  city,
  postCode,
  country,
});

const customDateSchema = z.object({
  timestamp,
  dateString,
  friendlyDate,
});

const invoiceListItemSchema = z.object({
  id,
  name,
  amount,
  price,
  total,
});

export const invoiceSchema = z.object({
  id,
  status: statusesSchema,
  billFrom: addressSchema,
  billTo: addressSchema,
  client: z.object({
    name,
    email,
  }),
  date: customDateSchema,
  paymentTerms: z.object({
    desc: paymentTermsDescSchema,
    value: paymentTermsValSchema,
  }),
  paymentDue: customDateSchema,
  projectDescription,
  itemList: z.array(invoiceListItemSchema),
  totalPrice: price,
});
