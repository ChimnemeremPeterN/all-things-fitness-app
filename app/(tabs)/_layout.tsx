import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { colors } from '@/constants';
import { LoadingScreen } from '@/components';
import { useAuth } from '@/features/auth';

const icons = { index: 'home', cookbook: 'restaurant', feed: 'play-circle', scanner: 'scan', profile: 'person' } as const;

export default function TabsLayout() {
  const { configured, initialized, session, profile, profileReady, isPremium } = useAuth();
  if (!initialized || (session && !profileReady)) return <LoadingScreen label="Loading your fitness space…" />;
  if (configured && !session) return <Redirect href="/(auth)/login" />;
  if (configured && !profile?.onboarding_completed) return <Redirect href="/onboarding" />;
  return (
    <Tabs backBehavior="history" screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: route.name === 'feed' ? { display: 'none' } : { backgroundColor: '#101212', borderTopColor: colors.border, height: 76, paddingTop: 8, paddingBottom: 10 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      tabBarIcon: ({ color, size, focused }) => <Ionicons name={route.name === 'scanner' && !isPremium ? 'lock-closed' : icons[route.name as keyof typeof icons] ?? 'ellipse'} color={color} size={focused ? size + 2 : size} />,
    })}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="cookbook" options={{ title: 'Cookbook' }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="scanner" options={{ title: isPremium ? 'Scanner' : 'Scanner+' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
