import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { images } from "../../constants";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./StatusFilter.scss";

interface StatusFilterProps {
  windowWidth: number;
}

export const StatusFilter = ({ windowWidth }: StatusFilterProps) => {
  const ref = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    draft: false,
    pending: false,
    paid: true,
  });

  const handleShowOptionsClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, [e.target.id]: e.target.checked });
  };

  useMemo(() => handleCheckboxClick, [filterOptions]);

  useOnClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <div className="sfilter" ref={ref}>
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
              onChange={handleCheckboxClick}
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
              onChange={handleCheckboxClick}
            />
            <label className="options-list__item-text" htmlFor="pending">
              Pending
            </label>
          </li>
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="paid"
              id="paid"
              onChange={handleCheckboxClick}
              checked={filterOptions.paid}
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
