import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '../../supabaseClient';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import userPlaceholderImage from '../../assets/images/user-placeholder.jpg';
import { routePaths } from '../../constants';
import { useBoundStore } from '../../zustand/store';

const UserDropdown = () => {
  const { auth } = supabase;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const user = useBoundStore((state) => state.user);

  const clearUser = useBoundStore((state) => state.clearUser);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    clearUser();
  };

  useDetectOutsideClick(dropdownContainerRef, handleCloseDropdown);

  return (
    <div ref={dropdownContainerRef} className="relative cursor-pointer">
      <img
        src={user?.avatar || userPlaceholderImage}
        alt="User's profile photo"
        className="border- h-9 w-9 rounded-full border-green-200 object-cover"
        onClick={handleToggleDropdown}
      />
      {isOpen && (
        <div className="absolute top-10 right-0 z-10 flex w-40 flex-col justify-end gap-2 rounded-lg bg-white p-2 shadow-primary">
          <Link to={`${routePaths.profiles}/${user?.id}`} className="font-bold">
            {user?.full_name}
          </Link>
          <Link to={routePaths.settings} className="border-y border-green-200 py-2">
            Settings
          </Link>
          <span onClick={handleLogout} className="font-semibold">
            Log out
          </span>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
