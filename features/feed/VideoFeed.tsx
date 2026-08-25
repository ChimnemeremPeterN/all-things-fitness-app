import { useCallback, useMemo, useRef, useState } from 'react';
import type { ViewToken } from 'react-native';
import { FlatList, Platform, Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ReportSheet } from '@/components';
import { colors, spacing, typography } from '@/constants';
import type { FeedMode, FeedVideo, ReportTarget } from '@/types';
import { CommentsSheet } from './CommentsSheet';
import { CreatorPreviewSheet } from './CreatorPreviewSheet';
import { FeedHeader } from './FeedHeader';
import { forYouVideos } from './mockFeed';
import { VideoFeedItem } from './VideoFeedItem';

const selection = () => { void Haptics.selectionAsync().catch(() => undefined); };

export function VideoFeed() {
  const { videoId } = useLocalSearchParams<{ videoId?: string }>(); const initialIndex = Math.max(0, forYouVideos.findIndex((video) => video.id === videoId));
  const { height } = useWindowDimensions(); const [mode, setMode] = useState<FeedMode>('for-you'); const [activeIndex, setActiveIndex] = useState(initialIndex); const [screenFocused, setScreenFocused] = useState(true); const [liked, setLiked] = useState<Record<string, boolean>>({}); const [saved, setSaved] = useState<Record<string, boolean>>({}); const [following, setFollowing] = useState<Record<string, boolean>>({}); const [muted, setMuted] = useState(false); const [commentsVideo, setCommentsVideo] = useState<FeedVideo | null>(null); const [creatorVideo, setCreatorVideo] = useState<FeedVideo | null>(null); const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  useFocusEffect(useCallback(() => { setScreenFocused(true); return () => setScreenFocused(false); }, []));
  const isFollowing = useCallback((video: FeedVideo) => following[video.id] ?? video.isFollowing, [following]);
  const data = useMemo(() => mode === 'for-you' ? forYouVideos : forYouVideos.filter(isFollowing), [isFollowing, mode]);
  const switchMode = (next: FeedMode) => { if (next === mode) return; selection(); setMode(next); setActiveIndex(0); };
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80, minimumViewTime: 120 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken<FeedVideo>[] }) => { const first = viewableItems.find((item) => item.isViewable && typeof item.index === 'number'); if (typeof first?.index === 'number') setActiveIndex(first.index); }).current;
  const toggle = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, id: string, current: boolean) => { selection(); setter((values) => ({ ...values, [id]: !current })); };
  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)');
  const share = async (video: FeedVideo) => { try { await Share.share({ title: `${video.creator.displayName} on All Things Fitness`, message: `${video.caption}\n\n${video.hashtags.map((tag) => `#${tag}`).join(' ')}\n\nShared from All Things Fitness` }); } catch { /* The native share sheet can be dismissed safely. */ } };
  return <View style={styles.screen}>
    {data.length ? <FlatList key={mode} data={data} renderItem={({ item, index }) => <VideoFeedItem video={item} height={height} active={index === activeIndex} screenFocused={screenFocused && !commentsVideo && !creatorVideo && !reportTarget} liked={Boolean(liked[item.id])} saved={Boolean(saved[item.id])} following={isFollowing(item)} muted={muted} onLike={() => toggle(setLiked, item.id, Boolean(liked[item.id]))} onSave={() => toggle(setSaved, item.id, Boolean(saved[item.id]))} onFollow={() => toggle(setFollowing, item.id, isFollowing(item))} onComments={() => setCommentsVideo(item)} onShare={() => void share(item)} onReport={() => setReportTarget({ type: 'video', id: item.id, label: 'video' })} onCreator={() => setCreatorVideo(item)} onToggleMuted={() => setMuted((value) => !value)} />} keyExtractor={(item) => item.id} pagingEnabled showsVerticalScrollIndicator={false} decelerationRate="fast" snapToInterval={height} snapToAlignment="start" disableIntervalMomentum onViewableItemsChanged={onViewableItemsChanged} viewabilityConfig={viewabilityConfig} initialScrollIndex={mode === 'for-you' ? initialIndex : 0} initialNumToRender={1} maxToRenderPerBatch={2} windowSize={3} updateCellsBatchingPeriod={60} removeClippedSubviews={Platform.OS === 'android'} getItemLayout={(_, index) => ({ length: height, offset: height * index, index })} /> : <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="people-outline" size={32} color={colors.accent} /></View><Text style={styles.emptyTitle}>Your following feed is quiet.</Text><Text style={styles.emptyText}>Follow a creator from For You and their videos will appear here.</Text></View>}
    <FeedHeader mode={mode} onModeChange={switchMode} onBack={goBack} onHome={() => router.replace('/(tabs)')} />
    <CommentsSheet video={commentsVideo} visible={Boolean(commentsVideo)} onClose={() => setCommentsVideo(null)} />
    <CreatorPreviewSheet video={creatorVideo} visible={Boolean(creatorVideo)} following={creatorVideo ? isFollowing(creatorVideo) : false} onFollow={() => { if (creatorVideo) toggle(setFollowing, creatorVideo.id, isFollowing(creatorVideo)); }} onViewProfile={() => { if (creatorVideo) { const username = creatorVideo.creator.username; setCreatorVideo(null); router.push({ pathname: '/creator/[username]', params: { username } }); } }} onReport={() => { if (creatorVideo) { setReportTarget({ type: 'creator', id: creatorVideo.creator.username, label: `@${creatorVideo.creator.username}` }); setCreatorVideo(null); } }} onClose={() => setCreatorVideo(null)} />
    <ReportSheet target={reportTarget} onClose={() => setReportTarget(null)} />
  </View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#080909' }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }, emptyIcon: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.glass, marginBottom: spacing.lg }, emptyTitle: { ...typography.heading, color: colors.text }, emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center', maxWidth: 290, marginTop: spacing.sm } });
