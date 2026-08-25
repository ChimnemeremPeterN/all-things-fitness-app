import { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '@/constants';
import type { FeedVideo } from '@/types';
import { CreatorInfo } from './CreatorInfo';
import { VideoActions } from './VideoActions';
import { VideoCaption } from './VideoCaption';
import { VideoPlayer } from './VideoPlayer';

type Props = { video: FeedVideo; height: number; active: boolean; screenFocused: boolean; liked: boolean; saved: boolean; following: boolean; muted: boolean; onLike: () => void; onSave: () => void; onFollow: () => void; onComments: () => void; onShare: () => void; onReport: () => void; onCreator: () => void; onToggleMuted: () => void };

export const VideoFeedItem = memo(function VideoFeedItem({ video, height, active, screenFocused, liked, saved, following, muted, onLike, onSave, onFollow, onComments, onShare, onReport, onCreator, onToggleMuted }: Props) {
  const [manuallyPaused, setManuallyPaused] = useState(false);
  useEffect(() => { if (!active) setManuallyPaused(false); }, [active]);
  const shouldPlay = active && screenFocused && !manuallyPaused;
  return <View style={[styles.item, { height }]}>
    <VideoPlayer source={video.videoUrl} shouldPlay={shouldPlay} muted={muted} onTogglePaused={() => setManuallyPaused((value) => !value)} />
    <LinearGradient pointerEvents="none" colors={['rgba(0,0,0,.12)', 'transparent', 'rgba(0,0,0,.82)']} locations={[0, .43, 1]} style={StyleSheet.absoluteFill} />
    <View pointerEvents="box-none" style={styles.content}>
      <View style={styles.copy}><CreatorInfo creator={video.creator} onPress={onCreator} /><VideoCaption caption={video.caption} hashtags={video.hashtags} categories={video.categories} /><Pressable accessibilityRole="button" accessibilityLabel={muted ? 'Turn sound on' : 'Mute video'} onPress={onToggleMuted} style={styles.sound}><Ionicons name={muted ? 'volume-mute' : 'volume-high'} size={15} color={colors.text} /></Pressable></View>
      <VideoActions video={video} liked={liked} saved={saved} following={following} onCreator={onCreator} onFollow={onFollow} onLike={onLike} onComments={onComments} onSave={onSave} onShare={onShare} onReport={onReport} />
    </View>
  </View>;
});
const styles = StyleSheet.create({ item: { width: '100%', backgroundColor: '#11130E', overflow: 'hidden' }, content: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.lg, paddingBottom: 34 }, copy: { flex: 1, paddingRight: spacing.md }, sound: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,.35)', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md } });
