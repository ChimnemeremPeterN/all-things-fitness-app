import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants';
import type { FeedVideo } from '@/types';
import { FollowButton } from './FollowButton';
import { formatCount } from './formatCount';

function Action({ icon, activeIcon, active, label, count, onPress }: { icon: keyof typeof Ionicons.glyphMap; activeIcon?: keyof typeof Ionicons.glyphMap; active?: boolean; label: string; count?: number; onPress: () => void }) { return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: active }} onPress={onPress} style={({ pressed }) => [styles.action, pressed && styles.pressed]}><View style={styles.actionIcon}><Ionicons name={active && activeIcon ? activeIcon : icon} size={27} color={active ? '#FF4D67' : colors.text} /></View>{typeof count === 'number' ? <Text style={styles.count}>{formatCount(count)}</Text> : null}</Pressable>; }

export function VideoActions({ video, liked, saved, following, onCreator, onFollow, onLike, onComments, onSave, onShare, onReport }: { video: FeedVideo; liked: boolean; saved: boolean; following: boolean; onCreator: () => void; onFollow: () => void; onLike: () => void; onComments: () => void; onSave: () => void; onShare: () => void; onReport: () => void }) {
  return <View style={styles.bar}>
    <View><Pressable accessibilityRole="button" accessibilityLabel={`Open ${video.creator.displayName}'s profile`} onPress={onCreator} style={[styles.avatar, { backgroundColor: video.creator.accent }]}><Text style={styles.initials}>{video.creator.initials}</Text></Pressable><View style={styles.follow}><FollowButton following={following} onPress={onFollow} /></View></View>
    <Action icon="heart-outline" activeIcon="heart" active={liked} label={liked ? 'Unlike video' : 'Like video'} count={video.likes + (liked ? 1 : 0)} onPress={onLike} />
    <Action icon="chatbubble-outline" label="Open comments" count={video.comments.length} onPress={onComments} />
    <Action icon="bookmark-outline" activeIcon="bookmark" active={saved} label={saved ? 'Remove saved video' : 'Save video'} onPress={onSave} />
    <Action icon="share-social-outline" label="Share video" count={video.shares} onPress={onShare} />
    <Action icon="ellipsis-horizontal" label="More and report" onPress={onReport} />
  </View>;
}
const styles = StyleSheet.create({ bar: { width: 54, alignItems: 'center', gap: spacing.md }, avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: colors.text, alignItems: 'center', justifyContent: 'center' }, initials: { color: colors.background, fontSize: 12, fontWeight: '900' }, follow: { position: 'absolute', alignSelf: 'center', bottom: -10 }, action: { alignItems: 'center', minWidth: 48 }, actionIcon: { width: 43, height: 43, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.25)' }, count: { color: colors.text, fontSize: 10, fontWeight: '800', marginTop: 2, textShadowColor: '#000', textShadowRadius: 4 }, pressed: { opacity: .65, transform: [{ scale: .94 }] } });
