import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { images } from "../../constants";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./StatusFilter.scss";
import { selectStatus, useAppDispatch, useAppSelector } from "../../redux";

interface StatusFilterProps {
  windowWidth: number;
}

export const StatusFilter = ({ windowWidth }: StatusFilterProps) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const filterOptions = useAppSelector(
    (state) => state.invoices.selectedStatuses
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptionsClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(selectStatus({ key: e.target.name, value: e.target.checked }));
  };

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
              name="Draft"
              id="Draft"
              onChange={handleCheckboxClick}
              checked={filterOptions.Draft}
            />
            <label className="options-list__item-text" htmlFor="Draft">
              Draft
            </label>
          </li>
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="Pending"
              id="Pending"
              onChange={handleCheckboxClick}
              checked={filterOptions.Pending}
            />
            <label className="options-list__item-text" htmlFor="Pending">
              Pending
            </label>
          </li>
          <li className="options-list__item item">
            <input
              className="options-list__item-control"
              type="checkbox"
              name="Paid"
              id="Paid"
              onChange={handleCheckboxClick}
              checked={filterOptions.Paid}
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
