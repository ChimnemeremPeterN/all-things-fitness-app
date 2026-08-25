import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants';

export function AppScreen({ children, scroll = true, contentStyle }: PropsWithChildren<{ scroll?: boolean; contentStyle?: ViewStyle }>) {
  const content = scroll ? (
    <ScrollView contentContainerStyle={[styles.content, contentStyle]} showsVerticalScrollIndicator={false}>{children}</ScrollView>
  ) : children;
  return <SafeAreaView style={styles.safe} edges={['top']}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.lg, paddingBottom: 120 } });
