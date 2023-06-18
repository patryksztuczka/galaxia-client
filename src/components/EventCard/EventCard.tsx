import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

import { IEventCardProps } from './EventCard.types';
import { routePaths } from '../../constants';

const EventCard = ({ event, profileCard }: IEventCardProps) => {
  return (
    <div
      className={clsx(
        'flex h-32 flex-1 flex-col gap-2 bg-white p-2 md:rounded-lg',
        profileCard && 'bg-slate-50',
      )}
    >
      <Link to={`${routePaths.events}/${event.id}`} className="text-xl font-bold hover:underline">
        {event.name}
      </Link>
      <h2 className="font-medium">{format(parseISO(event?.start_datetime), 'EEEE, do LLLL')}</h2>
      <h3>
        {format(parseISO(event?.start_datetime), 'K:mm a')} -{' '}
        {format(parseISO(event?.end_datetime), 'K:mm a')}
      </h3>
      <p className="max-w-2xl truncate pt-2">{event.description}</p>
    </div>
  );
};

export default EventCard;
