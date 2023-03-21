import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { PaymentTerms } from "../../interfaces";

import { images } from "../../constants";
import { paymentTerms } from "../../interfaces";

import "./Select.scss";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface SelectProps {
  label: string;
  setSelectedOption: (paymentTerms: PaymentTerms) => void;
}

export const Select = ({ label, setSelectedOption }: SelectProps) => {
  const ref = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [_selectedOption, _setSelectedOption] = useState<PaymentTerms>(
    paymentTerms[0]
  );

  useOnClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <div
      className="select"
      id={label}
      ref={ref}
      onClick={() => {
        setShowOptions((prevState) => !prevState);
      }}
    >
      <label className="select__label" htmlFor={label}>
        {label}
      </label>

      <div className="select__control">
        <span className="select__selected">{_selectedOption.desc}</span>
        <motion.img
          className="select__img"
          src={images.rightArrow}
          alt="open"
          animate={{
            rotate: showOptions ? 180 : 0,
          }}
        />
      </div>

      <ul
        className="select__list"
        style={{ display: showOptions ? "unset" : "none" }}
      >
        {paymentTerms.map((pTerm) => (
          <li
            className="select__item"
            key={pTerm.value}
            value={pTerm.desc}
            onClick={() => {
              const payTerm = {
                desc: pTerm.desc,
                value: pTerm.value,
              };

              setSelectedOption(payTerm as PaymentTerms);
              _setSelectedOption(payTerm as PaymentTerms);
            }}
          >
            {pTerm.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};
