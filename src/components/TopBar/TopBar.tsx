import useMobile from "../../hooks/useMobile";
import MobileSideMenu from "../MobileSideMenu/MobileSideMenu";
import UserDropdown from "../UserDropdown/UserDropdown";

const TopBar = () => {
  const isMobile = useMobile();
  return (
    <div className="flex justify-between items-center px-4 h-12 bg-white shadow-md">
      {isMobile && <MobileSideMenu />}
      <div className="flex w-full justify-end">
        <UserDropdown />
      </div>
    </div>
  );
};

export default TopBar;
