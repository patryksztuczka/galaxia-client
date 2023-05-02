export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Event: {
        Row: {
          author: string;
          created_at: string;
          description: string | null;
          end_datetime: string;
          id: string;
          image: string | null;
          name: string;
          start_datetime: string;
        };
        Insert: {
          author: string;
          created_at?: string;
          description?: string | null;
          end_datetime: string;
          id?: string;
          image?: string | null;
          name: string;
          start_datetime: string;
        };
        Update: {
          author?: string;
          created_at?: string;
          description?: string | null;
          end_datetime?: string;
          id?: string;
          image?: string | null;
          name?: string;
          start_datetime?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
