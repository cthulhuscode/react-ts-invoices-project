import React from "react";
import "./InvoicesList.scss";
import { InvoicesListItem } from "../InvoicesListItem/InvoicesListItem";

export const InvoicesList = () => {
  const lista = [
    {
      id: "rt3081",
      date: "Due 19 Aug 2021",
      name: "Jensen Huang",
      price: "1,800.9",
      class: "paid",
    },
    {
      id: "rt3082",
      date: "Due 19 Aug 2021",
      name: "Jensen Huang",
      price: "100.9",
      class: "pending",
    },
    {
      id: "rt3083",
      date: "Due 19 Aug 2021",
      name: "Jensen Huang",
      price: "3,900.00",
      class: "draft",
    },
  ];
  return (
    <div className="InvoicesList">
      {lista.map((item) => (
        <InvoicesListItem
          key={item.id}
          id={item.id}
          date={item.date}
          name={item.name}
          price={item.price}
          class={item.class}
        />
      ))}
    </div>
  );
};
