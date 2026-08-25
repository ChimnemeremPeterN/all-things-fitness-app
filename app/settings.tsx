import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppScreen } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';
import { useDemoStore } from '@/features/demo';

function SettingRow({ icon, title, description, value, onChange }: { icon: keyof typeof Ionicons.glyphMap; title: string; description: string; value: boolean; onChange: (value: boolean) => void }) {
  return <View style={styles.row}><View style={styles.icon}><Ionicons name={icon} size={20} color={colors.accent} /></View><View style={styles.copy}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.description}>{description}</Text></View><Switch value={value} onValueChange={onChange} trackColor={{ false: '#343636', true: colors.accent }} thumbColor={value ? colors.background : colors.textMuted} /></View>;
}

export default function SettingsScreen() {
  const { demoAccount, isPremium, isModerator, isOwner } = useAuth();
  const { notificationPreferences, setNotificationPreference, privacyPreferences, setPrivacyPreference, reports } = useDemoStore();
  return <AppScreen>
    <View style={styles.header}><Pressable accessibilityLabel="Go back" onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={colors.text} /></Pressable><Text style={styles.title}>Settings & privacy</Text><View style={{ width: 24 }} /></View>
    <Text style={styles.section}>DEMO IDENTITY</Text>
    <Pressable onPress={() => router.push('/(auth)/login')} style={styles.identity}>
      <View style={styles.icon}><Ionicons name={isOwner ? 'business' : isModerator ? 'shield-checkmark' : isPremium ? 'diamond' : 'person-outline'} size={21} color={colors.accent} /></View>
      <View style={styles.copy}><Text style={styles.rowTitle}>{demoAccount?.displayName ?? 'No identity selected'}</Text><Text style={styles.description}>{demoAccount ? `${demoAccount.roleLabel} · tap to switch identity` : 'Choose a regular, paying, moderator or owner/board account.'}</Text></View>
      <Ionicons name="swap-horizontal" size={20} color={colors.textMuted} />
    </Pressable>
    <Text style={styles.section}>NOTIFICATION PREFERENCES</Text>
    <SettingRow icon="heart-outline" title="Social activity" description="Likes, comments, follows and creators." value={notificationPreferences.social} onChange={(value) => setNotificationPreference('social', value)} />
    <SettingRow icon="calendar-outline" title="Events and clubs" description="Event reminders and club activity." value={notificationPreferences.events} onChange={(value) => setNotificationPreference('events', value)} />
    <SettingRow icon="nutrition-outline" title="Nutrition reminders" description="Meal, water and nutrition goal nudges." value={notificationPreferences.nutrition} onChange={(value) => setNotificationPreference('nutrition', value)} />
    <SettingRow icon="barbell-outline" title="Fitness reminders" description="Workout and movement prompts." value={notificationPreferences.fitness} onChange={(value) => setNotificationPreference('fitness', value)} />
    <Text style={styles.section}>PROFILE PRIVACY</Text>
    <SettingRow icon="flag-outline" title="Show fitness goals" description="Allow other members to see public goals." value={privacyPreferences.showGoals} onChange={(value) => setPrivacyPreference('showGoals', value)} />
    <SettingRow icon="trending-up-outline" title="Show progress" description="Share selected progress information." value={privacyPreferences.showProgress} onChange={(value) => setPrivacyPreference('showProgress', value)} />
    <SettingRow icon="search-outline" title="Searchable profile" description="Allow discovery in universal search." value={privacyPreferences.searchableProfile} onChange={(value) => setPrivacyPreference('searchableProfile', value)} />
    <Text style={styles.section}>SAFETY & OPERATIONS</Text>
    <Pressable onPress={() => router.push('/moderation')} style={styles.link}><View style={styles.icon}><Ionicons name={isModerator ? 'shield-checkmark' : 'lock-closed-outline'} size={21} color={colors.accent} /></View><View style={styles.copy}><Text style={styles.rowTitle}>{isOwner ? 'Owner / board moderation' : isModerator ? 'Moderation console' : 'Moderator access'}</Text><Text style={styles.description}>{isModerator ? `${reports.length} locally recorded reports · ${demoAccount?.roleLabel} active` : 'Requires the moderator or owner/board demo identity.'}</Text></View><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></Pressable>
    <Pressable onPress={() => router.push('/premium')} style={styles.link}><View style={styles.icon}><Ionicons name={isPremium ? 'diamond' : 'diamond-outline'} size={21} color={colors.accent} /></View><View style={styles.copy}><Text style={styles.rowTitle}>Premium architecture</Text><Text style={styles.description}>{isPremium ? 'Demo premium entitlement is active.' : 'Free tier · preview entitlements without billing.'}</Text></View><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></Pressable>
    <View style={styles.notice}><Ionicons name="lock-closed" size={19} color={colors.success} /><Text style={styles.noticeText}>All four identities are local client-demo fixtures. Production roles, subscriptions and staff access must be enforced by the funded backend.</Text></View>
  </AppScreen>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...typography.heading, color: colors.text },
  section: { ...typography.label, color: colors.textMuted, fontSize: 9, marginTop: spacing.xl, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 70, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: '#242419', borderWidth: 1, borderColor: 'rgba(245,217,10,.25)' },
  icon: { width: 42, height: 42, borderRadius: radius.md, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  rowTitle: { color: colors.text, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 10, lineHeight: 15, marginTop: 3 },
  link: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  notice: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md, backgroundColor: 'rgba(110,231,168,.06)', marginTop: spacing.lg },
  noticeText: { flex: 1, color: colors.textMuted, fontSize: 10, lineHeight: 15 },
});
