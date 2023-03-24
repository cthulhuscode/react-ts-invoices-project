import { motion } from "framer-motion";
import type { FormEvent } from "react";

import { images } from "../../../../constants";
import { useAppDispatch } from "../../../../redux/hooks";
import type { InvoiceListItem } from "../../../../interfaces";
import { editInvoiceListItem, removeInvoiceListItem } from "../../../../redux";
import "./ListItem.scss";

interface ListItemProps {
  item: InvoiceListItem;
}

export const ListItem = ({ item }: ListItemProps) => {
  const dispatch = useAppDispatch();
  const { id, name, amount, price, total } = item;

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let editingItem = { ...item };
    let total = 0;
    const value = !isNaN(parseFloat(target.value))
      ? parseFloat(target.value)
      : 0;

    if (target.name === "price") {
      total = value * amount;

      editingItem = {
        ...item,
        [target.name]: parseFloat(target.value),
        total: total >= 0 ? total : 0,
      };
    } else if (target.name === "amount") {
      total = value * price;

      editingItem = {
        ...item,
        [target.name]: parseInt(target.value),
        total: total >= 0 ? total : 0,
      };
    } else
      editingItem = {
        ...item,
        [target.name]: target.value,
      };

    dispatch(editInvoiceListItem(editingItem));
  };

  return (
    <div className="fl-item">
      <div className="fl-item__cell fl-item__cell-name">
        <span className="fl-item__label">Item Name</span>
        <input
          value={name}
          className="fl-item__input"
          type="text"
          name="name"
          id="name"
          onChange={handleInputChange}
        />
      </div>

      <div className="fl-item__cell">
        <span className="fl-item__label">Qty.</span>

        <input
          value={amount.toString()}
          className="fl-item__input fl-item__input-qty"
          type="number"
          name="amount"
          id="amount"
          placeholder="1"
          min={1}
          onChange={handleInputChange}
        />
      </div>

      <div className="fl-item__cell">
        <span className="fl-item__label">Price</span>
        <input
          value={price.toString()}
          className="fl-item__input fl-item__input-price"
          type="number"
          name="price"
          id="price"
          placeholder="0.00"
          onChange={handleInputChange}
        />
      </div>

      <div className="fl-item__cell">
        <span className="fl-item__label">Total</span>

        <div className="fl-item__total">
          <span>${total}</span>
        </div>
      </div>

      <div className="fl-item__cell">
        <div className="fl-item__remove-empty"></div>
        <div
          className="fl-item__remove"
          onClick={() => dispatch(removeInvoiceListItem(id))}
        >
          <motion.img
            src={images.remove}
            alt="remove item"
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </div>
    </div>
  );
};
