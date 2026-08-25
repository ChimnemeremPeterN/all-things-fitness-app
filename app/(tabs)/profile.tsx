import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppScreen, BrandMark, PrimaryButton } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { useAuth } from '@/features/auth';
import { getErrorMessage } from '@/utilities';

export default function ProfileScreen() {
  const { configured, user, profile, demoAccount, isPremium, isModerator, isOwner, signOut } = useAuth();
  const displayName = demoAccount?.displayName || profile?.display_name || 'Fitness member';
  const username = demoAccount?.username || profile?.username || 'username';
  const email = demoAccount?.email || user?.email;
  const initial = displayName.slice(0, 1).toUpperCase();

  const confirmSignOut = () => Alert.alert('Log out?', 'Your demo identity will be removed from this device.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Log out', style: 'destructive', onPress: async () => { try { await signOut(); router.replace('/'); } catch (error) { Alert.alert("Couldn't log out", getErrorMessage(error)); } } },
  ]);

  return <AppScreen>
    <View style={styles.header}><BrandMark compact /><View style={styles.headerTools}>{!configured ? <View style={styles.demoPill}><Text style={styles.demoPillText}>DEMO</Text></View> : null}<Pressable accessibilityLabel="Settings" onPress={() => router.push('/settings')}><Ionicons name="settings-outline" size={24} color={colors.text} /></Pressable></View></View>
    <View style={styles.identity}>
      <View style={styles.avatar}><Text style={styles.initial}>{initial}</Text></View>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.username}>@{username}</Text>
      {email ? <Text style={styles.email}>{email}</Text> : null}
      {demoAccount ? <View style={styles.role}><Ionicons name={isOwner ? 'business' : isModerator ? 'shield-checkmark' : isPremium ? 'diamond' : 'person'} size={14} color={colors.background} /><Text style={styles.roleText}>{demoAccount.roleLabel.toUpperCase()}</Text></View> : null}
    </View>
    <View style={styles.stats}><View style={styles.stat}><Text style={styles.statValue}>0</Text><Text style={styles.statLabel}>POSTS</Text></View><View style={styles.stat}><Text style={styles.statValue}>0</Text><Text style={styles.statLabel}>FOLLOWERS</Text></View><View style={styles.stat}><Text style={styles.statValue}>0</Text><Text style={styles.statLabel}>FOLLOWING</Text></View></View>
    {demoAccount ? <View style={styles.accessCard}><Ionicons name="key-outline" size={22} color={colors.accent} /><View style={styles.privacyCopy}><Text style={styles.privacyTitle}>Demo access</Text><Text style={styles.privacyText}>{demoAccount.description}</Text><Text style={styles.accessLine}>Premium: {isPremium ? 'active' : 'free tier'} · Moderation: {isModerator ? 'allowed' : 'not allowed'}</Text></View></View> : null}
    {profile?.interests?.length ? <View style={styles.section}><Text style={styles.sectionTitle}>FITNESS INTERESTS</Text><View style={styles.tags}>{profile.interests.map((interest) => <View style={styles.tag} key={interest}><Text style={styles.tagText}>{interest}</Text></View>)}</View></View> : null}
    <View style={styles.privacy}><Ionicons name="shield-checkmark" size={23} color={colors.success} /><View style={styles.privacyCopy}><Text style={styles.privacyTitle}>Your health details are private</Text><Text style={styles.privacyText}>Age, measurements, goals, diet and allergies are protected by account-level access rules.</Text></View></View>
    <View style={styles.buttons}>
      {configured ? <PrimaryButton label="Edit profile & goals" onPress={() => router.push({ pathname: '/onboarding', params: { mode: 'edit' } })} /> : null}
      {isModerator ? <PrimaryButton label={isOwner ? 'Open owner moderation view' : 'Open moderation console'} onPress={() => router.push('/moderation')} /> : null}
      <PrimaryButton label="Creator studio" variant="ghost" onPress={() => router.push('/upload')} />
      <PrimaryButton label="Settings & privacy" variant="ghost" onPress={() => router.push('/settings')} />
      <PrimaryButton label={isPremium ? 'View Fitness+ entitlement' : 'Preview Fitness+'} variant="ghost" onPress={() => router.push('/premium')} />
      {configured || demoAccount ? <PrimaryButton label="Log out" variant="danger" onPress={confirmSignOut} /> : <PrimaryButton label="Choose a demo identity" variant="ghost" onPress={() => router.push('/(auth)/login')} />}
    </View>
  </AppScreen>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTools: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  demoPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: 'rgba(245,217,10,.12)', borderWidth: 1, borderColor: 'rgba(245,217,10,.35)' },
  demoPillText: { ...typography.label, color: colors.accent, fontSize: 8 },
  identity: { alignItems: 'center', marginVertical: spacing.xl },
  avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.accent, borderWidth: 4, borderColor: '#2B2D20', alignItems: 'center', justifyContent: 'center' },
  initial: { color: colors.background, fontSize: 36, fontWeight: '900' },
  name: { ...typography.title, color: colors.text, marginTop: spacing.md },
  username: { color: colors.accent, fontWeight: '700', marginTop: 4 },
  email: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm },
  role: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.accent, marginTop: spacing.sm },
  roleText: { ...typography.label, color: colors.background, fontSize: 7 },
  stats: { flexDirection: 'row', backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: spacing.md },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: colors.text, fontSize: 20, fontWeight: '900' },
  statLabel: { ...typography.label, color: colors.textMuted, fontSize: 8, marginTop: 4 },
  accessCard: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: '#242419', borderWidth: 1, borderColor: 'rgba(245,217,10,.25)', marginTop: spacing.xl },
  accessLine: { color: colors.accent, fontSize: 10, fontWeight: '800', marginTop: spacing.sm },
  section: { marginTop: spacing.xl },
  sectionTitle: { ...typography.label, color: colors.textMuted },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  tag: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.glass, borderRadius: radius.pill },
  tagText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  privacy: { flexDirection: 'row', gap: spacing.md, backgroundColor: 'rgba(110,231,168,.07)', borderWidth: 1, borderColor: 'rgba(110,231,168,.2)', padding: spacing.md, borderRadius: radius.md, marginTop: spacing.xl },
  privacyCopy: { flex: 1 },
  privacyTitle: { color: colors.text, fontWeight: '800' },
  privacyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  buttons: { gap: spacing.md, marginTop: spacing.xl },
});
