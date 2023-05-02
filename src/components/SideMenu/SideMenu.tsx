import { Link } from "react-router-dom";

import { menuItems } from "../../constants";

const SideMenu = () => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg w-72 bg-white">
      {menuItems.map((item) => (
        <Link key={item.route} to={item.route} className="font-medium">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
