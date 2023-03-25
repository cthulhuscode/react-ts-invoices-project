import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { InvoicesList } from "../../components";
import { images } from "../../constants";
import { StatusFilter } from "../../ui";
import "./HomePage.scss";
import { useAppDispatch } from "../../redux/hooks";
import { toggleForm, useAppSelector } from "../../redux";
import { Statuses } from "../../interfaces";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const invoicesCount = useAppSelector(
    (state) =>
      state.invoices.list.filter(
        (invoice) => invoice.status === Statuses.pending
      ).length
  );

  const [windowWidth, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="home">
      <div className="home__header">
        <div className="header__texts">
          <h1 className="header__title">Invoices</h1>
          <p className="header__subtitle">
            {windowWidth < 570
              ? `${invoicesCount} invoices`
              : `There are ${invoicesCount} pending invoices`}
          </p>
        </div>

        <div className="header__controls">
          <StatusFilter windowWidth={windowWidth} />

          <motion.button
            onClick={() =>
              dispatch(toggleForm({ show: true, operation: "create" }))
            }
            className="header__btn"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              className="header-btn__circle"
              src={images.addNewInvoiceCircle}
              alt="Add new invoice"
              whileTap={{ rotate: 90 }}
            />
            <span className="header-btn__text">
              {windowWidth < 570 ? `New` : `New invoice`}
            </span>
          </motion.button>
        </div>
      </div>

      <InvoicesList />
    </div>
  );
};
