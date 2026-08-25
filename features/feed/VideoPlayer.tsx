import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, radius, spacing } from '@/constants';

export function VideoPlayer({ source, shouldPlay, muted, onTogglePaused }: { source: string; shouldPlay: boolean; muted: boolean; onTogglePaused: () => void }) {
  const [firstFrame, setFirstFrame] = useState(false); const [failed, setFailed] = useState(false);
  const player = useVideoPlayer({ uri: source, useCaching: true }, (instance) => { instance.loop = true; instance.muted = muted; });
  useEffect(() => { player.muted = muted; }, [muted, player]);
  useEffect(() => { if (shouldPlay && !failed) player.play(); else player.pause(); return () => player.pause(); }, [failed, player, shouldPlay]);
  useEffect(() => { const listener = player.addListener('statusChange', ({ status }) => { setFailed(status === 'error'); if (status === 'loading') setFirstFrame(false); }); return () => listener.remove(); }, [player]);
  const retry = async () => { setFailed(false); setFirstFrame(false); await player.replaceAsync({ uri: source, useCaching: true }); if (shouldPlay) player.play(); };
  return <View style={styles.container}>
    <VideoView player={player} style={StyleSheet.absoluteFill} nativeControls={false} contentFit="cover" playsInline onFirstFrameRender={() => setFirstFrame(true)} />
    {!firstFrame && !failed ? <View style={styles.state}><ActivityIndicator size="large" color={colors.accent} /><Text style={styles.stateText}>Loading video…</Text></View> : null}
    {failed ? <View style={styles.state}><View style={styles.errorIcon}><Ionicons name="cloud-offline-outline" size={28} color={colors.text} /></View><Text style={styles.errorTitle}>Video took a rest.</Text><Text style={styles.stateText}>Check your connection and try again.</Text><Pressable onPress={retry} style={styles.retry}><Text style={styles.retryText}>Retry</Text></Pressable></View> : null}
    {!failed ? <Pressable accessibilityRole="button" accessibilityLabel={shouldPlay ? 'Pause video' : 'Play video'} onPress={onTogglePaused} style={StyleSheet.absoluteFill}>{!shouldPlay && firstFrame ? <View style={styles.pauseIcon}><Ionicons name="play" size={34} color={colors.background} /></View> : null}</Pressable> : null}
  </View>;
}
const styles = StyleSheet.create({ container: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#11130E' }, state: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#11130E', gap: spacing.sm }, stateText: { color: colors.textMuted, fontSize: 12 }, errorIcon: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.glass, marginBottom: spacing.sm }, errorTitle: { color: colors.text, fontSize: 17, fontWeight: '800' }, retry: { marginTop: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: colors.accent }, retryText: { color: colors.background, fontWeight: '900' }, pauseIcon: { position: 'absolute', top: '46%', alignSelf: 'center', width: 68, height: 68, borderRadius: 34, backgroundColor: 'rgba(245,217,10,.88)', alignItems: 'center', justifyContent: 'center' } });
