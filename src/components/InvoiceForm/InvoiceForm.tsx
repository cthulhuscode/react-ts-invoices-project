import { useRef } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { toggleForm } from "../../store";
import { InputText } from "../../ui";
import "./InvoiceForm.scss";
import { ItemList } from "./ItemList/ItemList";

export const InvoiceForm = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const showForm = useAppSelector((state) => state.invoices.showForm);

  useOnClickOutside(ref, () => {
    dispatch(toggleForm(false));
  });

  return (
    <div className="iform" style={{ display: `${showForm ? "flex" : "none"}` }}>
      <div className="iform-content" ref={ref}>
        <h1 className="iform__title">New Invoice</h1>

        {/* Bill from */}
        <h4 className="iform__subtitle">Bill From</h4>
        <InputText
          classes=""
          label="Street Address"
          name="fromStreet"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            classes=""
            label="City"
            name="fromCity"
            error={false}
            setState={() => {
              return 0;
            }}
          />

          <InputText
            classes=""
            label="Post Code"
            name="fromPostCode"
            error={false}
            setState={() => {
              return 0;
            }}
          />

          <InputText
            classes=""
            label="Country"
            name="fromCountry"
            error={false}
            setState={() => {
              return 0;
            }}
          />
        </div>

        {/* Bill to */}
        <h4 className="iform__subtitle">Bill To</h4>
        <InputText
          classes=""
          label="Client's Name"
          name="clientName"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <InputText
          classes="mt-24"
          label="Client's Email"
          name="clientEmail"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <InputText
          classes="mt-24"
          label="Street Address"
          name="toStreet"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            classes=""
            label="City"
            name="fromCity"
            error={false}
            setState={() => {
              return 0;
            }}
          />

          <InputText
            classes=""
            label="Post Code"
            name="fromPostCode"
            error={false}
            setState={() => {
              return 0;
            }}
          />

          <InputText
            classes=""
            label="Country"
            name="fromCountry"
            error={false}
            setState={() => {
              return 0;
            }}
          />
        </div>

        <div className="iform__address-row mt-48">
          <InputText
            classes=""
            label="Invoice Date"
            name="date"
            error={false}
            setState={() => {
              return 0;
            }}
          />

          <InputText
            classes=""
            label="Payment Terms"
            name="paymentTerms"
            error={false}
            setState={() => {
              return 0;
            }}
          />
        </div>

        <InputText
          classes="mt-24"
          label="Project Description"
          name="projectDescription"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        {/* Item List */}
        <ItemList />

        <div className="iform__btns">
          <motion.button
            className="iform-btn iform-btn__discard"
            whileTap={{ scale: 0.95 }}
          >
            Discard
          </motion.button>
          <div className="iform__btns-save">
            <motion.button
              className="iform-btn iform-btn__draft"
              whileTap={{ scale: 0.95 }}
            >
              Save as Draft
            </motion.button>
            <motion.button
              className="iform-btn iform-btn__save"
              whileTap={{ scale: 0.95 }}
            >
              Save & Send
            </motion.button>
          </div>
        </div>
      </div>

      <div className="iform-blur"></div>
    </div>
  );
};
