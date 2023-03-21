import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { addNewInvoiceListItem } from "../../../redux";
import "./ItemList.scss";
import { ListItem } from "./ListItem/ListItem";

export const ItemList = () => {
  const dispatch = useAppDispatch();
  const itemList = useAppSelector((state) => {
    const itemList = state.invoices.currentInvoice?.itemList;
    if (itemList !== undefined) return Object.entries(itemList);
    else return null;
  });

  const handleAddNewItemClick = () => {
    dispatch(addNewInvoiceListItem());
  };

  return (
    <div className="ilist">
      <h2 className="ilist__title">Item List</h2>
      <div className="ilist__table">
        {itemList !== null ? (
          itemList?.map(([id, item], index) => (
            <ListItem item={item} key={id} />
          ))
        ) : (
          <p>Please add at least one item</p>
        )}
      </div>
      <motion.button
        className="ilist__btn"
        whileTap={{ scale: 0.95 }}
        onClick={handleAddNewItemClick}
      >
        + Add New Item
      </motion.button>
    </div>
  );
};
