import { useRef } from "react";
import { motion } from "framer-motion";

import { images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { toggleForm } from "../../store";
import { InputText } from "../../ui";

import "./InvoiceForm.scss";

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

        <div className="iform__address-row vertical-margin">
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
          classes="vertical-margin"
          label="Client's Email"
          name="clientEmail"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <InputText
          classes="vertical-margin"
          label="Street Address"
          name="toStreet"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        <div className="iform__address-row iform__address-row--margin vertical-margin">
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

        <div className="iform__address-row iform__address-row--padding">
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
          classes="vertical-margin"
          label="Project Description"
          name="projectDescription"
          error={false}
          setState={() => {
            return 0;
          }}
        />

        {/* Item List */}
        <h2 className="iform__table-title">Item List</h2>
        <div className="iform__table">
          <div className="table__row table__columns">
            <span className="table__column-text">Item Name</span>
            <span className="table__column-text">Qty.</span>
            <span className="table__column-text">Price</span>
            <span className="table__column-text">Total</span>
          </div>
          <div className="table__row">
            <input
              className="table__cell table__input"
              type="text"
              name="itemName"
              id="itemName"
            />
            <input
              className="table__cell table__input"
              type="number"
              name="itemQty"
              id="itemQty"
            />
            <input
              className="table__cell table__input"
              type="number"
              name="itemPrice"
              id="itemPrice"
            />
            <span className="table__cell">$156.00</span>

            <div className="table__cell">
              <motion.img
                className="table__remove"
                src={images.remove}
                alt="remove item"
                whileTap={{ scale: 0.95 }}
              />
            </div>
          </div>
          <div className="table__row">
            <input
              className="table__cell table__input"
              type="text"
              name="itemName"
              id="itemName"
            />
            <input
              className="table__cell table__input"
              type="number"
              name="itemQty"
              id="itemQty"
            />
            <input
              className="table__cell table__input"
              type="number"
              name="itemPrice"
              id="itemPrice"
            />
            <span className="table__cell">$156.00</span>

            <div className="table__cell">
              <motion.img
                className="table__remove"
                src={images.remove}
                alt="remove item"
                whileTap={{ scale: 0.95 }}
              />
            </div>
          </div>

          <motion.button
            className="iform__table-btn"
            whileTap={{ scale: 0.95 }}
          >
            + Add New Item
          </motion.button>
        </div>
      </div>

      <div className="iform-blur"></div>
    </div>
  );
};
