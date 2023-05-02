import { Link } from "react-router-dom";

import { IEventCardProps } from "./EventCard.types";
import { routePaths } from "../../constants";

const EventCard = ({ event }: IEventCardProps) => {
  return (
    <div className="h-32 bg-white p-2 rounded-lg">
      <Link to={`${routePaths.events}/${event.id}`}>{event.name}</Link>
    </div>
  );
};

export default EventCard;
