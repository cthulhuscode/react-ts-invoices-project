import { useRef } from "react";

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
    <div
      className="iform"
      style={{ display: `${showForm ? "flex" : "none"}` }}
      ref={ref}
    >
      <h3>Bill From</h3>
      <InputText
        classes=""
        label="Street Address"
        name="fromStreet"
        error={true}
        setState={() => {
          return 0;
        }}
      />

      <div className="">
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
    </div>
  );
};
