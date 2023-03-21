import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";

import { images } from "../../../../constants";
import { useAppDispatch } from "../../../../hooks/redux";
import type { InvoiceListItem } from "../../../../interfaces";
import { editInvoiceListItem } from "../../../../redux";
import "./ListItem.scss";

interface ListItemProps {
  item: InvoiceListItem;
}

export const ListItem = ({ item }: ListItemProps) => {
  const dispatch = useAppDispatch();
  const { id, name, amount, price, total } = item;
  const [_item, _setItem] = useState<InvoiceListItem>({
    id,
    name,
    amount,
    price,
    total,
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let value: string | number = target.value;
    let total = 0;

    if (target.name === "price") {
      value = parseFloat(value);
      total = value * _item.amount;

      _setItem({
        ..._item,
        [target.name]: parseFloat(target.value),
        total: total >= 0 ? total : 0,
      });
    } else if (target.name === "amount") {
      value = parseInt(value);
      total = value * _item.price;

      _setItem({
        ..._item,
        [target.name]: parseInt(target.value),
        total: total >= 0 ? total : 0,
      });
    } else
      _setItem({
        ..._item,
        [target.name]: target.value,
      });

    const editedItem = { ..._item, [target.name]: value, total };
    dispatch(editInvoiceListItem(editedItem));
  };

  return (
    <div className="fl-item">
      <div className="fl-item__cell fl-item__cell-name">
        <span className="fl-item__label">Item Name</span>
        <input
          value={_item.name}
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
          value={_item.amount}
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
          value={_item.price}
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
          <span>${_item.total}</span>
        </div>
      </div>

      <div className="fl-item__cell">
        <div className="fl-item__remove-empty"></div>
        <div className="fl-item__remove">
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
