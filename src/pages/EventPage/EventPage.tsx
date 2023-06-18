import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';

import { useBoundStore } from '../../zustand/store';
import noImagePlaceholder from '../../assets/images/no-image-placeholder.jpg';
import ClockIcon from '../../assets/icons/ClockIcon';
import LocationPinIcon from '../../assets/icons/LocationPinIcon';
import UserIcon from '../../assets/icons/UserIcon';
import Button from '../../components/Button/Button';
import userImagePlaceholder from '../../assets/images/user-placeholder.jpg';
import { useAuth } from '../../context/AuthContext/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

const EventPage = () => {
  const user = useAuth()?.session?.user;

  const getEventById = useBoundStore((state) => state.getEventById);

  const getEventAttendees = useBoundStore((state) => state.getEventAttendees);

  const attendEvent = useBoundStore((state) => state.attendEvent);

  const resignFromEvent = useBoundStore((state) => state.resignFromEvent);

  const event = useBoundStore((state) => state.event);

  const eventAttendees = useBoundStore((state) => state.eventAttendees);

  const getEventAttendeesStatus = useBoundStore((state) => state.getEventAttendeesStatus);

  const getEventByIdStatus = useBoundStore((state) => state.getEventByIdStatus);

  const attendEventStatus = useBoundStore((state) => state.attendEventStatus);

  const resignFromEventStatus = useBoundStore((state) => state.resignFromEventStatus);

  useEffect(() => {
    if (window.location.pathname) {
      const eventId = window.location.pathname.split('/')[2];
      getEventById(eventId);
      getEventAttendees(eventId);
    }
  }, [window.location.pathname]);

  if (event === undefined || getEventByIdStatus) {
    return <div>Loading...</div>;
  }

  const isUserAttending = eventAttendees?.find(
    (attendee: any) => attendee.attendee_id.id === user?.id,
  );

  const handleAttendEvent = () => {
    if (!user || !event) return;
    if (isUserAttending) {
      resignFromEvent(event.id, user.id);
    } else {
      attendEvent(event.id, user.id);
    }
  };

  return (
    <div className="relative flex h-full flex-col gap-2 bg-white md:rounded-lg">
      <img
        src={event?.image || noImagePlaceholder}
        className="max-h-56 w-full md:max-h-72 md:select-none md:rounded-t-lg"
      />
      <main className="flex flex-col gap-4 overflow-auto px-4">
        <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">{event?.name}</h1>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <ClockIcon className="fill-slate-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">
              {format(parseISO(event?.start_datetime), 'EEEE, do LLLL')}
            </h2>
            <h3>
              {format(parseISO(event?.start_datetime), 'K:mm a')} -{' '}
              {format(parseISO(event?.end_datetime), 'K:mm a')}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <LocationPinIcon className="fill-slate-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">No location...</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <UserIcon className="fill-slate-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">Hosted by {event?.author.full_name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="font-semibold">{`Attendees: ${eventAttendees?.length}`}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {getEventAttendeesStatus ? (
              <Spinner />
            ) : (
              eventAttendees?.map((attendee: any) => (
                <img
                  key={attendee.attendee_id.id}
                  src={attendee.attendee_id.avatar_url || userImagePlaceholder}
                  title={attendee.attendee_id.full_name}
                  className="h-10 w-10 rounded-full"
                />
              ))
            )}
          </div>
        </div>
        <p className="mb-24 pt-2 text-justify text-lg">
          {event?.description || 'No description...'}
        </p>
      </main>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-between bg-white p-4 shadow-primary md:absolute md:rounded-b-lg md:shadow-none">
        <span className="text-lg font-semibold">FREE</span>
        <div className="flex w-44 gap-2">
          <Button
            type="button"
            text={isUserAttending ? 'Attending' : 'Attend'}
            isLoading={attendEventStatus || resignFromEventStatus}
            onClick={handleAttendEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
