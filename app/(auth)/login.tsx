import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AuthShell, FormField, PrimaryButton } from '@/components';
import { colors, radius, spacing, typography } from '@/constants';
import { demoAccounts, type DemoAccountCredential, useAuth } from '@/features/auth';
import { getErrorMessage } from '@/utilities';

const roleIcons = { user: 'person-outline', premium: 'diamond-outline', moderator: 'shield-checkmark-outline', owner: 'business-outline' } as const;

export default function LoginScreen() {
  const { configured, session, profile, signIn } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<DemoAccountCredential>(demoAccounts[0]);
  const [email, setEmail] = useState(configured ? '' : demoAccounts[0].email);
  const [password, setPassword] = useState(configured ? '' : demoAccounts[0].password);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session && profile) router.replace(profile.onboarding_completed ? '/(tabs)' : '/onboarding');
  }, [profile, session]);

  const chooseIdentity = (account: DemoAccountCredential) => {
    setSelectedAccount(account);
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  const submit = async () => {
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const signedInRole = await signIn(email, password);
      if (!configured) router.replace(signedInRole === 'moderator' || signedInRole === 'owner' ? '/moderation' : '/(tabs)');
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  };

  return <AuthShell eyebrow="DEMO IDENTITIES" title="Choose how to enter." description={configured ? 'Log in to your account.' : 'Switch between four client-demo roles. These identities are local and never contact a paid service.'}>
    {!configured ? <View style={styles.accounts}>{demoAccounts.map((account) => {
      const selected = selectedAccount.id === account.id;
      return <Pressable key={account.id} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => chooseIdentity(account)} style={[styles.account, selected && styles.accountSelected]}>
        <View style={[styles.roleIcon, selected && styles.roleIconSelected]}><Ionicons name={roleIcons[account.role]} size={20} color={selected ? colors.background : colors.accent} /></View>
        <View style={styles.accountCopy}><Text style={styles.accountTitle}>{account.roleLabel}</Text><Text style={styles.accountDescription}>{account.description}</Text><Text style={styles.accountEmail}>{account.email}</Text></View>
        <Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={21} color={selected ? colors.accent : colors.textMuted} />
      </Pressable>;
    })}</View> : null}
    <FormField label="EMAIL" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
    <FormField label="PASSWORD" value={password} onChangeText={setPassword} placeholder="Your password" secureTextEntry autoComplete="current-password" onSubmitEditing={submit} />
    {!configured ? <Text selectable style={styles.passwordHint}>Demo password: {selectedAccount.password}</Text> : null}
    {error ? <Text style={styles.error}>{error}</Text> : null}
    {configured ? <Pressable onPress={() => router.push('/(auth)/forgot-password')}><Text style={styles.link}>Forgot password?</Text></Pressable> : null}
    <PrimaryButton label={configured ? 'Log in' : `Continue as ${selectedAccount.roleLabel}`} onPress={submit} loading={loading} />
    {configured
      ? <Pressable onPress={() => router.replace('/(auth)/sign-up')} style={styles.center}><Text style={styles.muted}>New here? <Text style={styles.link}>Create an account</Text></Text></Pressable>
      : <Pressable onPress={() => router.replace('/(tabs)')} style={styles.center}><Text style={styles.link}>Continue without an identity</Text></Pressable>}
  </AuthShell>;
}

const styles = StyleSheet.create({
  accounts: { gap: spacing.sm },
  account: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass },
  accountSelected: { borderColor: colors.accent, backgroundColor: '#242419' },
  roleIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(245,217,10,.09)', alignItems: 'center', justifyContent: 'center' },
  roleIconSelected: { backgroundColor: colors.accent },
  accountCopy: { flex: 1 },
  accountTitle: { ...typography.heading, color: colors.text, fontSize: 14 },
  accountDescription: { color: colors.textMuted, fontSize: 10, lineHeight: 14, marginTop: 2 },
  accountEmail: { color: colors.accent, fontSize: 9, fontWeight: '700', marginTop: 5 },
  passwordHint: { color: colors.textMuted, fontSize: 10 },
  error: { color: colors.danger, fontSize: 13 },
  link: { color: colors.accent, fontWeight: '800' },
  muted: { color: colors.textMuted },
  center: { alignItems: 'center', padding: spacing.md },
});
