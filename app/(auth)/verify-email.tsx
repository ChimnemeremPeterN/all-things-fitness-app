import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { AuthShell, PrimaryButton } from '@/components';
import { colors } from '@/constants';
export default function VerifyEmailScreen() { const { email } = useLocalSearchParams<{ email?: string }>(); return <AuthShell eyebrow="ONE LAST STEP" title="Verify your email." description={`We sent a confirmation link to ${email ?? 'your inbox'}. Open it on this device to continue.`}><Text style={styles.note}>The link returns securely to All Things Fitness. You can then complete your personalized setup.</Text><PrimaryButton label="I’ve verified—log in" onPress={() => router.replace('/(auth)/login')} /></AuthShell>; }
const styles = StyleSheet.create({ note: { color: colors.textMuted, lineHeight: 22 } });
