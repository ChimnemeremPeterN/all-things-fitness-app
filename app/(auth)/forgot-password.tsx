import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AuthShell, ConfigNotice, FormField, PrimaryButton } from '@/components';
import { colors } from '@/constants';
import { useAuth } from '@/features/auth';
import { getErrorMessage } from '@/utilities';

export default function ForgotPasswordScreen() {
  const { configured, sendPasswordReset } = useAuth(); const [email, setEmail] = useState(''); const [loading, setLoading] = useState(false); const [message, setMessage] = useState(''); const [error, setError] = useState('');
  const submit = async () => { if (!email.includes('@')) { setError('Enter a valid email address.'); return; } setLoading(true); setError(''); try { await sendPasswordReset(email); setMessage('Check your inbox for a secure password reset link.'); } catch (caught) { setError(getErrorMessage(caught)); } finally { setLoading(false); } };
  return <AuthShell eyebrow="ACCOUNT RECOVERY" title="Reset your password." description="We’ll send a secure link to your email.">
    {!configured ? <ConfigNotice /> : null}<FormField label="EMAIL" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" onSubmitEditing={submit} />
    {error ? <Text style={styles.error}>{error}</Text> : null}{message ? <Text style={styles.success}>{message}</Text> : null}<PrimaryButton label="Send reset link" onPress={submit} loading={loading} disabled={!configured} />
  </AuthShell>;
}
const styles = StyleSheet.create({ error: { color: colors.danger }, success: { color: colors.success, lineHeight: 21 } });
