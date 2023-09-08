import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

import { IEventCardProps } from './EventCard.types';
import { routePaths } from '../../constants';

const EventCard = ({ event }: IEventCardProps) => {
  return (
    <div
      className={clsx(
        'relative flex w-80 min-w-[320px] flex-1 flex-col justify-center rounded-lg p-2 shadow-card',
      )}
    >
      {new Date(event.end_datetime) < new Date() && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg bg-black/70 backdrop-blur-sm">
          <span className="text-xl font-semibold text-white">Passed.</span>
        </div>
      )}
      <div className="relative">
        <span className="absolute top-4 right-4 text-2xl font-bold tracking-wide text-white">
          #{event.category}
        </span>
        <img src={event.image || ''} className="aspect-square rounded-lg object-cover" />
      </div>
      <Link
        to={`${routePaths.events}/${event.id}`}
        className="pb-2 pt-1 text-2xl font-bold hover:underline"
      >
        {event.name}
      </Link>
      <div className="flex gap-2 pb-3">
        <span className="flex font-semibold">Start:</span>
        <div>
          <h2 className="font-medium">
            {format(parseISO(event?.start_datetime), 'EEEE, do LLLL')}
          </h2>
          <h3>{format(parseISO(event?.start_datetime), 'K:mm a')}</h3>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="flex font-semibold">End: </span>
        <div>
          <h2 className="font-medium">{format(parseISO(event?.end_datetime), 'EEEE, do LLLL')}</h2>
          <h3>{format(parseISO(event?.end_datetime), 'K:mm a')}</h3>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
