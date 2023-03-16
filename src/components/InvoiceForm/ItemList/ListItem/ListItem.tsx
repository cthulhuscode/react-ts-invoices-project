import { motion } from "framer-motion";

import { images } from "../../../../constants";
import type { InvoiceListItem } from "../../../../interfaces";
import "./ListItem.scss";

interface ListItemProps {
  item: InvoiceListItem;
}

export const ListItem = ({ item }: ListItemProps) => {
  const { name, amount, price, total } = item;

  return (
    <div className="fl-item">
      <input
        value={name}
        className="fl-item__cell fl-item__input"
        type="text"
        name="itemName"
        id="itemName"
      />
      <input
        value={amount}
        className="fl-item__cell fl-item__input fl-item__input-qty"
        type="number"
        name="itemQty"
        id="itemQty"
        min={1}
        placeholder="1"
      />
      <input
        value={price}
        className="fl-item__cell fl-item__input fl-item__input-price"
        type="number"
        name="itemPrice"
        id="itemPrice"
        placeholder="0.00"
        min={1}
      />
      <span className="fl-item__cell fl-item__total">${total}</span>

      <div className="fl-item__cell">
        <motion.img
          className="fl-item__remove"
          src={images.remove}
          alt="remove item"
          whileTap={{ scale: 0.95 }}
        />
      </div>
    </div>
  );
};
