import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import CloseIcon from '../../assets/icons/CloseIcon';
import { menuItems } from '../../constants';

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
      <div className="h-6 w-6" onClick={handleOpenSideMenu}>
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
            className="absolute top-0 left-0 z-10 h-screen w-screen bg-black bg-opacity-25"
          >
            <motion.div
              ref={menuRef}
              key="menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2 }}
              className="flex h-screen w-48 flex-col gap-4 bg-white p-3"
            >
              <div className="flex justify-between">
                <div className="flex w-full gap-4 text-lg font-bold">🌠 Galaxia</div>
                <div className="h-6 w-6" onClick={handleCloseSideMenu}>
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
