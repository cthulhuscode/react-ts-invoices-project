import { motion } from "framer-motion";

import { images } from "../../../../constants";
import type { InvoiceListItem } from "../../../../interfaces";
import "./ListItem.scss";

interface ListItemProps {
  item: InvoiceListItem;
  showLabel: boolean;
}

export const ListItem = ({ item, showLabel }: ListItemProps) => {
  const { name, amount, price, total } = item;

  return (
    <div className="fl-item">
      <div className="fl-item__cell fl-item__cell-name">
        <span className="fl-item__label">Item Name</span>
        <input
          value={name}
          className="fl-item__input"
          type="text"
          name="itemName"
          id="itemName"
          readOnly={true}
        />
      </div>

      <div className="fl-item__cell">
        <span className="fl-item__label">Qty.</span>

        <input
          value={amount}
          className="fl-item__input fl-item__input-qty"
          type="number"
          name="itemQty"
          id="itemQty"
          min={1}
          placeholder="1"
          readOnly={true}
        />
      </div>

      <div className="fl-item__cell">
        <span className="fl-item__label">Price</span>
        <input
          value={price}
          className="fl-item__input fl-item__input-price"
          type="number"
          name="itemPrice"
          id="itemPrice"
          placeholder="0.00"
          min={1}
          readOnly={true}
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
