import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants';
import type { FeedMode } from '@/types';

function NavigationButton({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}><Ionicons name={icon} size={22} color={colors.text} /></Pressable>;
}

export function FeedHeader({ mode, onModeChange, onBack, onHome }: { mode: FeedMode; onModeChange: (mode: FeedMode) => void; onBack: () => void; onHome: () => void }) {
  return <SafeAreaView pointerEvents="box-none" edges={['top']} style={styles.safe}><View style={styles.header}>
    <NavigationButton icon="arrow-back" label="Back to previous screen" onPress={onBack} />
    <View style={styles.switcher} accessibilityRole="tablist">
      <Pressable accessibilityRole="tab" accessibilityState={{ selected: mode === 'following' }} onPress={() => onModeChange('following')} style={styles.tab}><Text style={[styles.tabText, mode === 'following' && styles.activeText]}>Following</Text>{mode === 'following' ? <View style={styles.indicator} /> : null}</Pressable>
      <Pressable accessibilityRole="tab" accessibilityState={{ selected: mode === 'for-you' }} onPress={() => onModeChange('for-you')} style={styles.tab}><Text style={[styles.tabText, mode === 'for-you' && styles.activeText]}>For You</Text>{mode === 'for-you' ? <View style={styles.indicator} /> : null}</Pressable>
    </View>
    <NavigationButton icon="home" label="Go to Home" onPress={onHome} />
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }, header: { height: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md }, navButton: { width: 43, height: 43, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,5,5,.4)', borderWidth: 1, borderColor: colors.border }, switcher: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, tab: { alignItems: 'center', paddingVertical: 10 }, tabText: { color: 'rgba(255,255,255,.65)', fontSize: 15, fontWeight: '700' }, activeText: { color: colors.text, fontWeight: '900' }, indicator: { position: 'absolute', bottom: 3, width: 24, height: 3, borderRadius: 2, backgroundColor: colors.accent }, pressed: { opacity: .65 } });
