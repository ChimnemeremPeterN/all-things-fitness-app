export interface ErrorMonitoringService { capture(error: Error, context?: Record<string, unknown>): void; setUser(userId: string | null): void; }
export const consoleOnlyErrorMonitoring: ErrorMonitoringService = { capture: (error, context) => { if (__DEV__) console.error('[All Things Fitness]', error, context); }, setUser: () => undefined };
