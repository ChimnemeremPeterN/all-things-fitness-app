import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '@/constants';
export function FollowButton({ following, onPress }: { following: boolean; onPress: () => void }) { return <Pressable accessibilityRole="button" accessibilityLabel={following ? 'Unfollow creator' : 'Follow creator'} onPress={onPress} style={({ pressed }) => [styles.button, following && styles.following, pressed && styles.pressed]}><Ionicons name={following ? 'checkmark' : 'add'} size={14} color={following ? colors.background : colors.text} /></Pressable>; }
const styles = StyleSheet.create({ button: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E84357', borderWidth: 2, borderColor: colors.text, alignItems: 'center', justifyContent: 'center' }, following: { backgroundColor: colors.accent }, pressed: { opacity: .65 } });
