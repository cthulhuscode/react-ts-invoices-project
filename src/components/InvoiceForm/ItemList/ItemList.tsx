import { motion } from "framer-motion";
import type { InvoiceListItem } from "../../../interfaces";
import "./ItemList.scss";
import { ListItem } from "./ListItem/ListItem";

export const ItemList = () => {
  const itemList: InvoiceListItem[] = [
    {
      id: "xdfrf",
      name: "Headphones",
      amount: 2,
      price: 200,
      total: 400,
    },
    {
      id: "ertg",
      name: "Book",
      amount: 2,
      price: 20,
      total: 40,
    },
  ];

  return (
    <div className="ilist">
      <h2 className="ilist__title">Item List</h2>
      <div className="ilist__table">
        {itemList.map((item, index) => (
          <ListItem item={item} key={item.id} showLabel={false} />
        ))}
      </div>
      <motion.button className="ilist__btn" whileTap={{ scale: 0.95 }}>
        + Add New Item
      </motion.button>
    </div>
  );
};
