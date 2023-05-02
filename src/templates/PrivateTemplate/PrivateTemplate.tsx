import { Outlet } from 'react-router-dom';

import SideMenu from '../../components/SideMenu/SideMenu';
import TopBar from '../../components/TopBar/TopBar';
import useMobile from '../../hooks/useMobile';

const PrivateTemplate = () => {
  const isMobile = useMobile();
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-100">
      <TopBar />
      <div className="flex h-[calc(100vh-48px)] w-full pt-4 md:justify-center md:p-4">
        <div className="flex w-full md:max-w-5xl md:justify-center md:gap-4">
          {!isMobile && <SideMenu />}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateTemplate;
