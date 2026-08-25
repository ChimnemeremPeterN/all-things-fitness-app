import { forwardRef } from 'react';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/constants';

export const FormField = forwardRef<TextInput, TextInputProps & { label: string; error?: string; containerStyle?: StyleProp<ViewStyle> }>(function FormField({ label, error, multiline, style, containerStyle, ...props }, ref) {
  return (
    <View style={[styles.wrap, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput ref={ref} placeholderTextColor={colors.textMuted} selectionColor={colors.accent} multiline={multiline} style={[styles.input, multiline && styles.multiline, error && styles.inputError, style]} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});
const styles = StyleSheet.create({
  wrap: { gap: spacing.sm }, label: { ...typography.label, color: colors.textMuted, fontSize: 10 },
  input: { minHeight: 52, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass, color: colors.text, paddingHorizontal: spacing.md, fontSize: 16 },
  multiline: { minHeight: 110, paddingTop: spacing.md, textAlignVertical: 'top' }, inputError: { borderColor: colors.danger }, error: { color: colors.danger, fontSize: 12 },
});
