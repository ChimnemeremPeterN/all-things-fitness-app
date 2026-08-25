# All Things Fitness

A cross-platform fitness and community app built with Expo, React Native, TypeScript, and Supabase. It combines fitness content, recipes, social interactions, authentication, nutrition tracking, and client-side demo experiences.


## Phase 2 setup

1. Create a Supabase project.
2. Run `supabase/migrations/202608120001_phase_2_auth_profiles.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env` and add the project URL and **publishable/anon** key. Never add a service-role key to the app.
4. In Supabase Authentication URL Configuration, add these redirect URLs:
   - `allthingsfitness://callback`
   - `allthingsfitness://update-password`
   - Your Expo development URL when testing through Expo Go.
5. Start the app with `pnpm start`.

Email confirmation can be enabled in Supabase. Sessions are stored with Expo SecureStore on Android/iOS and browser storage in the web preview.

## Phase 3 client demo

When Supabase environment variables are absent, the app intentionally opens in client demo mode. The main tabs and full-screen Feed remain available without authentication, storage, or other paid cloud services.

The Feed uses public sample footage and local in-memory likes, saves, follows, and comments. Replace `features/feed/mockFeed.ts` with licensed fitness footage before a public release.

## Phases 4–10 client demo

All roadmap screens and interactions are available without paid services. Data created during the demo is held in memory and resets when the app reloads. No cloud file transfer, AI-provider call, push message, analytics event, store purchase or production moderation action occurs.

### Demo identities

The login screen includes four local identities for client walkthroughs:

| Identity | Email | Password | Demo access |
| --- | --- | --- | --- |
| Regular user | `user@allthingsfitness.demo` | `DemoUser1!` | Free member experience; manual calorie tracking only |
| Paying user | `premium@allthingsfitness.demo` | `DemoPremium1!` | Fitness+ and AI calorie scanner, with no real charge |
| Moderator | `moderator@allthingsfitness.demo` | `DemoModerator1!` | Report queue and moderation preview |
| Owner / board | `owner@allthingsfitness.demo` | `DemoOwner1!` | Premium, AI calorie scanner and moderation oversight |

These credentials are intentionally public fixtures. They are not production accounts or a security boundary.

See `docs/PHASES_4_10_DEMO.md` for implemented demo scope and `docs/PRODUCTION_READINESS.md` for the funded production work that remains. The future backend draft is in `supabase/planning/phase_4_10_schema.sql` and must not be applied without security review.

## Checks

```sh
pnpm typecheck
```
