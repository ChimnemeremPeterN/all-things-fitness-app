import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppScreen, PrimaryButton } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';
import { useDemoStore } from '@/features/demo';

export default function ModerationScreen() {
  const { demoAccount, isModerator, isOwner } = useAuth();
  const { reports } = useDemoStore();

  if (!isModerator) return <AppScreen>
    <View style={styles.header}>
      <Pressable accessibilityLabel="Go back" onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={colors.text} /></Pressable>
      <Text style={styles.title}>Moderator access</Text>
      <View style={{ width: 24 }} />
    </View>
    <View style={styles.locked}>
      <View style={styles.lockIcon}><Ionicons name="shield-checkmark" size={40} color={colors.accent} /></View>
      <Text style={styles.lockedTitle}>Sign in as a moderator.</Text>
      <Text style={styles.lockedText}>The moderation preview is protected by the included demo moderator role. No production account or paid backend is required.</Text>
      <PrimaryButton label="Open moderator login" onPress={() => router.push('/(auth)/login')} />
    </View>
  </AppScreen>;

  const totals = { reports: reports.length, pending: reports.length, removed: 0, suspended: 0 };

  return <AppScreen>
    <View style={styles.header}>
      <Pressable accessibilityLabel="Go back" onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={colors.text} /></Pressable>
      <Text style={styles.title}>Moderation console</Text>
      <Text style={styles.demo}>{isOwner ? 'OWNER / BOARD' : 'MODERATOR'}</Text>
    </View>
    <View style={styles.identity}>
      <Ionicons name="person-circle" size={30} color={colors.accent} />
      <View style={styles.copy}><Text style={styles.identityName}>{demoAccount?.displayName}</Text><Text style={styles.identityMeta}>{demoAccount?.email} · DEMO ROLE</Text></View>
    </View>
    <View style={styles.notice}>
      <Ionicons name="shield-outline" size={24} color={colors.accent} />
      <View style={styles.copy}><Text style={styles.noticeTitle}>Architecture preview</Text><Text style={styles.noticeText}>No user or content action is sent externally. Production access will require staff roles, audit logs and server-enforced authorization.</Text></View>
    </View>
    <View style={styles.stats}>{Object.entries(totals).map(([label, value]) => <View key={label} style={styles.stat}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label.toUpperCase()}</Text></View>)}</View>
    <Text style={styles.section}>REPORT QUEUE</Text>
    {reports.length ? reports.map((report, index) => <View key={`${report.id}-${index}`} style={styles.report}>
      <View style={styles.reportIcon}><Ionicons name="flag" size={18} color={colors.danger} /></View>
      <View style={styles.copy}><Text style={styles.reportTitle}>{report.label}</Text><Text style={styles.reportMeta}>{report.type.toUpperCase()} · {report.reason}</Text><Text style={styles.reportTime}>{new Date(report.createdAt).toLocaleTimeString()}</Text></View>
      <View style={styles.pending}><Text style={styles.pendingText}>PENDING</Text></View>
    </View>) : <View style={styles.empty}><Ionicons name="checkmark-circle" size={38} color={colors.success} /><Text style={styles.emptyTitle}>Queue is clear</Text><Text style={styles.emptyText}>Reports submitted from video, creator, recipe, club and event screens will appear here.</Text></View>}
    <Text style={styles.section}>SUPPORTED ACTIONS</Text>
    <View style={styles.actions}>{['Review reported videos, comments, users and recipes', 'Suspend users and remove content', 'Manage clubs, events and featured content', 'Label sponsored content and preserve audit history'].map((item) => <View key={item} style={styles.action}><Ionicons name="checkmark-circle-outline" size={18} color={colors.success} /><Text style={styles.actionText}>{item}</Text></View>)}</View>
  </AppScreen>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...typography.heading, color: colors.text },
  demo: { ...typography.label, color: colors.accent, fontSize: 8 },
  locked: { gap: spacing.lg, alignItems: 'center', justifyContent: 'center', minHeight: 480, padding: spacing.xl },
  lockIcon: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#242419', alignItems: 'center', justifyContent: 'center' },
  lockedTitle: { ...typography.heading, color: colors.text, textAlign: 'center' },
  lockedText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginBottom: spacing.sm },
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md, backgroundColor: 'rgba(245,217,10,.07)', borderWidth: 1, borderColor: 'rgba(245,217,10,.2)', marginTop: spacing.lg },
  identityName: { color: colors.text, fontWeight: '900' },
  identityMeta: { color: colors.textMuted, fontSize: 9, marginTop: 3 },
  notice: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderRadius: radius.lg, backgroundColor: '#242419', marginTop: spacing.lg },
  copy: { flex: 1 },
  noticeTitle: { color: colors.text, fontWeight: '900' },
  noticeText: { color: colors.textMuted, fontSize: 10, lineHeight: 15, marginTop: 3 },
  stats: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  stat: { flex: 1, padding: spacing.sm, backgroundColor: colors.glass, borderRadius: radius.md, alignItems: 'center' },
  value: { color: colors.text, fontSize: 20, fontWeight: '900' },
  label: { ...typography.label, color: colors.textMuted, fontSize: 6, marginTop: 3 },
  section: { ...typography.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  report: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.surfaceElevated, marginBottom: spacing.sm },
  reportIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,107,107,.1)', alignItems: 'center', justifyContent: 'center' },
  reportTitle: { color: colors.text, fontWeight: '800' },
  reportMeta: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  reportTime: { color: colors.textMuted, fontSize: 8, marginTop: 3 },
  pending: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: radius.pill, backgroundColor: 'rgba(245,217,10,.1)' },
  pendingText: { ...typography.label, color: colors.accent, fontSize: 6 },
  empty: { alignItems: 'center', padding: spacing.xl, backgroundColor: colors.glass, borderRadius: radius.lg },
  emptyTitle: { color: colors.text, fontWeight: '800', marginTop: spacing.md },
  emptyText: { color: colors.textMuted, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 4 },
  actions: { gap: spacing.sm },
  action: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  actionText: { color: colors.text, fontSize: 11 },
});
