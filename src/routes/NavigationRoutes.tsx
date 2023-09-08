import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { GuestRoute, PrivateRoute } from '../auth';
import { routePaths } from '../constants';
import GuestTemplate from '../templates/GuestTemplate/GuestTemplate';
import PrivateTemplate from '../templates/PrivateTemplate/PrivateTemplate';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import HomePage from '../pages/HomePage/HomePage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import EventPage from '../pages/EventPage/EventPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import CreateEventPage from '../pages/CreateEventPage/CreateEventPage';
import EditEventPage from '../pages/EditEventPage/EditEventPage';
import FilteredEventsPage from '../pages/FilteredEventsPage/FilteredEventsPage';

const NavigationRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          // Private pages
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateTemplate />}>
              <Route path={routePaths.home} element={<HomePage />} />
              <Route path={routePaths.event} element={<EventPage />} />
              <Route path={routePaths.eventsByCategory} element={<FilteredEventsPage />} />
              <Route path={routePaths.createEvent} element={<CreateEventPage />} />
              <Route path={routePaths.editEvent} element={<EditEventPage />} />
              <Route path={routePaths.profile} element={<ProfilePage />} />
              <Route path={routePaths.settings} element={<SettingsPage />} />
            </Route>
          </Route>
          // Guest pages
          <Route element={<GuestRoute />}>
            <Route element={<GuestTemplate />}>
              <Route path={routePaths.login} element={<LoginPage />} />
              <Route path={routePaths.signup} element={<SignupPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default NavigationRoutes;
