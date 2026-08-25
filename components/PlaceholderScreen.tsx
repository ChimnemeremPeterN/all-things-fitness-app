import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreen } from './AppScreen';
import { BrandMark } from './BrandMark';
import { colors, radius, spacing, typography } from '@/constants';

type IconName = keyof typeof Ionicons.glyphMap;
export function PlaceholderScreen({ eyebrow, title, description, icon }: { eyebrow: string; title: string; description: string; icon: IconName }) {
  return (
    <AppScreen contentStyle={styles.screen}>
      <BrandMark compact />
      <View style={styles.hero}>
        <View style={styles.icon}><Ionicons name={icon} size={32} color={colors.background} /></View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>FOUNDATION READY</Text>
        <Text style={styles.cardText}>This route is connected and ready for its feature phase.</Text>
      </View>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  screen: { flexGrow: 1 }, hero: { flex: 1, justifyContent: 'center', paddingVertical: spacing.xxl },
  icon: { width: 64, height: 64, borderRadius: radius.lg, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  eyebrow: { ...typography.label, color: colors.accent, marginBottom: spacing.sm }, title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
  description: { ...typography.body, color: colors.textMuted, maxWidth: 330 },
  card: { padding: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  cardTitle: { ...typography.label, color: colors.text }, cardText: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
});
