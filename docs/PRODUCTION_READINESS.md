# Production readiness and funding boundary

Phases 4–10 are client-demo complete, not production-connected. The following work must remain blocked until it is funded and the necessary accounts and legal decisions exist.

## Backend and security

- Review and apply `supabase/planning/phase_4_10_schema.sql` as real migrations.
- Write and adversarially test every RLS policy; test cross-account access and storage object paths.
- Provision private/public storage buckets, upload limits, MIME validation, signed URLs, transcoding and malware controls.
- Implement server-side moderation roles, audit logs, rate limits and abuse prevention.
- Run dependency, secret, privacy and penetration reviews. Never ship service-role or AI-provider keys.

## Media and content

- Replace public sample footage with licensed content and creator releases.
- Build upload processing, thumbnails, retry queues, deletion propagation and content retention rules.
- Establish community guidelines, copyright takedown, appeals and emergency-safety procedures.

## AI and nutrition

- Select funded AI and food-data providers with contracts, privacy terms and cost limits.
- Evaluate food-estimation accuracy across cuisines, lighting, serving sizes and edge cases.
- Add medical/legal review, safety evals, refusal behavior and prominent estimation disclaimers.
- Keep AI responses non-diagnostic and provide escalation to qualified professionals.

## Billing

- Implement Apple StoreKit and Google Play Billing through a server-verified entitlement service.
- Finalize pricing, trial, refund, cancellation, renewal and subscription disclosure language.
- Test purchase, restore, grace period, billing retry, refund and cross-device scenarios.

## Notifications, analytics and reliability

- Provision push credentials and user-consent flows; respect every notification preference.
- Select privacy-reviewed analytics and error monitoring, define retention, and implement deletion/export.
- Add offline/retry behavior, observability, backups, disaster recovery and incident response.
- Run unit, integration, E2E, accessibility, localization, low-memory and poor-network testing.

## Store release

- Create production icons, screenshots, privacy policy, terms, support URL and account-deletion flow.
- Complete Apple privacy manifests/questionnaires and Google Play data-safety declarations.
- Test signed Android and iOS release builds on representative physical devices.
- Obtain App Store/Play accounts and perform staged internal, beta and production rollouts.

Until these items are complete, the product must be presented as a functional prototype/client demo—not a production health service.
