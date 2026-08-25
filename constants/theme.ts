export const colors = {
  background: '#090A0A',
  surface: '#131515',
  surfaceElevated: '#1B1E1D',
  glass: 'rgba(255,255,255,0.07)',
  accent: '#F5D90A',
  accentSoft: '#FFF27A',
  text: '#F8F8F3',
  textMuted: '#A6AAA7',
  border: 'rgba(255,255,255,0.10)',
  success: '#6EE7A8',
  danger: '#FF6B6B',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;
export const typography = {
  display: { fontSize: 44, lineHeight: 46, fontWeight: '900' as const, letterSpacing: -1.8 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const, letterSpacing: -0.7 },
  heading: { fontSize: 19, lineHeight: 24, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '700' as const, letterSpacing: 1.1 },
} as const;
export const shadows = {
  card: { shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 8 },
} as const;

export const theme = { colors, spacing, radius, typography, shadows } as const;
