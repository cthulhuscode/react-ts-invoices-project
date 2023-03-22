import React from "react";
import "./InvoicesList.scss";
import { InvoicesListItem } from "../InvoicesListItem/InvoicesListItem";
import { useAppSelector } from "../../hooks/redux";
import { images } from "../../constants";

export const InvoicesList = () => {
  const invoices = useAppSelector((state) => state.invoices.list);

  return (
    <div className="InvoicesList">
      <div className="InvoicesList__list">
        {invoices.length > 0 &&
          invoices.map((item, index) => (
            <InvoicesListItem
              key={item.id}
              id={item.id === null ? index.toString() : item.id}
              date={item.date.friendlyDate}
              name={item.client.name}
              price={item.totalPrice}
              class={item.status.toLowerCase()}
            />
          ))}
      </div>

      {invoices.length <= 0 && (
        <div className="InvoicesList__zero-invoices">
          <img src={images.zeroInvoices} />
        </div>
      )}
    </div>
  );
};
