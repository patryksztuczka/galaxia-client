import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import HamburgerIcon from "../../assets/icons/HamburgerIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { menuItems } from "../../constants";

const MobileSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const handleOpenSideMenu = () => {
    setIsOpen(true);
  };

  const handleCloseSideMenu = () => {
    setIsOpen(false);
  };

  useDetectOutsideClick(menuRef, handleCloseSideMenu);

  return (
    <div>
      <div className="w-6 h-6" onClick={handleOpenSideMenu}>
        <HamburgerIcon />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute top-0 left-0 bg-black w-screen h-screen bg-opacity-25 z-10"
          >
            <motion.div
              ref={menuRef}
              key="menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 bg-white w-48 h-screen p-3"
            >
              <div className="flex justify-end">
                <div className="w-6 h-6" onClick={handleCloseSideMenu}>
                  <CloseIcon />
                </div>
              </div>
              {menuItems.map((item) => (
                <Link key={item.route} to={item.route} className="font-medium">
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSideMenu;
