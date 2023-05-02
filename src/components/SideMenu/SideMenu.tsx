import { Link } from 'react-router-dom';

import { menuItems } from '../../constants';

const SideMenu = () => {
  return (
    <div className="flex w-72 flex-col gap-2 rounded-lg bg-white p-4">
      {menuItems.map((item) => (
        <Link key={item.route} to={item.route} className="font-medium">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
