import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import { AuthProvider } from '@/features/auth';
import { DemoStoreProvider } from '@/features/demo';
import { AppErrorBoundary } from '@/components';

export default function RootLayout() {
  return (
    <AppErrorBoundary><GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DemoStoreProvider><AuthProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthProvider></DemoStoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView></AppErrorBoundary>
  );
}
