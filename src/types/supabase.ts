export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Events: {
        Row: {
          author: string
          category: string | null
          created_at: string
          description: string | null
          end_datetime: string
          id: string
          image: string | null
          name: string
          start_datetime: string
        }
        Insert: {
          author: string
          category?: string | null
          created_at?: string
          description?: string | null
          end_datetime: string
          id?: string
          image?: string | null
          name: string
          start_datetime: string
        }
        Update: {
          author?: string
          category?: string | null
          created_at?: string
          description?: string | null
          end_datetime?: string
          id?: string
          image?: string | null
          name?: string
          start_datetime?: string
        }
        Relationships: [
          {
            foreignKeyName: "Events_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      EventsAttendees: {
        Row: {
          attendee_id: string
          event_id: string
        }
        Insert: {
          attendee_id: string
          event_id: string
        }
        Update: {
          attendee_id?: string
          event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "EventsAttendees_attendee_id_fkey"
            columns: ["attendee_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventsAttendees_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "Events"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_avatar_fkey"
            columns: ["avatar"]
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
