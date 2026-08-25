import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/constants';
export function ConfigNotice() { return <View style={styles.card}><Ionicons name="key-outline" size={22} color={colors.accent} /><View style={styles.copy}><Text style={styles.title}>Connect Supabase to continue</Text><Text style={styles.text}>Copy .env.example to .env and add your project URL and publishable key.</Text></View></View>; }
const styles = StyleSheet.create({ card: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: 'rgba(245,217,10,.3)', backgroundColor: '#242419' }, copy: { flex: 1 }, title: { ...typography.heading, fontSize: 15, color: colors.text }, text: { ...typography.body, fontSize: 13, color: colors.textMuted, marginTop: 4 } });
