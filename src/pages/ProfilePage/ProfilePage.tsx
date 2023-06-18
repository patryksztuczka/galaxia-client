import { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useBoundStore } from '../../zustand/store';
import userPlaceholderImage from '../../assets/images/user-placeholder.jpg';
import EventCard from '../../components/EventCard/EventCard';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { routePaths } from '../../constants';

const ProfilePage = () => {
  const authUser = useAuth()?.session?.user;

  const user = useBoundStore((state) => state.user);

  const userAttendingEvents = useBoundStore((state) => state.userAttendingEvents);

  const userHostingEvents = useBoundStore((state) => state.userHostingEvents);

  const getUserById = useBoundStore((state) => state.getUserById);

  const getUserAttendingEvents = useBoundStore((state) => state.getUserAttendingEvents);

  const getUserHostingEvents = useBoundStore((state) => state.getUserHostingEvents);

  const getUserByIdStatus = useBoundStore((state) => state.getUserByIdStatus);

  useEffect(() => {
    if (window.location.pathname) {
      const userId = window.location.pathname.split('/')[2];
      getUserById(userId);
      getUserAttendingEvents(userId);
      getUserHostingEvents(userId);
    }
  }, [window.location.pathname]);

  if (user === undefined || getUserByIdStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col bg-white md:rounded-lg">
      <div className="relative flex h-10 w-full bg-purple-900 md:h-16 md:rounded-t-lg">
        <img
          src={user.avatar_url || userPlaceholderImage}
          alt="User's profile photo"
          className="absolute left-4 top-3 h-14 w-14 rounded-full border-4 border-purple-900 md:h-28 md:w-28"
        />
      </div>
      <div className={clsx('flex justify-end px-4 pt-10', user.id === authUser?.id && 'pt-2')}>
        {user.id === authUser?.id && (
          <Link
            to={routePaths.settings}
            type="button"
            className="h-10 w-fit rounded-lg bg-purple-300 p-2 font-medium text-white"
          >
            Edit profile
          </Link>
        )}
      </div>
      <div className="overflow-auto px-4 md:mt-6">
        <h1 className="pb-4 text-xl font-bold md:text-3xl">{user.full_name}</h1>
        <div>
          <span className="text-lg font-bold">Events you are attending:</span>
          <div className="flex flex-col gap-4 pt-4">
            {userAttendingEvents?.map(({ event_id }: any) => (
              <EventCard key={event_id.id} event={event_id} profileCard />
            ))}
          </div>
        </div>
        <div className="pt-6">
          <span className="text-lg font-bold">Events you are hosting:</span>
          <div className="flex flex-col gap-4 pt-4">
            {userHostingEvents?.map((event: any) => (
              <EventCard key={event.id} event={event} profileCard />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
