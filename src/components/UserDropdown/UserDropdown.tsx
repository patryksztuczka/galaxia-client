import { useState, useRef } from "react";

import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import userPlaceholderImage from "../../assets/images/user-placeholder.jpg";

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
        <div className="absolute flex flex-col gap-2 bg-white shadow-primary top-10 p-2 w-40 right-0 rounded-lg">
          <span>{`${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`}</span>
          <span onClick={handleLogout}>Log out</span>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
