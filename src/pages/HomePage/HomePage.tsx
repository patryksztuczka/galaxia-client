import { useEffect } from "react";

import { useBoundStore } from "../../zustand/store";
import EventCard from "../../components/EventCard/EventCard";

const HomePage = () => {
  const getEvents = useBoundStore((state) => state.getEvents);
  const events = useBoundStore((state) => state.events);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default HomePage;
