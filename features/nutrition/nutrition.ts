import type { FoodEntry } from '@/types';
export const nutritionGoals = { calories: 2200, protein: 160, carbs: 240, fat: 70, water: 8 };
export function calculateNutrition(entries: FoodEntry[]) { return entries.reduce((total, entry) => ({ calories: total.calories + entry.calories, protein: total.protein + entry.protein, carbs: total.carbs + entry.carbs, fat: total.fat + entry.fat }), { calories: 0, protein: 0, carbs: 0, fat: 0 }); }
export const weeklyCalories = [1880, 2140, 2050, 2310, 1975, 2200, 0];
