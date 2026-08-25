import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { AuthShell, ConfigNotice, FormField, PrimaryButton } from '@/components';
import { colors, spacing } from '@/constants';
import { useAuth } from '@/features/auth';
import { getErrorMessage } from '@/utilities';

export default function SignUpScreen() {
  const { configured, signUp } = useAuth();
  const [name, setName] = useState(''); const [username, setUsername] = useState(''); const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!name.trim() || username.trim().length < 3) { setError('Add your name and a username with at least 3 characters.'); return; }
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (password.length < 8) { setError('Use at least 8 characters for your password.'); return; }
    if (password !== confirm) { setError('Your passwords do not match.'); return; }
    setLoading(true); setError('');
    try {
      const { needsVerification } = await signUp(email, password, name, username);
      router.replace(needsVerification ? { pathname: '/(auth)/verify-email', params: { email } } : '/onboarding');
    } catch (caught) { setError(getErrorMessage(caught)); } finally { setLoading(false); }
  };
  return <AuthShell eyebrow="JOIN THE COMMUNITY" title="Create your account." description="Start with the essentials. You’ll personalize your plan next.">
    {!configured ? <ConfigNotice /> : null}
    <FormField label="NAME" value={name} onChangeText={setName} placeholder="Alex Morgan" autoComplete="name" />
    <FormField label="USERNAME" value={username} onChangeText={(value) => setUsername(value.replace(/[^a-zA-Z0-9_]/g, ''))} placeholder="alexmoves" autoCapitalize="none" />
    <FormField label="EMAIL" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
    <FormField label="PASSWORD" value={password} onChangeText={setPassword} placeholder="8+ characters" secureTextEntry autoComplete="new-password" />
    <FormField label="CONFIRM PASSWORD" value={confirm} onChangeText={setConfirm} placeholder="Repeat password" secureTextEntry onSubmitEditing={submit} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <PrimaryButton label="Create account" onPress={submit} loading={loading} disabled={!configured} />
    <Text style={styles.terms}>By continuing, you agree to community and privacy standards.</Text>
    <Pressable onPress={() => router.replace('/(auth)/login')} style={styles.center}><Text style={styles.muted}>Already a member? <Text style={styles.link}>Log in</Text></Text></Pressable>
  </AuthShell>;
}
const styles = StyleSheet.create({ error: { color: colors.danger, fontSize: 13 }, link: { color: colors.accent, fontWeight: '800' }, muted: { color: colors.textMuted }, center: { alignItems: 'center', padding: spacing.md }, terms: { color: colors.textMuted, fontSize: 11, lineHeight: 17, textAlign: 'center' } });
