import { motion } from "framer-motion";
import "./InputNumber.scss";

interface InputNumberProps {
  variant: string;
  children: any;
  classes: string;
}

export const InputNumber = ({
  variant,
  children,
  classes,
}: InputNumberProps) => {
  return (
    <motion.input
      className={`inputN${classes} inputN__${variant}`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.input>
  );
};
