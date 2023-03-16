import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { toggleForm } from "../../store";

// import type { Invoice } from "../../interfaces";
import { Statuses } from "../../interfaces";

import { ItemList } from "./ItemList/ItemList";
import { InputText } from "../../ui";

import "./InvoiceForm.scss";

export const InvoiceForm = () => {
  const [fromStreet, setFromStreet] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromPostCode, setFromPostCode] = useState("");
  const [fromCountry, setFromCountry] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [date, setDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [toStreet, setToStreet] = useState("");
  const [toCity, setToCity] = useState("");
  const [toPostCode, setToPostCode] = useState("");
  const [toCountry, setToCountry] = useState("");

  const [formHasErrors, setFormHasErrors] = useState(false);

  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const showForm = useAppSelector((state) => state.invoices.showForm);

  const handleSaveSendClick = () => {
    if (!formHasErrors) {
      const newInvoice = {
        status: Statuses.pending,
        billFrom: {
          street: fromStreet,
          city: fromCity,
          country: fromCountry,
          postCode: fromPostCode,
        },
        billTo: {
          city: toCity,
          country: toCountry,
          postCode: toPostCode,
          street: toStreet,
          client: {
            name: clientName,
            email: clientEmail,
          },
        },
        date,
        paymentTerms,
        projectDescription,
      };

      console.log(newInvoice);
    }
    alert("The form has errors");
  };

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
          setInputHasError={setFormHasErrors}
          classes=""
          label="Street Address"
          name="fromStreet"
          setState={setFromStreet}
          value={fromStreet}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="City"
            name="fromCity"
            setState={setFromCity}
            value={fromCity}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Post Code"
            name="fromPostCode"
            setState={setFromPostCode}
            value={fromPostCode}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Country"
            name="fromCountry"
            setState={setFromCountry}
            value={fromCountry}
          />
        </div>

        {/* Bill to */}
        <h4 className="iform__subtitle">Bill To</h4>
        <InputText
          setInputHasError={setFormHasErrors}
          classes=""
          label="Client's Name"
          name="clientName"
          setState={setClientName}
          value={clientName}
        />

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Client's Email"
          name="clientEmail"
          setState={setClientEmail}
          value={clientEmail}
        />

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Street Address"
          name="toStreet"
          setState={setToStreet}
          value={toStreet}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="City"
            name="toCity"
            setState={setToCity}
            value={toCity}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Post Code"
            name="toPostCode"
            setState={setToPostCode}
            value={toPostCode}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Country"
            name="toCountry"
            setState={setToCountry}
            value={toCountry}
          />
        </div>

        <div className="iform__address-row mt-48">
          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Invoice Date"
            name="date"
            setState={setDate}
            value={date}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Payment Terms"
            name="paymentTerms"
            setState={setPaymentTerms}
            value={paymentTerms}
          />
        </div>

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Project Description"
          name="projectDescription"
          setState={setProjectDescription}
          value={projectDescription}
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
              onClick={handleSaveSendClick}
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
