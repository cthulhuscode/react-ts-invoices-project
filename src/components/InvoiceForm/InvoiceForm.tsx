import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { ValidationError } from "zod-validation-error";
import { fromZodError } from "zod-validation-error";

import { useOnClickOutside, useDate } from "../../hooks";
import type { PaymentTerms, CustomDate, Invoice } from "../../interfaces";
import { Statuses } from "../../interfaces";
import { ItemList } from "./ItemList/ItemList";
import { DatePicker, InputText, Select } from "../../ui";
import { images } from "../../constants";
import {
  addInvoice,
  editCurrentInvoice,
  editInvoice,
  resetCurrentInvoice,
  setCurrentInvoice,
  setFormHasErrors,
  toggleForm,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import "./InvoiceForm.scss";
import { areInvoiceFormFieldsCorrect } from "../../utils";

export const InvoiceForm = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const formHasErrors = useAppSelector((state) => state.invoices.formHasErrors);
  const form = useAppSelector((state) => state.invoices.form);
  const { show, operation } = form;

  useEffect(() => {
    const editInvoice = location.pathname.includes("/invoices/");
    if (operation === "edit" && editInvoice) {
      const invoiceId = location.pathname.split("/invoices/")[1];
      dispatch(setCurrentInvoice(invoiceId));
    } else if (operation === "edit" && !editInvoice) {
      dispatch(resetCurrentInvoice());
      dispatch(toggleForm({ show, operation: "create" }));
    } else if (operation === "create" && editInvoice) {
      dispatch(toggleForm({ show, operation: "edit" }));
    }
  }, [pathname, show, operation]);

  const currentInvoice = useAppSelector(
    (state) => state.invoices.currentInvoice
  );
  const { billFrom, billTo, client, projectDescription, id } = currentInvoice;

  const [formErrors, setFormErrors] = useState<ValidationError>();
  const { getDateStringFromTimestamp, formatDate } = useDate();

  const handleDateChange = (date: CustomDate) => {
    dispatch(editCurrentInvoice({ ...currentInvoice, date }));
  };

  const handlePaymentTermsChange = (paymentTerms: PaymentTerms) => {
    const calcDate = new Date();

    const payDue = calcDate.setDate(
      calcDate.getDate() + parseInt(paymentTerms.value)
    );
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
    console.log(status);
    dispatch(
      editCurrentInvoice({
        ...currentInvoice,
        status,
      })
    );

    const result = areInvoiceFormFieldsCorrect(currentInvoice);

    // Save new invoice
    if (
      status === Statuses.draft ||
      (result.success && operation === "create")
    ) {
      dispatch(addInvoice());
      dispatch(resetCurrentInvoice());
      dispatch(setFormHasErrors(false));
      dispatch(toggleForm(false));
    }
    // Save edited invoice
    else if (operation === "edit" && result.success) {
      dispatch(editInvoice(currentInvoice as Invoice));
      dispatch(resetCurrentInvoice());
      dispatch(setFormHasErrors(false));
      dispatch(toggleForm(false));
    }
    // Form has errors
    else if (!result.success) {
      dispatch(setFormHasErrors(true));
      setFormErrors(fromZodError(result.error));
    }
  };

  const handleCancelClick = () => {
    dispatch(setFormHasErrors(false));
    dispatch(resetCurrentInvoice());
    dispatch(toggleForm(false));
  };

  useOnClickOutside(ref, () => {
    dispatch(toggleForm(false));
  });

  return (
    <div className="iform" style={{ display: show ? "flex" : "none" }}>
      <motion.div
        initial={{ x: -632 }}
        whileInView={{ x: 0 }}
        exit={{ x: -632 }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        className="iform-content"
        ref={ref}
      >
        <div className="iform__back">
          <img src={images.leftArrow} alt="go back" />
          <span>Go back</span>
        </div>

        <h1 className="iform__title">
          {operation === "create" ? "New Invoice" : "Edit"}{" "}
          {operation === "edit" && <span>#</span>}
          {operation === "edit" && id !== null && id !== undefined
            ? id.substring(0, 8)
            : ""}
        </h1>

        {/* Bill from */}
        <h4 className="iform__subtitle">Bill From</h4>
        <InputText
          classes=""
          label="Street Address"
          name="from.street"
          setState={handleInputChange}
          value={billFrom?.street}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            classes=""
            label="City"
            name="from.city"
            setState={handleInputChange}
            value={billFrom?.city}
          />

          <InputText
            classes=""
            label="Post Code"
            name="from.postCode"
            setState={handleInputChange}
            value={billFrom?.postCode}
          />

          <InputText
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
          classes=""
          label="Client's Name"
          name="client.name"
          setState={handleInputChange}
          value={client?.name}
        />

        <InputText
          classes="mt-24"
          label="Client's Email"
          name="client.email"
          setState={handleInputChange}
          value={client?.email}
        />

        <InputText
          classes="mt-24"
          label="Street Address"
          name="to.street"
          setState={handleInputChange}
          value={billTo?.street}
        />

        <div className="iform__address-row iform__address-row--padding">
          <InputText
            classes=""
            label="City"
            name="to.city"
            setState={handleInputChange}
            value={billTo?.city}
          />

          <InputText
            classes=""
            label="Post Code"
            name="to.postCode"
            setState={handleInputChange}
            value={billTo?.postCode}
          />

          <InputText
            classes=""
            label="Country"
            name="to.country"
            setState={handleInputChange}
            value={billTo?.country}
          />
        </div>

        <div className="mt-48 iform__address-row-controls">
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
          classes="mt-24"
          label="Project Description"
          name="projectDescription"
          setState={handleInputChange}
          value={projectDescription}
        />

        {/* Item List */}
        <ItemList />
        <div
          className="iform__error"
          style={{ display: formHasErrors ? "unset" : "none" }}
        >
          {formErrors?.message.split(";").map((error) => (
            <span className="iform__error-msg" key={error}>
              {error}
            </span>
          ))}
        </div>

        <div className="iform__btns">
          <motion.button
            style={{ visibility: operation === "edit" ? "hidden" : "unset" }}
            className="iform-btn iform-btn__discard"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleCancelClick();
            }}
          >
            Discard
          </motion.button>
          <div className="iform__btns-save">
            <motion.button
              style={{ display: operation === "edit" ? "none" : "unset" }}
              className="iform-btn iform-btn__draft"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleSaveClick(Statuses.draft);
              }}
            >
              Save as Draft
            </motion.button>

            <motion.button
              style={{ display: operation === "create" ? "none" : "unset" }}
              className="iform-btn iform-btn__discard"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleCancelClick();
              }}
            >
              Cancel
            </motion.button>

            <motion.button
              className="iform-btn iform-btn__save"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleSaveClick(Statuses.pending);
              }}
            >
              {operation === "edit" ? "Save changes" : "Save & Send"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="iform-blur"></div>
    </div>
  );
};
