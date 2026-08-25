# Phases 4–10 demo scope

- Phase 4: creator profiles, media picker/upload simulation, feed deep links, reports and shared in-session state.
- Phase 5: meal logging, daily macros/calories/water, weekly chart and reviewable camera/library/manual scanner demo.
- Phase 6: World Cookbook discovery, filtering, details, nutrition, saves, likes, ratings, sharing and creation.
- Phase 7: clubs, event discovery, RSVP, saves, sharing, reporting and device-calendar integration.
- Phase 8: deterministic offline assistant and nutrition-aware suggestions with medical-safety boundaries.
- Phase 9: free/premium entitlement architecture and presentation preview with all billing disabled.
- Phase 10: universal search, notification preferences, privacy, moderation queue, error boundary, service adapters, schema planning and production checklist.

All data created after launch is held in React memory and resets when the app reloads. This is deliberate until production infrastructure is funded.

## Demo identity matrix

- Regular user: free-tier member routes, profile and manual calorie tracking; the AI food/calorie scanner is locked.
- Paying user: member routes, AI food/calorie scanner and a simulated active Fitness+ entitlement; no payment occurs.
- Moderator: member routes plus the role-gated local moderation console.
- Owner / board: premium, AI food/calorie scanner and moderation access for oversight demonstrations.

Choose any identity on the login screen. Demo sessions reset on reload and do not provide production authorization.
