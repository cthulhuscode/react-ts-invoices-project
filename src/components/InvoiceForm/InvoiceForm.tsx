import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { addInvoice, editCurrentInvoice, toggleForm } from "../../redux";

import type { PaymentTerms, CustomDate, Invoice } from "../../interfaces";

import { Statuses } from "../../interfaces";

import { ItemList } from "./ItemList/ItemList";
import { DatePicker, InputText, Select } from "../../ui";

import "./InvoiceForm.scss";
import { images } from "../../constants";
import { useDate } from "../../hooks/useDate";

export const InvoiceForm = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const currentInvoice = useAppSelector(
    (state) => state.invoices.currentInvoice
  );
  const { billFrom, billTo, client, projectDescription } = currentInvoice;

  const [formHasErrors, setFormHasErrors] = useState(false);
  const showForm = useAppSelector((state) => state.invoices.showForm);
  const { getDateStringFromTimestamp, formatDate } = useDate();

  const handleDateChange = (date: CustomDate) => {
    dispatch(editCurrentInvoice({ ...currentInvoice, date }));
  };

  const handlePaymentTermsChange = (paymentTerms: PaymentTerms) => {
    const calcDate = new Date();

    const payDue = calcDate.setDate(calcDate.getDate() + paymentTerms.value);
    const paymentDue: CustomDate = {
      dateString: getDateStringFromTimestamp(new Date(payDue)),
      friendlyDate: formatDate(new Date(payDue)),
      timestamp: new Date(payDue).toISOString(),
    };

    dispatch(
      editCurrentInvoice({ ...currentInvoice, paymentTerms, paymentDue })
    );
  };

  const handleInputChange = (target: EventTarget & HTMLInputElement) => {
    let editingInvoice = {};
    target = target as HTMLInputElement;
    const name = target.name.split(".");

    if (name[0] === "from") {
      editingInvoice = {
        ...currentInvoice,
        billFrom: { ...currentInvoice.billFrom, [name[1]]: target.value },
      };
    } else if (name[0] === "to") {
      editingInvoice = {
        ...currentInvoice,
        billTo: { ...currentInvoice.billTo, [name[1]]: target.value },
      };
    } else if (name[0] === "client") {
      editingInvoice = {
        ...currentInvoice,
        client: { ...currentInvoice.client, [name[1]]: target.value },
      };
    } else {
      editingInvoice = { ...currentInvoice, [name[0]]: target.value };
    }

    // _setInvoice(editingInvoice);
    dispatch(editCurrentInvoice(editingInvoice));
  };

  const handleSaveClick = (status: Statuses) => {
    dispatch(editCurrentInvoice({ ...currentInvoice, status }));

    if (!formHasErrors && areFormFieldsFilled(currentInvoice)) {
      dispatch(addInvoice());
    } else {
      console.log("The form has errors");
    }
  };

  useOnClickOutside(ref, () => {
    dispatch(toggleForm(false));
  });

  return (
    <div className="iform" style={{ display: showForm ? "flex" : "none" }}>
      <div className="iform-content" ref={ref}>
        <div className="iform__back">
          <img src={images.leftArrow} alt="go back" />
          <span>Go back</span>
        </div>

        <h1 className="iform__title">New Invoice</h1>

        {/* Bill from */}
        <h4 className="iform__subtitle">Bill From</h4>
        <InputText
          setInputHasError={setFormHasErrors}
          classes=""
          label="Street Address"
          name="from.street"
          setState={handleInputChange}
          value={billFrom?.street}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="City"
            name="from.city"
            setState={handleInputChange}
            value={billFrom?.city}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Post Code"
            name="from.postCode"
            setState={handleInputChange}
            value={billFrom?.postCode}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Country"
            name="from.country"
            setState={handleInputChange}
            value={billFrom?.country}
          />
        </div>

        {/* Bill to */}
        <h4 className="iform__subtitle">Bill To</h4>
        <InputText
          setInputHasError={setFormHasErrors}
          classes=""
          label="Client's Name"
          name="client.name"
          setState={handleInputChange}
          value={client?.name}
        />

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Client's Email"
          name="client.email"
          setState={handleInputChange}
          value={client?.email}
        />

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Street Address"
          name="to.street"
          setState={handleInputChange}
          value={billTo?.street}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="City"
            name="to.city"
            setState={handleInputChange}
            value={billTo?.city}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Post Code"
            name="to.postCode"
            setState={handleInputChange}
            value={billTo?.postCode}
          />

          <InputText
            setInputHasError={setFormHasErrors}
            classes=""
            label="Country"
            name="to.country"
            setState={handleInputChange}
            value={billTo?.country}
          />
        </div>

        <div className="iform__address-row mt-48">
          <DatePicker
            onChangeDate={handleDateChange}
            label={"Issue Date"}
            classes=""
          />

          <Select
            label={"Payment Terms"}
            setSelectedOption={handlePaymentTermsChange}
          />
        </div>

        <InputText
          setInputHasError={setFormHasErrors}
          classes="mt-24"
          label="Project Description"
          name="projectDescription"
          setState={handleInputChange}
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
              onClick={() => {
                handleSaveClick(Statuses.draft);
              }}
            >
              Save as Draft
            </motion.button>
            <motion.button
              className="iform-btn iform-btn__save"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleSaveClick(Statuses.pending);
              }}
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

function areFormFieldsFilled(invoice: Partial<Invoice>) {
  if (
    invoice.billFrom !== null &&
    invoice.billFrom?.city !== "" &&
    invoice.billFrom?.country !== "" &&
    invoice.billFrom?.postCode !== "" &&
    invoice.billFrom?.street !== "" &&
    invoice.billTo !== null &&
    invoice.billTo?.city !== "" &&
    invoice.billTo?.country !== "" &&
    invoice.billTo?.postCode !== "" &&
    invoice.billTo?.street !== "" &&
    invoice.client !== null &&
    invoice.client?.name !== "" &&
    invoice.client?.email !== "" &&
    invoice.date !== null &&
    invoice.itemList !== null &&
    invoice.paymentTerms !== null &&
    invoice.paymentDue !== null &&
    invoice.projectDescription !== ""
  )
    return true;
  else return false;
}
