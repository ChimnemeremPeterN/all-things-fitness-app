import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { AuthShell, LoadingScreen, PrimaryButton } from '@/components';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/utilities';

export default function AuthCallbackScreen() {
  const { code } = useLocalSearchParams<{ code?: string }>(); const [error, setError] = useState('');
  useEffect(() => {
    const finish = async () => {
      try {
        if (!supabase) throw new Error('Supabase is not configured.');
        if (code) { const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code); if (exchangeError) throw exchangeError; }
        router.replace('/onboarding');
      } catch (caught) { setError(getErrorMessage(caught)); }
    };
    void finish();
  }, [code]);
  if (!error) return <LoadingScreen label="Verifying your account…" />;
  return <AuthShell eyebrow="LINK EXPIRED" title="We couldn’t verify that link." description={error}><PrimaryButton label="Return to login" onPress={() => router.replace('/(auth)/login')} /></AuthShell>;
}
