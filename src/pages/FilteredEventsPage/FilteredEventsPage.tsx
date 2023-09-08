import { useEffect } from 'react';

import { useBoundStore } from '../../zustand/store';
import EventCard from '../../components/EventCard/EventCard';

const FilteredEventsPage = () => {
  const category = window.location.pathname.split('/').pop();

  const filteredEvents = useBoundStore((state) => state.filteredEvents);

  const getEventsByCategory = useBoundStore((state) => state.getEventsByCategory);

  useEffect(() => {
    if (category) {
      getEventsByCategory(category);
    }
  }, []);

  return (
    <div>
      <h2 className="px-4 pt-4 text-lg font-semibold capitalize">{category} events</h2>
      <div className="flex w-full gap-4 overflow-visible overflow-x-auto p-4">
        {filteredEvents?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default FilteredEventsPage;
