import { motion } from "framer-motion";
import "./ItemList.scss";
import { ListItem } from "./ListItem/ListItem";

export const ItemList = () => {
  return (
    <div className="ilist">
      <h2 className="ilist__title">Item List</h2>
      <div className="ilist__table table">
        <div className="table__columns">
          <span className="table__column-text">Item Name</span>
          <span className="table__column-text">Qty.</span>
          <span className="table__column-text">Price</span>
          <span className="table__column-text">Total</span>
        </div>

        <ListItem />
        <ListItem />
      </div>
      <motion.button className="ilist__btn" whileTap={{ scale: 0.95 }}>
        + Add New Item
      </motion.button>
    </div>
  );
};
