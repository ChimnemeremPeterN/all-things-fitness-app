import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '@/constants';

export function PrimaryButton({ label, onPress, loading = false, disabled = false, variant = 'accent' }: { label: string; onPress: () => void; loading?: boolean; disabled?: boolean; variant?: 'accent' | 'ghost' | 'danger' }) {
  const inactive = disabled || loading;
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: inactive }} disabled={inactive} onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], inactive && styles.disabled, pressed && styles.pressed]}>
      {loading ? <ActivityIndicator color={variant === 'accent' ? colors.background : colors.text} /> : <Text style={[styles.label, variant === 'accent' && styles.darkLabel, variant === 'danger' && styles.dangerLabel]}>{label}</Text>}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: { minHeight: 54, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, borderWidth: 1 },
  accent: { backgroundColor: colors.accent, borderColor: colors.accent }, ghost: { backgroundColor: colors.glass, borderColor: colors.border }, danger: { backgroundColor: 'rgba(255,107,107,.1)', borderColor: 'rgba(255,107,107,.35)' },
  label: { color: colors.text, fontSize: 15, fontWeight: '800' }, darkLabel: { color: colors.background }, dangerLabel: { color: colors.danger }, disabled: { opacity: .45 }, pressed: { opacity: .72 },
});
