import React from "react";
import "./InvoicePage.scss";
import { images } from "../../constants/images";

export const InvoicePage = () => {
  const product = [
    {
      name: "Banner Design",
      qty: 1,
      Price: "£ 156.00",
      total: "£ 156.00",
    },
    {
      name: "Email Design",
      qty: 2,
      Price: "£ 200.00",
      total: "£ 400.00",
    },
    {
      name: "Design prueba :D",
      qty: 4,
      Price: "£ 200.00",
      total: "£ 400.00",
    },
  ];
  return (
    <div className="InvoicePage">
      <a className="InvoicePage__enlace" href="">
        <img src={images.flecha} alt="" />
        Go back
      </a>
      <div className="InvoicePage__content">
        <div className="InvoicePage__colum2">
          <p className="InvoicePage__title2">Status</p>
          <button>pending</button>
        </div>
        <div className="InvoicePage__colum2">
          <button>Edit</button>
          <button>Delete</button>
          <button>Mark as Paid</button>
        </div>
      </div>

      <div className="InvoicePage__content2">
        <div className="InvoicePage__rows">
          <div className="InvoicePage__colum">
            <h2 className="InvoicePage__title">
              <span>#</span>XM9141
            </h2>
            <p className="InvoicePage__title2">Graphic Design</p>
          </div>
          <div className="InvoicePage__colum">
            <p className="InvoicePage__title4">
              19 Union Terrace London E1 3EZ United Kingdom
            </p>
          </div>
        </div>

        <div className="InvoicePage__rows2">
          <div className="InvoicePage__rows2__colum">
            <div className="InvoicePage__rows2__colum__date">
              <p className="InvoicePage__title2">Invoice Date</p>
              <h3 className="InvoicePage__title3">21 Aug 2021</h3>
            </div>
            <div className="InvoicePage__rows2__colum__date">
              <p className="InvoicePage__title2">Payment Due</p>
              <h3 className="InvoicePage__title3">20 Sep 2021</h3>
            </div>
          </div>
          <div className="InvoicePage__rows2__colum">
            <p className="InvoicePage__title2">Bill To</p>
            <h3 className="InvoicePage__title3">Alex Grim</h3>
            <p className="InvoicePage__title4">
              84 Church Way Bradford BD1 9PB United Kingdom
            </p>
          </div>
          <div className="InvoicePage__rows2__colum">
            <p className="InvoicePage__title2"> Sent to</p>
            <h3 className="InvoicePage__title3">alexgrim@mail.com</h3>
          </div>
        </div>

        <div className="InvoicePage__rows3">
          <div className="InvoicePage__rows5">
            <p className="InvoicePage__rows5__name">Item Name</p>
            <p className="InvoicePage__rows5__qty">QTY.</p>
            <p className="InvoicePage__rows5__price">Price</p>
            <p className="InvoicePage__rows5__total">Total</p>
          </div>
          {product.map((item) => (
            <div className="InvoicePage__colum__items" key={item.name}>
              <h2 className="InvoicePage__name">{item.name}</h2>
              <p className="InvoicePage__qty">{item.qty}</p>
              <p className="InvoicePage__price">{item.Price}</p>
              <h3 className="InvoicePage__total">{item.total}</h3>
            </div>
          ))}
          <div className="InvoicePage__rows3__row">
            <p className="InvoicePage__amount">Amount Due</p>
            <h3 className="InvoicePage__totalPrice">£ 556.00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
