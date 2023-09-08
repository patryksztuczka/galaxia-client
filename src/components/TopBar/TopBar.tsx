import { Link } from 'react-router-dom';

import { routePaths } from '../../constants';
import useMobile from '../../hooks/useMobile';
import MobileSideMenu from '../MobileSideMenu/MobileSideMenu';
import UserDropdown from '../UserDropdown/UserDropdown';
import PlusIcon from '../../assets/icons/PlusIcon';

const TopBar = () => {
  const isMobile = useMobile();
  return (
    <div className="flex h-12 items-center justify-between bg-white px-4 shadow-md">
      {isMobile && <MobileSideMenu />}
      {!isMobile && <div className="flex w-full gap-4 text-2xl font-bold">🌠 Galaxia</div>}
      <div className="flex w-full items-center justify-end gap-5">
        <Link
          to={routePaths.createEvent}
          className="flex cursor-pointer gap-1 px-2 font-semibold text-green-600"
        >
          <div className="flex items-center">
            <PlusIcon />
          </div>
          Create event
        </Link>
        <UserDropdown />
      </div>
    </div>
  );
};

export default TopBar;
