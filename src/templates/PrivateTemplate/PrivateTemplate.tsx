import { Outlet } from "react-router-dom";

const PrivateTemplate = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateTemplate;
