import type { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from './BrandMark';
import { colors, spacing, typography } from '@/constants';

export function AuthShell({ eyebrow, title, description, children, footer }: PropsWithChildren<{ eyebrow: string; title: string; description?: string; footer?: ReactNode }>) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <BrandMark compact />
          <View style={styles.heading}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text>{description ? <Text style={styles.description}>{description}</Text> : null}</View>
          <View style={styles.form}>{children}</View>
          {footer}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1 }, content: { flexGrow: 1, padding: spacing.lg, paddingBottom: spacing.xxl }, heading: { marginTop: spacing.xxl, marginBottom: spacing.xl }, eyebrow: { ...typography.label, color: colors.accent, marginBottom: spacing.sm }, title: { ...typography.title, color: colors.text }, description: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }, form: { gap: spacing.md } });
