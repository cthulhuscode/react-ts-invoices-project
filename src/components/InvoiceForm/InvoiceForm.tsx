import { InputText } from "../../ui";
import "./InvoiceForm.scss";

export const InvoiceForm = () => {
  return (
    <div className="iform">
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
