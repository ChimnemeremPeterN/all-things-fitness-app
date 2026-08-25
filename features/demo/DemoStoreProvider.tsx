import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { DemoNotification, FitnessEvent, FoodEntry, Recipe, ReportTarget, UploadedVideo } from '@/types';
import { events as seedEvents, recipes as seedRecipes, starterFoods, starterNotifications } from './demoData';

type NotificationPreferences = { social: boolean; events: boolean; nutrition: boolean; fitness: boolean };
type PrivacyPreferences = { showGoals: boolean; showProgress: boolean; searchableProfile: boolean };

type DemoStoreValue = {
  foodEntries: FoodEntry[]; waterGlasses: number; addFood: (entry: Omit<FoodEntry, 'id' | 'createdAt'>) => void; removeFood: (id: string) => void; setWaterGlasses: (value: number) => void;
  recipes: Recipe[]; savedRecipes: string[]; likedRecipes: string[]; recipeRatings: Record<string, number>; toggleSavedRecipe: (id: string) => void; toggleLikedRecipe: (id: string) => void; rateRecipe: (id: string, value: number) => void; addRecipe: (recipe: Omit<Recipe, 'id' | 'rating' | 'ratings'>) => string;
  events: FitnessEvent[]; savedEvents: string[]; rsvps: string[]; toggleSavedEvent: (id: string) => void; toggleRsvp: (id: string) => void;
  uploadedVideos: UploadedVideo[]; addUploadedVideo: (video: Omit<UploadedVideo, 'id' | 'createdAt'>) => void;
  reports: Array<ReportTarget & { reason: string; createdAt: string }>; submitReport: (target: ReportTarget, reason: string) => void;
  notifications: DemoNotification[]; markNotificationRead: (id: string) => void; markAllNotificationsRead: () => void;
  notificationPreferences: NotificationPreferences; setNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => void;
  privacyPreferences: PrivacyPreferences; setPrivacyPreference: (key: keyof PrivacyPreferences, value: boolean) => void;
  premiumPreview: boolean; setPremiumPreview: (value: boolean) => void;
};

const DemoStoreContext = createContext<DemoStoreValue | null>(null);
const toggleId = (values: string[], id: string) => values.includes(id) ? values.filter((value) => value !== id) : [...values, id];

export function DemoStoreProvider({ children }: PropsWithChildren) {
  const [foodEntries, setFoodEntries] = useState(starterFoods); const [waterGlasses, setWaterGlassesState] = useState(5);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]); const [savedRecipes, setSavedRecipes] = useState<string[]>(['med-chicken']); const [likedRecipes, setLikedRecipes] = useState<string[]>(['miso-salmon']); const [recipeRatings, setRecipeRatings] = useState<Record<string, number>>({});
  const [savedEvents, setSavedEvents] = useState<string[]>([]); const [rsvps, setRsvps] = useState<string[]>(['park-5k']); const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]); const [reports, setReports] = useState<Array<ReportTarget & { reason: string; createdAt: string }>>([]);
  const [notifications, setNotifications] = useState(starterNotifications); const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({ social: true, events: true, nutrition: true, fitness: false }); const [privacyPreferences, setPrivacyPreferences] = useState<PrivacyPreferences>({ showGoals: false, showProgress: false, searchableProfile: true }); const [premiumPreview, setPremiumPreview] = useState(false);
  const value = useMemo<DemoStoreValue>(() => ({
    foodEntries, waterGlasses,
    addFood: (entry) => setFoodEntries((current) => [...current, { ...entry, id: `food-${Date.now()}`, createdAt: new Date().toISOString() }]), removeFood: (id) => setFoodEntries((current) => current.filter((entry) => entry.id !== id)), setWaterGlasses: (next) => setWaterGlassesState(Math.max(0, Math.min(12, next))),
    recipes: [...customRecipes, ...seedRecipes], savedRecipes, likedRecipes, recipeRatings,
    toggleSavedRecipe: (id) => setSavedRecipes((current) => toggleId(current, id)), toggleLikedRecipe: (id) => setLikedRecipes((current) => toggleId(current, id)), rateRecipe: (id, rating) => setRecipeRatings((current) => ({ ...current, [id]: rating })),
    addRecipe: (recipe) => { const id = `recipe-${Date.now()}`; setCustomRecipes((current) => [{ ...recipe, id, rating: 0, ratings: 0 }, ...current]); return id; },
    events: seedEvents, savedEvents, rsvps, toggleSavedEvent: (id) => setSavedEvents((current) => toggleId(current, id)), toggleRsvp: (id) => setRsvps((current) => toggleId(current, id)),
    uploadedVideos, addUploadedVideo: (video) => setUploadedVideos((current) => [{ ...video, id: `upload-${Date.now()}`, createdAt: new Date().toISOString() }, ...current]),
    reports, submitReport: (target, reason) => setReports((current) => [{ ...target, reason, createdAt: new Date().toISOString() }, ...current]),
    notifications, markNotificationRead: (id) => setNotifications((current) => current.map((item) => item.id === id ? { ...item, read: true } : item)), markAllNotificationsRead: () => setNotifications((current) => current.map((item) => ({ ...item, read: true }))),
    notificationPreferences, setNotificationPreference: (key, enabled) => setNotificationPreferences((current) => ({ ...current, [key]: enabled })), privacyPreferences, setPrivacyPreference: (key, enabled) => setPrivacyPreferences((current) => ({ ...current, [key]: enabled })),
    premiumPreview, setPremiumPreview,
  }), [customRecipes, foodEntries, likedRecipes, notificationPreferences, notifications, premiumPreview, privacyPreferences, recipeRatings, reports, rsvps, savedEvents, savedRecipes, uploadedVideos, waterGlasses]);
  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore() { const context = useContext(DemoStoreContext); if (!context) throw new Error('useDemoStore must be used inside DemoStoreProvider.'); return context; }
