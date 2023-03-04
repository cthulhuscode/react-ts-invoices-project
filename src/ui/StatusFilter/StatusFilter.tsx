import { motion } from "framer-motion";
import { useState } from "react";
import { images } from "../../constants";
import "./StatusFilter.scss";

interface StatusFilterProps {
  windowWidth: number;
}

export const StatusFilter = ({ windowWidth }: StatusFilterProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptionsClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  return (
    <div className="sfilter">
      <div className="sfilter__trigger">
        <h3 className="sfilter__text" onClick={handleShowOptionsClick}>
          {windowWidth < 570 ? `Filter` : `Filter by status`}
        </h3>
        <motion.img
          className="sfilter__img"
          src={images.filterArrow}
          alt="see filter options"
          onClick={handleShowOptionsClick}
          animate={{
            rotate: showOptions ? 180 : 0,
          }}
        />
      </div>

      <motion.div
        className="sfilter__options"
        style={{ display: `${showOptions ? "unset" : "none"}` }}
      >
        <ul className="sfilter__options-list options-list">
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="draft"
              id="draft"
            />
            <label className="options-list__item-text" htmlFor="draft">
              Draft
            </label>
          </li>
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="pending"
              id="pending"
            />
            <label className="options-list__item-text" htmlFor="pending">
              Pending
            </label>
          </li>
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="Paid"
              id="Paid"
            />
            <label className="options-list__item-text" htmlFor="Paid">
              Paid
            </label>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};