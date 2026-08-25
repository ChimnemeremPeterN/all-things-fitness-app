import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '@/constants';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row}>
      <View style={[styles.mark, compact && styles.compactMark]}>
        <Text style={[styles.monogram, compact && styles.compactMonogram]}>ATF</Text>
      </View>
      {!compact && (
        <View>
          <Text style={styles.name}>ALL THINGS</Text>
          <Text style={styles.nameAccent}>FITNESS</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mark: { width: 58, height: 58, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-4deg' }] },
  compactMark: { width: 38, height: 38, borderRadius: 11 },
  monogram: { color: colors.background, fontSize: 20, fontWeight: '900', letterSpacing: -1 },
  compactMonogram: { fontSize: 13 },
  name: { ...typography.label, color: colors.text, fontSize: 15, lineHeight: 17 },
  nameAccent: { color: colors.accent, fontWeight: '900', fontSize: 24, lineHeight: 25, letterSpacing: -0.8 },
});
