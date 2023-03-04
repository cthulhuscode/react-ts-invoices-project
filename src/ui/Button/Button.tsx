import { motion } from "framer-motion";
import "./Button.scss";

interface ButtonProps {
  variant: string;
  children: any;
  classes: string;
}

export const Button = ({ variant, children, classes }: ButtonProps) => {
  return (
    <motion.button
      className={`btn${classes} btn__${variant}`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};
