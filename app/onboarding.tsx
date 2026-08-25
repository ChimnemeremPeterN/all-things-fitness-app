import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark, FormField, LoadingScreen, PrimaryButton } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';
import { OptionGroup } from '@/features/onboarding/OptionGroup';
import { activityLevels, dietaryOptions, fitnessLevels, goalOptions, interestOptions, workoutOptions } from '@/features/onboarding/options';
import { emptyOnboardingData, type OnboardingData } from '@/types';
import { getErrorMessage } from '@/utilities';

const steps = [
  { eyebrow: '01 · THE BASICS', title: 'Let’s get to know you.', description: 'Only your name and username are required. Health details stay private.' },
  { eyebrow: '02 · YOUR DIRECTION', title: 'What are you training for?', description: 'Choose what fits today. You can change everything later.' },
  { eyebrow: '03 · YOUR FUEL', title: 'Personalize your nutrition.', description: 'These choices will shape recipes and future recommendations.' },
  { eyebrow: '04 · YOUR WORLD', title: 'Make the feed yours.', description: 'Pick the workouts and fitness topics you want to see.' },
] as const;

export default function OnboardingScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const editing = mode === 'edit';
  const { initialized, session, user, profile, completeOnboarding, loadOnboardingData } = useAuth();
  const [step, setStep] = useState(0); const [data, setData] = useState<OnboardingData>(emptyOnboardingData); const [error, setError] = useState(''); const [saving, setSaving] = useState(false);
  const loadedExisting = useRef(false);
  useEffect(() => { if (initialized && !session) router.replace('/(auth)/login'); }, [initialized, session]);
  useEffect(() => {
    setData((current) => ({ ...current, displayName: current.displayName || profile?.display_name || String(user?.user_metadata?.display_name ?? ''), username: current.username || profile?.username || String(user?.user_metadata?.username ?? '') }));
  }, [profile, user]);
  useEffect(() => {
    if (!editing || loadedExisting.current || !session) return;
    loadedExisting.current = true;
    loadOnboardingData().then((existing) => setData((current) => ({ ...current, ...existing }))).catch((caught) => setError(getErrorMessage(caught)));
  }, [editing, loadOnboardingData, session]);
  if (!initialized || !session) return <LoadingScreen />;
  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => setData((current) => ({ ...current, [key]: value }));
  const next = async () => {
    setError('');
    if (step === 0 && (!data.displayName.trim() || data.username.trim().length < 3)) { setError('Name and a username of at least 3 characters are required.'); return; }
    if (step < steps.length - 1) { setStep((current) => current + 1); return; }
    setSaving(true); try { await completeOnboarding(data); if (editing && router.canGoBack()) router.back(); else router.replace('/(tabs)'); } catch (caught) { setError(getErrorMessage(caught)); } finally { setSaving(false); }
  };
  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.top}><BrandMark compact /><Text style={styles.counter}>{editing ? 'EDIT · ' : ''}{step + 1} / {steps.length}</Text></View>
    <View style={styles.progress}>{steps.map((_, index) => <View key={index} style={[styles.progressItem, index <= step && styles.progressActive]} />)}</View>
    <View style={styles.heading}><Text style={styles.eyebrow}>{steps[step].eyebrow}</Text><Text style={styles.title}>{steps[step].title}</Text><Text style={styles.description}>{steps[step].description}</Text></View>
    <View style={styles.form}>
      {step === 0 ? <><FormField label="NAME *" value={data.displayName} onChangeText={(value) => update('displayName', value)} placeholder="Your name" /><FormField label="USERNAME *" value={data.username} onChangeText={(value) => update('username', value.replace(/[^a-zA-Z0-9_]/g, ''))} autoCapitalize="none" placeholder="your_username" /><View style={styles.row}><FormField label="AGE" value={data.age} onChangeText={(value) => update('age', value)} keyboardType="number-pad" placeholder="28" containerStyle={styles.field} /><FormField label="HEIGHT (CM)" value={data.heightCm} onChangeText={(value) => update('heightCm', value)} keyboardType="decimal-pad" placeholder="175" containerStyle={styles.field} /></View><View style={styles.row}><FormField label="WEIGHT (KG)" value={data.weightKg} onChangeText={(value) => update('weightKg', value)} keyboardType="decimal-pad" placeholder="72" containerStyle={styles.field} /><FormField label="TARGET (KG)" value={data.targetWeightKg} onChangeText={(value) => update('targetWeightKg', value)} keyboardType="decimal-pad" placeholder="68" containerStyle={styles.field} /></View></> : null}
      {step === 1 ? <><OptionGroup label="FITNESS LEVEL" options={fitnessLevels} selected={data.fitnessLevel ? [data.fitnessLevel] : []} onChange={([value = '']) => update('fitnessLevel', value)} /><OptionGroup label="ACTIVITY LEVEL" options={activityLevels} selected={data.activityLevel ? [data.activityLevel] : []} onChange={([value = '']) => update('activityLevel', value)} /><OptionGroup label="FITNESS GOALS · CHOOSE ANY" options={goalOptions} selected={data.goals} multiple onChange={(value) => update('goals', value)} /></> : null}
      {step === 2 ? <><OptionGroup label="DIETARY PREFERENCES · CHOOSE ANY" options={dietaryOptions} selected={data.dietaryPreferences} multiple onChange={(value) => update('dietaryPreferences', value)} /><FormField label="ALLERGIES" value={data.allergies} onChangeText={(value) => update('allergies', value)} placeholder="Peanuts, shellfish…" /><Text style={styles.helper}>Separate multiple allergies with commas. AI estimates will always require your review.</Text></> : null}
      {step === 3 ? <><OptionGroup label="PREFERRED WORKOUTS · CHOOSE ANY" options={workoutOptions} selected={data.preferredWorkouts} multiple onChange={(value) => update('preferredWorkouts', value)} /><OptionGroup label="FITNESS INTERESTS · CHOOSE ANY" options={interestOptions} selected={data.interests} multiple onChange={(value) => update('interests', value)} /></> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
    <View style={styles.actions}>{step > 0 ? <PrimaryButton label="Back" variant="ghost" onPress={() => setStep((current) => current - 1)} /> : null}<PrimaryButton label={step === steps.length - 1 ? 'Finish setup' : 'Continue'} onPress={next} loading={saving} /></View>
    {step > 0 && step < steps.length - 1 ? <Text onPress={next} style={styles.skip}>Skip optional step</Text> : null}
  </ScrollView></KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1 }, content: { flexGrow: 1, padding: spacing.lg, paddingBottom: spacing.xxl }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, counter: { ...typography.label, color: colors.textMuted }, progress: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }, progressItem: { flex: 1, height: 3, borderRadius: radius.pill, backgroundColor: colors.border }, progressActive: { backgroundColor: colors.accent }, heading: { marginVertical: spacing.xl }, eyebrow: { ...typography.label, color: colors.accent, marginBottom: spacing.sm }, title: { ...typography.title, color: colors.text }, description: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }, form: { gap: spacing.lg }, row: { flexDirection: 'row', gap: spacing.md }, field: { flex: 1 }, helper: { color: colors.textMuted, fontSize: 12, lineHeight: 18 }, error: { color: colors.danger }, actions: { gap: spacing.md, marginTop: spacing.xl }, skip: { color: colors.textMuted, textAlign: 'center', padding: spacing.md, fontWeight: '700' } });
