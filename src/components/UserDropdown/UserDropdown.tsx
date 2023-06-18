import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import userPlaceholderImage from '../../assets/images/user-placeholder.jpg';
import { routePaths } from '../../constants';

const UserDropdown = () => {
  const { auth } = supabase;

  const user = useAuth()?.session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  useDetectOutsideClick(dropdownContainerRef, handleCloseDropdown);

  return (
    <div ref={dropdownContainerRef} className="relative">
      <img
        src={userPlaceholderImage}
        alt="User's profile photo"
        className="h-9 w-9 rounded-full"
        onClick={handleToggleDropdown}
      />
      {isOpen && (
        <div className="absolute top-10 right-0 z-10 flex w-40 flex-col gap-2 rounded-lg bg-white p-2 shadow-primary">
          <Link to={`${routePaths.profiles}/${user?.id}`}>{user?.user_metadata.full_name}</Link>
          <span onClick={handleLogout}>Log out</span>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
