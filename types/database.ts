export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Profile = {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  fitness_level: string | null;
  interests: string[];
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type FitnessGoal = {
  id: string;
  user_id: string;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  target_weight_kg: number | null;
  activity_level: string | null;
  goals: string[];
  dietary_preferences: string[];
  allergies: string[];
  preferred_workouts: string[];
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
        Relationships: [];
      };
      fitness_goals: {
        Row: FitnessGoal;
        Insert: Partial<FitnessGoal> & { user_id: string };
        Update: Partial<Omit<FitnessGoal, 'id' | 'user_id' | 'created_at'>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
