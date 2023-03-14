import { motion } from "framer-motion";

import { images } from "../../../../constants";
import "./ListItem.scss";

export const ListItem = () => {
  return (
    <div className="fl-item">
      <input
        className="fl-item__cell fl-item__input"
        type="text"
        name="itemName"
        id="itemName"
      />
      <input
        className="fl-item__cell fl-item__input fl-item__input-qty"
        type="number"
        name="itemQty"
        id="itemQty"
        min={1}
        placeholder="1"
      />
      <input
        className="fl-item__cell fl-item__input fl-item__input-price"
        type="number"
        name="itemPrice"
        id="itemPrice"
        placeholder="0.00"
        min={1}
      />
      <span className="fl-item__cell fl-item__total">$156.00</span>

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
