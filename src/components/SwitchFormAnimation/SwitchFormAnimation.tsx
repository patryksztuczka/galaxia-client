import { motion } from "framer-motion";

import { ISwitchFormAnimationProps } from "./SwitchFormAnimation.types";

const SwitchFormAnimation = ({ children }: ISwitchFormAnimationProps) => {
  const animations = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  };
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="flex w-full items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

export default SwitchFormAnimation;
