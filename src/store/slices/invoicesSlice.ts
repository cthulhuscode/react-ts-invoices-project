import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Invoice, Statuses } from "../../interfaces";

// Define a type for the slice state
interface InvoicesState {
  list: Invoice[] | null;
  selectedStatuses: {
    [key in Statuses]: boolean;
  };
  showForm: boolean;
}

// Define the initial state using that type
const initialState: InvoicesState = {
  list: null,
  selectedStatuses: {
    Paid: false,
    Pending: false,
    Draft: false,
  },
  showForm: false,
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      const newInvoice = { ...action.payload, id: uuidv4() };
      state.list?.push(newInvoice);
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
    toggleForm: (state, action: PayloadAction<boolean> | undefined) => {
      if (action?.payload !== undefined) {
        state.showForm = action.payload;
      } else {
        state.showForm = !state.showForm;
      }
    },
  },
});

export const { addInvoice, editInvoice, deleteInvoice, toggleForm } =
  invoicesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getInvoices = (state: RootState) => state.invoices.list;

export default invoicesSlice.reducer;
