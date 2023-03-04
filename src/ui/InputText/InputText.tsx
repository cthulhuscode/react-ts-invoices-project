import { motion } from "framer-motion";
import "./InputText.scss";

interface InputNumberProps {
  variant: string;
  children: any;
  classes: string;
}

export const Button = ({ variant, children, classes }: InputNumberProps) => {
  return (
    <motion.input
      className={`inputT${classes} inputT__${variant}`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.input>
  );
};
