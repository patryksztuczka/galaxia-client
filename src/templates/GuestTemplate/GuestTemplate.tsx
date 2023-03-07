import { Outlet } from "react-router-dom";

import guestTemplateImage from "../../assets/images/guest-template-image.png";

const GuestTemplate = () => {
  return (
    <div className="flex w-screen h-screen justify-between">
      <div className="flex justify-center items-center w-full py-12 px-16">
        <Outlet />
      </div>
      <img src={guestTemplateImage} alt="guest-template" />
    </div>
  );
};

export default GuestTemplate;
