import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { InvoicesList } from "../../components";
import { images } from "../../constants";
import "./HomePage.scss";

export const HomePage = () => {
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
              ? `${5} invoices`
              : `There are ${5} pending invoices`}
          </p>
        </div>

        <div className="header__controls">
          <div className="header__filter">
            {windowWidth < 570 ? `Filter` : `Filter by status`}
          </div>
          <motion.button className="header__btn" whileTap={{ scale: 0.95 }}>
            <img
              className="header-btn__circle"
              src={images.addNewInvoiceCircle}
              alt="Add new invoice"
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
