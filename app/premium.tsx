import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';
import { useDemoStore } from '@/features/demo';

const features = [
  ['sparkles', 'Advanced food scanning', 'More scans and stronger review assistance.'],
  ['chatbubbles', 'Unlimited AI assistant', 'Deeper planning and goal-aware conversations.'],
  ['analytics', 'Advanced nutrition analytics', 'Trends, comparisons and richer progress reports.'],
  ['options', 'Personalized recommendations', 'More control over ranking and suggestions.'],
] as const;

export default function PremiumScreen() {
  const { demoAccount, isPremium } = useAuth();
  const { premiumPreview, setPremiumPreview } = useDemoStore();
  const premiumActive = isPremium || premiumPreview;

  return <LinearGradient colors={['#242419', colors.background, '#090A0A']} style={styles.screen}><SafeAreaView style={styles.safe}>
    <View style={styles.header}><Pressable accessibilityLabel="Go back" onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={colors.text} /></Pressable><Text style={styles.demo}>NO BILLING · CLIENT DEMO</Text></View>
    <View style={styles.crown}><Ionicons name="diamond" size={46} color={colors.background} /></View>
    <Text style={styles.eyebrow}>ALL THINGS FITNESS+</Text>
    <Text style={styles.title}>Go deeper, not darker.</Text>
    <Text style={styles.description}>Premium adds advanced tools while the free experience stays genuinely useful.</Text>
    <View style={styles.price}><Text style={styles.priceValue}>$9.99</Text><Text style={styles.priceUnit}> / month concept</Text></View>
    <View style={styles.features}>{features.map(([icon, title, description]) => <View key={title} style={styles.feature}><View style={styles.featureIcon}><Ionicons name={icon} size={21} color={colors.accent} /></View><View style={styles.featureCopy}><Text style={styles.featureTitle}>{title}</Text><Text style={styles.featureText}>{description}</Text></View><Ionicons name="checkmark-circle" size={21} color={colors.success} /></View>)}</View>
    <View style={styles.previewCard}>
      <View style={styles.previewTop}><View style={styles.featureCopy}><Text style={styles.previewTitle}>{isPremium ? 'Demo entitlement active' : 'Premium presentation preview'}</Text><Text style={styles.previewText}>{isPremium ? `${demoAccount?.roleLabel} includes Fitness+ access.` : 'Unlocks demo-only badges and advanced cards.'}</Text></View><Pressable accessibilityRole="switch" accessibilityState={{ checked: premiumActive, disabled: isPremium }} disabled={isPremium} onPress={() => setPremiumPreview(!premiumPreview)} style={[styles.switch, premiumActive && styles.switchOn]}><View style={[styles.knob, premiumActive && styles.knobOn]} /></Pressable></View>
      {premiumActive ? <View style={styles.unlocked}><Ionicons name="sparkles" size={18} color={colors.accent} /><Text style={styles.unlockedText}>{isPremium ? 'Premium access comes from this demo identity—no payment occurred.' : 'Premium preview is active—no subscription was created.'}</Text></View> : null}
    </View>
    <View style={styles.actions}>
      {!isPremium ? <PrimaryButton label="Preview premium experience" onPress={() => setPremiumPreview(true)} /> : <PrimaryButton label="Premium demo is active" onPress={() => router.push('/(tabs)')} />}
      <PrimaryButton label="Restore purchases" variant="ghost" onPress={() => Alert.alert('Billing disabled', 'Restore is present architecturally but no store account is contacted in the client demo.')} />
    </View>
    <Text style={styles.legal}>No trial, purchase, charge or renewal occurs. Store billing and legal subscription terms require funded production work.</Text>
  </SafeAreaView></LinearGradient>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, safe: { flex: 1, padding: spacing.lg }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, demo: { ...typography.label, color: colors.accent, fontSize: 8 },
  crown: { width: 82, height: 82, borderRadius: 41, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl }, eyebrow: { ...typography.label, color: colors.accent, marginTop: spacing.lg }, title: { ...typography.title, color: colors.text, marginTop: spacing.sm }, description: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  price: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.lg }, priceValue: { color: colors.text, fontSize: 34, fontWeight: '900' }, priceUnit: { color: colors.textMuted }, features: { gap: spacing.md, marginTop: spacing.lg }, feature: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, featureIcon: { width: 42, height: 42, borderRadius: radius.md, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' }, featureCopy: { flex: 1 }, featureTitle: { color: colors.text, fontWeight: '800' }, featureText: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  previewCard: { padding: spacing.md, borderRadius: radius.lg, backgroundColor: '#242419', borderWidth: 1, borderColor: 'rgba(245,217,10,.25)', marginTop: spacing.lg }, previewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm }, previewTitle: { color: colors.text, fontWeight: '900' }, previewText: { color: colors.textMuted, fontSize: 10, marginTop: 3 }, switch: { width: 52, height: 30, borderRadius: 15, backgroundColor: colors.border, padding: 3 }, switchOn: { backgroundColor: colors.accent }, knob: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.text }, knobOn: { alignSelf: 'flex-end', backgroundColor: colors.background }, unlocked: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginTop: spacing.md }, unlockedText: { flex: 1, color: colors.accentSoft, fontSize: 11, fontWeight: '700' }, actions: { gap: spacing.sm, marginTop: spacing.lg }, legal: { color: colors.textMuted, fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: spacing.md },
});
