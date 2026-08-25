export type OnboardingData = {
  displayName: string;
  username: string;
  age: string;
  heightCm: string;
  weightKg: string;
  targetWeightKg: string;
  fitnessLevel: string;
  activityLevel: string;
  goals: string[];
  dietaryPreferences: string[];
  allergies: string;
  preferredWorkouts: string[];
  interests: string[];
};

export const emptyOnboardingData: OnboardingData = {
  displayName: '', username: '', age: '', heightCm: '', weightKg: '', targetWeightKg: '',
  fitnessLevel: '', activityLevel: '', goals: [], dietaryPreferences: [], allergies: '',
  preferredWorkouts: [], interests: [],
};
