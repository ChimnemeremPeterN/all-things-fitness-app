export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
export type FoodEntry = { id: string; name: string; meal: MealType; calories: number; protein: number; carbs: number; fat: number; createdAt: string };
export type NutritionEstimate = Omit<FoodEntry, 'id' | 'createdAt'> & { confidence: number; serving: string };

export type Recipe = { id: string; name: string; creator: string; country: string; cuisine: string; meal: string; dietary: string[]; calories: number; protein: number; carbs: number; fat: number; prepMinutes: number; servings: number; ingredients: string[]; instructions: string[]; description: string; accent: string; rating: number; ratings: number };
export type Club = { id: string; name: string; type: string; location: string; distanceKm: number; description: string; members: number; services: string[]; accent: string };
export type FitnessEvent = { id: string; name: string; type: string; clubId: string; location: string; startsAt: string; durationMinutes: number; description: string; attendees: number; accent: string };
export type DemoNotification = { id: string; title: string; body: string; type: 'social' | 'event' | 'nutrition' | 'fitness'; time: string; read: boolean };
export type ReportTarget = { type: 'video' | 'creator' | 'recipe' | 'club' | 'event'; id: string; label: string };
export type UploadedVideo = { id: string; uri: string; fileName: string; caption: string; category: string; hashtags: string[]; status: 'draft' | 'demo-ready'; createdAt: string };
