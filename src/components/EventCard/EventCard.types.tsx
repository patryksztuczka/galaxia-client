import { Database } from "../../types/supabase";

export interface IEventCardProps {
  event: Database["public"]["Tables"]["Event"]["Row"];
}
