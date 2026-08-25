import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Linking from 'expo-linking';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { OnboardingData, Profile } from '@/types';
import { findDemoAccount, toPublicDemoAccount, type DemoAccount, type DemoRole } from './demoAccounts';

type AuthContextValue = {
  configured: boolean;
  initialized: boolean;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  demoAccount: DemoAccount | null;
  isPremium: boolean;
  isModerator: boolean;
  isOwner: boolean;
  profileLoading: boolean;
  profileReady: boolean;
  signIn: (email: string, password: string) => Promise<DemoRole | null>;
  signUp: (email: string, password: string, displayName: string, username: string) => Promise<{ needsVerification: boolean }>;
  sendPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loadOnboardingData: () => Promise<Partial<OnboardingData>>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function requireSupabase() {
  if (!supabase) throw new Error('Add your Supabase project URL and publishable key to .env first.');
  return supabase;
}

const optionalNumber = (value: string) => {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [demoAccount, setDemoAccount] = useState<DemoAccount | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileResolvedUserId, setProfileResolvedUserId] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    const client = supabase;
    const userId = session?.user.id;
    if (!client || !userId) {
      setProfile(null);
      setProfileResolvedUserId(null);
      return;
    }
    setProfileLoading(true);
    const { data, error } = await client.from('profiles').select('*').eq('id', userId).maybeSingle();
    setProfileLoading(false);
    setProfileResolvedUserId(userId);
    if (error) throw error;
    setProfile(data);
  }, [session?.user.id]);

  useEffect(() => {
    if (!supabase) {
      setInitialized(true);
      return;
    }
    const client = supabase;
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitialized(true);
    });
    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) setProfile(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => { void refreshProfile().catch(() => setProfile(null)); }, [refreshProfile]);

  const value = useMemo<AuthContextValue>(() => ({
    configured: isSupabaseConfigured,
    initialized,
    session,
    user: session?.user ?? null,
    profile,
    demoAccount,
    isPremium: demoAccount?.role === 'premium' || demoAccount?.role === 'owner',
    isModerator: demoAccount?.role === 'moderator' || demoAccount?.role === 'owner',
    isOwner: demoAccount?.role === 'owner',
    profileLoading,
    profileReady: !session || profileResolvedUserId === session.user.id,
    signIn: async (email, password) => {
      if (!isSupabaseConfigured) {
        const account = findDemoAccount(email, password);
        if (!account) throw new Error('Choose one of the demo identities shown on this screen.');
        setDemoAccount(toPublicDemoAccount(account));
        return account.role;
      }
      const { error } = await requireSupabase().auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      return null;
    },
    signUp: async (email, password, displayName, username) => {
      const redirectTo = Linking.createURL('/callback');
      const { data, error } = await requireSupabase().auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: redirectTo, data: { display_name: displayName.trim(), username: username.trim().toLowerCase() } },
      });
      if (error) throw error;
      return { needsVerification: !data.session };
    },
    sendPasswordReset: async (email) => {
      const redirectTo = Linking.createURL('/update-password');
      const { error } = await requireSupabase().auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (error) throw error;
    },
    updatePassword: async (password) => {
      const { error } = await requireSupabase().auth.updateUser({ password });
      if (error) throw error;
    },
    signOut: async () => {
      if (demoAccount) {
        setDemoAccount(null);
        return;
      }
      const { error } = await requireSupabase().auth.signOut();
      if (error) throw error;
    },
    refreshProfile,
    loadOnboardingData: async () => {
      const client = requireSupabase();
      if (!session?.user.id) return {};
      const { data: goals, error } = await client.from('fitness_goals').select('*').eq('user_id', session.user.id).maybeSingle();
      if (error) throw error;
      return {
        displayName: profile?.display_name ?? '', username: profile?.username ?? '', fitnessLevel: profile?.fitness_level ?? '', interests: profile?.interests ?? [],
        age: goals?.age?.toString() ?? '', heightCm: goals?.height_cm?.toString() ?? '', weightKg: goals?.weight_kg?.toString() ?? '', targetWeightKg: goals?.target_weight_kg?.toString() ?? '',
        activityLevel: goals?.activity_level ?? '', goals: goals?.goals ?? [], dietaryPreferences: goals?.dietary_preferences ?? [], allergies: goals?.allergies?.join(', ') ?? '', preferredWorkouts: goals?.preferred_workouts ?? [],
      };
    },
    completeOnboarding: async (data) => {
      const client = requireSupabase();
      if (!session?.user.id) throw new Error('Your session expired. Please log in again.');
      const userId = session.user.id;
      const { error: profileError } = await client.from('profiles').upsert({
        id: userId,
        display_name: data.displayName.trim(),
        username: data.username.trim().toLowerCase(),
        fitness_level: data.fitnessLevel || null,
        interests: data.interests,
        onboarding_completed: true,
      });
      if (profileError) throw profileError;
      const { error: goalError } = await client.from('fitness_goals').upsert({
        user_id: userId,
        age: optionalNumber(data.age),
        height_cm: optionalNumber(data.heightCm),
        weight_kg: optionalNumber(data.weightKg),
        target_weight_kg: optionalNumber(data.targetWeightKg),
        activity_level: data.activityLevel || null,
        goals: data.goals,
        dietary_preferences: data.dietaryPreferences,
        allergies: data.allergies.split(',').map((item) => item.trim()).filter(Boolean),
        preferred_workouts: data.preferredWorkouts,
      }, { onConflict: 'user_id' });
      if (goalError) throw goalError;
      await refreshProfile();
    },
  }), [demoAccount, initialized, profile, profileLoading, profileResolvedUserId, refreshProfile, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
