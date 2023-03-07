import { useEffect, useState } from "react";

import { BREAKPOINTS } from "../constants";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= BREAKPOINTS.mobile);
  };

  useEffect(() => {
    handleWindowSizeChange();

    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return isMobile;
};

export default useMobile;
