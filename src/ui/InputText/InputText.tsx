import { motion } from "framer-motion";
import "./InputText.scss";

interface InputTextProps {
  variant: string;
  children: any;
  classes: string;
}

export const InputText = ({ variant, children, classes }: InputTextProps) => {
  return (
    <motion.input
      className={`inputT${classes} inputT__${variant}`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.input>
  );
};
