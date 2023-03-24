import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { paymentTerms, Statuses } from "../../interfaces";
import type { Invoice, InvoiceListItem } from "../../interfaces";
import { useDate } from "../../hooks/useDate";

const { getDateStringFromTimestamp, formatDate } = useDate();

// Define a type for the slice state
interface InvoicesState {
  list: Invoice[];
  selectedStatuses: {
    [key in Statuses]: boolean;
  };
  form: {
    show: boolean;
    operation: "edit" | "create";
  };
  currentInvoice: Partial<Invoice>;
}

const initialInvoice: Partial<Invoice> = {
  status: Statuses.draft,
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
};

// Define the initial state using that type
const initialState: InvoicesState = {
  list: [],
  selectedStatuses: {
    Paid: false,
    Pending: false,
    Draft: false,
  },
  form: {
    show: true,
    operation: "create",
  },
  currentInvoice: initialInvoice,
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice | undefined>) => {
      if (action.payload !== undefined) {
        const newInvoice = { ...action.payload, id: uuidv4() };
        state.list?.push(newInvoice);
      } else {
        state.currentInvoice.id = uuidv4();
        if (state.list !== null)
          state.list = [...state.list, state.currentInvoice as Invoice];
        else state.list = [state.currentInvoice as Invoice];

        state.currentInvoice = initialInvoice;
      }
    },
    editInvoice: (state, action: PayloadAction<Invoice>) => {
      const editedInvoice = action.payload;

      if (state.list !== null) {
        const editedInvoiceIndex = state.list?.findIndex(
          (invoice) => invoice.id === editedInvoice.id
        );
        state.list[editedInvoiceIndex] = editedInvoice;
      }
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      if (state.list !== null) {
        state.list = state.list.filter(
          (invoice) => invoice.id !== action.payload
        );
      }
    },
    toggleForm: (
      state,
      action: PayloadAction<
        { show: boolean; operation: "edit" | "create" } | undefined | boolean
      >
    ) => {
      if (typeof action?.payload === "object") {
        state.form = action.payload;
      } else if (typeof action?.payload === "boolean") {
        state.form.show = action.payload;
      } else {
        state.form.show = !state.form.show;
      }
    },
    setCurrentInvoice: (state, action: PayloadAction<string>) => {
      const invoice = state.list.filter(
        (invoice) => invoice.id === action.payload
      )[0];
      state.currentInvoice = invoice;
    },
    resetCurrentInvoice: (state) => {
      state.currentInvoice = { ...initialInvoice };
    },
    editCurrentInvoice: (state, action: PayloadAction<Partial<Invoice>>) => {
      state.currentInvoice = action.payload;
    },
    addNewInvoiceListItem: (state) => {
      const itemList = state.currentInvoice.itemList;

      if (itemList !== null) {
        const id = uuidv4();
        const item = {
          id,
          name: "",
          amount: 0,
          price: 0,
          total: 0,
        };

        state.currentInvoice.itemList?.push(item);
      }
    },
    editInvoiceListItem: (state, action: PayloadAction<InvoiceListItem>) => {
      const item = action.payload;

      let itemList = state.currentInvoice?.itemList;
      if (itemList !== undefined) {
        // Delete current item
        state.currentInvoice.itemList = itemList.filter(
          (i) => i.id !== item.id
        );
        // Add the modified item
        state.currentInvoice.itemList?.push(item);
      }

      // Calculate total price
      itemList = state.currentInvoice?.itemList;
      if (itemList !== undefined) {
        const totalPrice = itemList.reduce((a, b) => a + b.total, 0);
        if (totalPrice !== null) state.currentInvoice.totalPrice = totalPrice;
      }
    },
    removeInvoiceListItem: (state, action: PayloadAction<string>) => {
      state.currentInvoice.itemList = state.currentInvoice.itemList?.filter(
        (item) => item.id !== action.payload
      );

      // Calculate total price
      const itemList = state.currentInvoice?.itemList;
      if (itemList !== undefined) {
        const totalPrice = itemList.reduce((a, b) => a + b.total, 0);
        if (totalPrice !== null) state.currentInvoice.totalPrice = totalPrice;
      }
    },
  },
});

export const {
  addInvoice,
  editInvoice,
  deleteInvoice,
  toggleForm,
  setCurrentInvoice,
  resetCurrentInvoice,
  editCurrentInvoice,
  addNewInvoiceListItem,
  editInvoiceListItem,
  removeInvoiceListItem,
} = invoicesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getInvoices = (state: RootState) => state.invoices.list;
export const getInvoiceItemsList = (state: RootState) => {
  const itemList = state.invoices.currentInvoice?.itemList;
  if (itemList !== undefined) return Object.entries(itemList);
  else return null;
};

export default invoicesSlice.reducer;
