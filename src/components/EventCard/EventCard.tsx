import { IEventCardProps } from "./EventCard.types";

const EventCard = ({ event }: IEventCardProps) => {
  return <div className="h-32 bg-white p-2 rounded-lg">{event.name}</div>;
};

export default EventCard;
