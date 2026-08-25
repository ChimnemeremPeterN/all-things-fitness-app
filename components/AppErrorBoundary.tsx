import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from './PrimaryButton';
import { colors, spacing, typography } from '@/constants';
import { consoleOnlyErrorMonitoring } from '@/services/errorMonitoring';

type State = { error: Error | null };
export class AppErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { consoleOnlyErrorMonitoring.capture(error, { componentStack: info.componentStack ?? '' }); }
  render() { if (!this.state.error) return this.props.children; return <View style={styles.screen}><Ionicons name="warning-outline" size={48} color={colors.accent} /><Text style={styles.title}>That screen needs a reset.</Text><Text style={styles.text}>Your demo data is still safe in this session. Try rendering the app again.</Text><View style={styles.button}><PrimaryButton label="Try again" onPress={() => this.setState({ error: null })} /></View></View>; }
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }, title: { ...typography.title, color: colors.text, textAlign: 'center', marginTop: spacing.lg }, text: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm }, button: { width: '100%', marginTop: spacing.lg } });
