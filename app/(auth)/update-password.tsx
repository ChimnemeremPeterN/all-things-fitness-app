import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AuthShell, FormField, LoadingScreen, PrimaryButton } from '@/components';
import { colors } from '@/constants';
import { useAuth } from '@/features/auth';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/utilities';

export default function UpdatePasswordScreen() {
  const { code } = useLocalSearchParams<{ code?: string }>(); const { updatePassword } = useAuth(); const [ready, setReady] = useState(!code); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  useEffect(() => { if (!code || !supabase) return; supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => { if (exchangeError) setError(exchangeError.message); else setReady(true); }); }, [code]);
  const submit = async () => { if (password.length < 8) { setError('Use at least 8 characters.'); return; } if (password !== confirm) { setError('Your passwords do not match.'); return; } setLoading(true); setError(''); try { await updatePassword(password); router.replace('/(tabs)'); } catch (caught) { setError(getErrorMessage(caught)); } finally { setLoading(false); } };
  if (!ready && !error) return <LoadingScreen label="Securing your reset link…" />;
  return <AuthShell eyebrow="NEW PASSWORD" title="Choose a strong password." description="Use at least eight characters and avoid passwords you use elsewhere."><FormField label="NEW PASSWORD" value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" /><FormField label="CONFIRM PASSWORD" value={confirm} onChangeText={setConfirm} secureTextEntry onSubmitEditing={submit} />{error ? <Text style={styles.error}>{error}</Text> : null}<PrimaryButton label="Update password" onPress={submit} loading={loading} disabled={!ready} /></AuthShell>;
}
const styles = StyleSheet.create({ error: { color: colors.danger } });
