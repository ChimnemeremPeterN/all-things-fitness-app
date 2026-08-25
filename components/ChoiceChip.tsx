import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '@/constants';

export function ChoiceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}><Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ chip: { borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass, paddingVertical: 10, paddingHorizontal: spacing.md }, selected: { backgroundColor: colors.accent, borderColor: colors.accent }, label: { color: colors.textMuted, fontSize: 13, fontWeight: '700' }, selectedLabel: { color: colors.background }, pressed: { opacity: .7 } });
