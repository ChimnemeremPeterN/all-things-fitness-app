import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/constants';
export function LoadingScreen({ label = 'Getting things ready…' }: { label?: string }) { return <View style={styles.screen}><ActivityIndicator size="large" color={colors.accent} /><Text style={styles.label}>{label}</Text></View>; }
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: spacing.md }, label: { ...typography.body, color: colors.textMuted } });
