import { StyleSheet, Text, View } from 'react-native';
import { ChoiceChip } from '@/components';
import { colors, spacing, typography } from '@/constants';

export function OptionGroup({ label, options, selected, multiple = false, onChange }: { label: string; options: string[]; selected: string[]; multiple?: boolean; onChange: (values: string[]) => void }) {
  const toggle = (option: string) => onChange(multiple ? (selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]) : [option]);
  return <View style={styles.group}><Text style={styles.label}>{label}</Text><View style={styles.options}>{options.map((option) => <ChoiceChip key={option} label={option} selected={selected.includes(option)} onPress={() => toggle(option)} />)}</View></View>;
}
const styles = StyleSheet.create({ group: { gap: spacing.md }, label: { ...typography.label, color: colors.textMuted, fontSize: 10 }, options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm } });
