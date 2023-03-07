import { Outlet } from "react-router-dom";

import guestTemplateImage from "../../assets/images/guest-template-image.png";
import useMobile from "../../hooks/useMobile";

const GuestTemplate = () => {
  const isMobile = useMobile();
  return (
    <div className="flex w-screen min-h-screen md:h-screen justify-between overflow-hidden">
      <div className="flex justify-center md:min-w-[600px] items-center w-full p-10 md:py-12 md:px-16">
        <Outlet />
      </div>
      {!isMobile && (
        <img src={guestTemplateImage} alt="guest-template" className="z-10" />
      )}
    </div>
  );
};

export default GuestTemplate;
