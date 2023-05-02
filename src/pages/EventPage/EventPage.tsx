import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';

import { useBoundStore } from '../../zustand/store';
import noImagePlaceholder from '../../assets/images/no-image-placeholder.jpg';
import ClockIcon from '../../assets/icons/ClockIcon';
import LocationPinIcon from '../../assets/icons/LocationPinIcon';
import UserIcon from '../../assets/icons/UserIcon';
import Button from '../../components/Button/Button';

const EventPage = () => {
  const getEventById = useBoundStore((state) => state.getEventById);
  const getEventByIdStatus = useBoundStore((state) => state.getEventByIdStatus);
  const event = useBoundStore((state) => state.event);

  useEffect(() => {
    if (window.location.pathname) {
      const eventId = window.location.pathname.split('/')[2];
      getEventById(eventId);
    }
  }, [window.location.pathname]);

  if (event === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex h-full flex-col gap-2 bg-white md:rounded-lg">
      <img
        src={event?.image || noImagePlaceholder}
        className="max-h-56 w-full md:max-h-72 md:select-none md:rounded-t-lg"
      />
      <main className="flex flex-col gap-4 px-4">
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
            <h2 className="font-semibold">Hosted by {event?.author}</h2>
          </div>
        </div>
        <p className="mb-24 pt-6 text-justify text-lg">
          {event?.description || 'No description...'}
        </p>
      </main>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-between bg-white p-4 shadow-primary md:absolute md:rounded-b-lg md:shadow-none">
        <span className="text-lg font-semibold">FREE</span>
        <div className="w-44">
          <Button
            type="button"
            text="Attend"
            isLoading={false}
            onClick={() => console.log('attend')}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
