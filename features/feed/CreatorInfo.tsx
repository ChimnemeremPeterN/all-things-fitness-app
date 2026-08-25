import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/constants';
import type { FeedVideo } from '@/types';

export function CreatorInfo({ creator, onPress }: { creator: FeedVideo['creator']; onPress: () => void }) { return <Pressable accessibilityRole="button" accessibilityLabel={`Open ${creator.displayName}'s profile`} onPress={onPress} style={styles.row}><Text style={styles.username}>@{creator.username}</Text>{creator.verified ? <Ionicons name="checkmark-circle" size={15} color={colors.accent} /> : null}<Text style={styles.name}>{creator.displayName}</Text></Pressable>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, username: { color: colors.text, fontSize: 16, fontWeight: '900' }, name: { color: 'rgba(255,255,255,.65)', fontSize: 12, marginLeft: spacing.xs } });
