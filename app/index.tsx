import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';

export default function LandingScreen() {
  const { configured } = useAuth();
  return (
    <LinearGradient colors={['#1B1C16', colors.background, '#090A0A']} style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        <BrandMark />
        <View style={styles.hero}>
          <View style={styles.orbit}><Ionicons name="fitness" size={76} color={colors.accent} /></View>
          <Text style={styles.kicker}>TRAIN · FUEL · CONNECT</Text>
          <Text style={styles.title}>Everything fitness.{`\n`}One community.</Text>
          <Text style={styles.subtitle}>Your workouts, nutrition, recipes and people—finally moving in the same direction.</Text>
        </View>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={() => configured ? router.push('/(auth)/sign-up') : router.replace('/(tabs)')}>
            <Text style={styles.primaryText}>{configured ? 'Get started' : 'Explore client demo'}</Text><Ionicons name="arrow-forward" size={20} color={colors.background} />
          </Pressable>
          <Pressable accessibilityRole="button" style={({ pressed }) => [styles.secondary, pressed && styles.pressed]} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.secondaryText}>I already have an account</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, safe: { flex: 1, padding: spacing.lg }, hero: { flex: 1, justifyContent: 'center' },
  orbit: { width: 158, height: 158, borderRadius: 79, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  kicker: { ...typography.label, color: colors.accent, marginBottom: spacing.md }, title: { ...typography.display, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, fontSize: 17, lineHeight: 25, marginTop: spacing.lg, maxWidth: 350 }, actions: { gap: spacing.md },
  primary: { height: 58, borderRadius: radius.md, backgroundColor: colors.accent, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryText: { color: colors.background, fontWeight: '800', fontSize: 16 }, secondary: { height: 52, alignItems: 'center', justifyContent: 'center' }, secondaryText: { color: colors.text, fontWeight: '600' }, pressed: { opacity: 0.72 },
});
