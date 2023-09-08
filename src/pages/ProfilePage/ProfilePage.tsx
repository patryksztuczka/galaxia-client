import { useEffect, useState } from 'react';

import { useBoundStore } from '../../zustand/store';
import userPlaceholderImage from '../../assets/images/user-placeholder.jpg';
import EventCard from '../../components/EventCard/EventCard';
import Spinner from '../../components/Spinner/Spinner';

const ProfilePage = () => {
  const [isImageError, setIsImageError] = useState(false);

  const user = useBoundStore((state) => state.user);

  const userAttendingEvents = useBoundStore((state) => state.userAttendingEvents);

  const userHostingEvents = useBoundStore((state) => state.userHostingEvents);

  const getUserAttendingEvents = useBoundStore((state) => state.getUserAttendingEvents);

  const getUserHostingEvents = useBoundStore((state) => state.getUserHostingEvents);

  const getUserByIdStatus = useBoundStore((state) => state.getUserByIdStatus);

  useEffect(() => {
    if (user && user.id) {
      getUserAttendingEvents(user.id);
      getUserHostingEvents(user.id);
    }
  }, []);

  if (user === undefined || getUserByIdStatus) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 md:rounded-lg">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-visible md:rounded-lg">
      <div className="relative flex h-10 w-full bg-green-500 md:h-16 md:rounded-t-lg">
        <img
          src={isImageError ? userPlaceholderImage : user.avatar || undefined}
          alt="User's profile photo"
          className="absolute left-4 top-3 h-14 w-14 rounded-full border-4 border-green-500 object-cover md:h-28 md:w-28"
          onError={() => setIsImageError(true)}
        />
      </div>
      <div className="mt-10 overflow-visible">
        <h1 className="px-4 pb-4 text-xl font-bold md:text-3xl">{user.full_name}</h1>
        <p className="px-4 pb-1 font-medium">Bio</p>
        <p className="border-b border-green-200 px-4 pb-4">{user.bio}</p>
        <div className="overflow-visible">
          <h2 className="pl-4 pt-4 font-semibold">Hosted events:</h2>
          <div className="flex w-full gap-4 overflow-visible overflow-x-auto p-4">
            {userHostingEvents?.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
        {/* <div>
          <h2 className="pl-4 font-semibold">Events you are attending:</h2>
          <div className="flex flex-col gap-4 pt-4">
            {userAttendingEvents?.map(({ event_id }: any) => (
              <EventCard key={event_id.id} event={event_id} />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
