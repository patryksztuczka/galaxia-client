import { useEffect } from 'react';

import { useBoundStore } from '../../zustand/store';
import EventCard from '../../components/EventCard/EventCard';
import { categories } from '../../constants';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const HomePage = () => {
  const getUpcomingEvents = useBoundStore((state) => state.getUpcomingEvents);

  const upcomingEvents = useBoundStore((state) => state.upcomingEvents);

  const getOngoingEvents = useBoundStore((state) => state.getOngoingEvents);

  const ongoingEvents = useBoundStore((state) => state.ongoingEvents);

  useEffect(() => {
    getUpcomingEvents();
    getOngoingEvents();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <h2 className="px-4 pt-4 text-lg font-semibold">Upcoming events</h2>
      <div className="flex w-full gap-4 overflow-visible overflow-x-auto p-4">
        {upcomingEvents?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <h2 className="px-4 pt-4 text-lg font-semibold">Categories</h2>
      <div>
        <div className="flex w-full gap-4 overflow-visible overflow-x-auto p-4">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </div>
      <h2 className="px-4 pt-4 text-lg font-semibold">Ongoing events</h2>
      <div className="flex w-full gap-4 overflow-visible overflow-x-auto p-4">
        {ongoingEvents?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
