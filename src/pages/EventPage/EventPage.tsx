import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';

import { useBoundStore } from '../../zustand/store';
import { Link } from 'react-router-dom';
import { routePaths } from '../../constants';
import { supabase } from '../../supabaseClient';
import noImagePlaceholder from '../../assets/images/no-image-placeholder.jpg';
import ClockIcon from '../../assets/icons/ClockIcon';
import UserIcon from '../../assets/icons/UserIcon';
import Button from '../../components/Button/Button';
import userImagePlaceholder from '../../assets/images/user-placeholder.jpg';
import Spinner from '../../components/Spinner/Spinner';

const EventPage = () => {
  const user = useBoundStore((state) => state.user);

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
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-white p-4 md:rounded-lg">
        <Spinner />;
      </div>
    );
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
    <div className="relative flex h-full flex-col gap-2 pt-4 md:rounded-lg">
      <img
        src={event?.image || noImagePlaceholder}
        className="md:max-h-px-2 max-h-56 w-full object-cover md:select-none md:rounded-t-lg"
      />
      <main className="flex flex-col gap-4 overflow-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">{event?.name}</h1>
          {event.author.id === user?.id && (
            <Link
              to={`${routePaths.events}/edit/${event.id}`}
              type="button"
              className="h-10 w-fit rounded-lg bg-green-600 p-2 font-medium text-white"
            >
              Edit event
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <ClockIcon className="fill-slate-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">
              {format(parseISO(event?.start_datetime), 'EEEE, do LLLL')}
            </h2>
            <h3>{format(parseISO(event?.start_datetime), 'K:mm a')}</h3>
            <h2 className="font-semibold">
              {format(parseISO(event?.end_datetime), 'EEEE, do LLLL')}
            </h2>
            <h3>{format(parseISO(event?.end_datetime), 'K:mm a')}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5">
            <UserIcon className="fill-slate-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">
              Hosted by{' '}
              <Link
                to={`${routePaths.profiles}/${event?.author.id}`}
                className="cursor-pointer font-bold hover:underline"
              >
                {event?.author.full_name}
              </Link>
            </h2>
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
              eventAttendees?.map((attendee: any) => {
                const { data } = supabase.storage
                  .from('avatars')
                  .getPublicUrl(attendee.attendee_id.avatar);
                return (
                  <img
                    key={attendee.attendee_id.id}
                    src={data.publicUrl || userImagePlaceholder}
                    title={attendee.attendee_id.full_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                );
              })
            )}
          </div>
        </div>
        <p className="mb-24 text-justify text-lg">{event?.description || 'No description...'}</p>
      </main>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-end bg-white p-4 shadow-primary md:absolute md:rounded-b-lg md:shadow-none">
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
