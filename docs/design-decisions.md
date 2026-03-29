# Yggsii — Consolidated Design Decisions

This file collects completed, superseded, or historical design notes that no longer need their own files but are worth preserving for context.

## Reveal Surface Evaluation (2026-03-28)

The first reveal-ledger slice is in place with project-level records, scene and character linking, workspace search integration, and timeline/manuscript surface hints. The evaluation concluded: restraint is the right call. Small reveal-aware integrations are still sensible, but a heavier second-pass model should wait for a real user pressure point. No immediate action needed.

## Post-Launch Packaging Reset (2026-03-28)

The launch-story stack (product value note, landing-page draft, release blurb) is good enough for the current stage. Future heartbeats should bias back toward software trust, visual proof, and product-facing improvements. No more launch-prose accumulation until the product surface justifies another copy pass.

## Overnight Next-Step Bias (2026-03-28)

Late-night Yggsii work should default to a larger trust-building or onboarding move rather than another microscopic continuity polish pass. The micro-improvement loop was producing diminishing returns relative to a bolder trust or product move.

## Quiet-Hours Editing Bias (2026-03-29)

Quiet-hours Yggsii work should prefer safe copy changes, handoffs, and documentation over risky logic edits. This guardrail exists because 4 AM is not the right time to restructure the render pipeline.

## Safer Editing Pass Plan (2026-03-29)

Deletion warnings, import feedback, and demo-reset wording were identified as the trust work with the highest payoff. All three have since shipped. The import-failure clarity pass (separate parse failure from shape failure, repair summaries) is also now complete.

## Import Feedback Followup (2026-03-29)

After the initial import success summary shipped, the follow-up scoped clearer failure reasons and more honest repair messaging. This has been implemented via the import-failure-implementation-checklist.

## Ensemble Meetings Design (2026-03-28)

Designed an active-scene ensemble summary panel for the meetings view, handling cases with three or more characters. The panel is now implemented with cast listing, pair coverage stats, and return-to-scene navigation.

## Ensemble Meetings Implementation Checklist (2026-03-28)

Concrete build checklist for the ensemble summary panel. All items completed.

## Campaign Audit Workflow (2026-03-28)

Explored how continuity audit workflows could feed into first-class Yggsii features. Concluded that lightweight reveal-ledger support was the right intermediate step rather than a full audit system. This has been implemented.

## Continuity Audit Intake Checklist (2026-03-28)

Template for a continuity audit service intake flow. Retained as product-research reference for understanding what audit-shaped onboarding could look like if Yggsii ever adds guided diagnostic flows.

## Continuity Audit Mock Client Scenario (2026-03-28)

A mock scenario for testing continuity audit positioning against a plausible early buyer. Served as product research input. The key insight was that campaign-shaped material and knowledge-state continuity were the sharpest pain points.

## Continuity Audit Offer Sheet (2026-03-28)

Draft offer sheet for service-style continuity audits. Now explicitly treated as a research probe artifact, not a live service offering.

## Sample Continuity Audit (2026-03-28)

A full sample audit of the demo project to calibrate what audit output looks like. Product research reference only.

## Sample Continuity Audit Campaign (2026-03-28)

Extended campaign-shaped audit using the demo data plus travel, absence, and reveal templates. Product research reference.

## Absence Tracking Template (2026-03-28)

Template for tracking character absences across chapters or scenes. Retained as a potential future feature input.

## Travel Spine Template (2026-03-28)

Template for tracking character movement across locations. Retained as a potential future feature input.

## Reveal Ledger Template (2026-03-28)

Template for reveal records. Now implemented in the app itself. Retained for reference.

## Reveal Ledger Implementation Checklist (2026-03-28)

Build checklist for the first reveal slice. All items completed.

## Safer Editing Daylight Sequence (2026-03-29)

Consolidation of the safer-editing handoffs into a single execution order. The planning phase is complete. The implementation has landed.

## Relationship Modelling Design (2026-03-30)

Roadmap items 1-4 are all shipped. Relationship modelling is the next major feature. A full design and implementation plan now lives at `relationship-modelling-design.md`, covering data model, CRUD, visibility across workspace/character editor/meetings, search integration, import/export, demo seed additions, and a clear anti-scope rule. Ready for a daylight implementation pass.
