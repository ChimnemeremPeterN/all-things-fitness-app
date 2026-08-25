export type AnalyticsEvent = 'screen_view' | 'feed_view' | 'food_logged' | 'recipe_saved' | 'event_rsvp' | 'report_submitted' | 'premium_viewed';
export interface AnalyticsService { track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>): void; identify(userId: string): void; reset(): void; }
export const disabledAnalytics: AnalyticsService = { track: () => undefined, identify: () => undefined, reset: () => undefined };
