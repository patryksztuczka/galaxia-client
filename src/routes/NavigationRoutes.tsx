import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { routePaths } from "../constants";
import LoginPage from "../pages/LoginPage/LoginPage";
import GuestTemplate from "../templates/GuestTemplate/GuestTemplate";
import SignupPage from "../pages/SignupPage/SignupPage";

const NavigationRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          // Private pages
          {/* <Route element={<PrivateRoute />}>
            <Route element={<PrivateTemplate />}>
              <Route path={routePaths.home} element={<HomePage />} />
            </Route>
          </Route> */}
          // Guest pages
          <Route element={<GuestTemplate />}>
            <Route path={routePaths.login} element={<LoginPage />} />
            <Route path={routePaths.signup} element={<SignupPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default NavigationRoutes;
