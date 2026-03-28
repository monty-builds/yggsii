# Yggsii Roadmap

This document records the next practical build priorities for Yggsii so progress survives resets and does not depend on chat context.

## Current positioning

Yggsii is best framed as narrative debugging software.

The product is not just a place to type prose. It is a local-first workspace for inspecting story structure, continuity, chronology, and character interaction.

This positioning feels more distinct than "another writing app" and better matches what the MVP already does well.

## Near-term goal

Move Yggsii from a promising local MVP into a trustworthy tool someone could start real work in.

The priority is not feature sprawl. The priority is closing the biggest trust gaps.

## Next build priorities

### 1. Import and export

Why this matters:
Without portability, the app behaves like a clever local demo. With import and export, it starts feeling like a real tool.

Scope:
- Export current project as JSON
- Import project JSON with validation
- One-click local backup download
- Basic schema version field for future migrations

Definition of done:
A user can export a project, clear the browser, re-import it, and recover the same story state.

### 2. Safer editing flows

Why this matters:
The app currently feels vulnerable around destructive operations and invalid state.

Scope:
- Delete support for characters and locations
- Dependency checks before deletion
- Plain-language warnings when entities are referenced by scenes
- Light validation for required fields and invalid references

Definition of done:
Users cannot silently break story data by deleting a referenced entity.

### 3. Manuscript assembly view

Why this matters:
Yggsii should prove that structure and prose belong in the same system.

Scope:
- Read-only compiled manuscript view
- Assemble by chapter order or scene order
- Include scene titles, summaries, and draft text cleanly
- Optional print-friendly layout later

Definition of done:
A project can be viewed as a continuous readable manuscript assembled from structured scenes.

### 4. Search and filtering

Why this matters:
Inspection gets painful as soon as projects stop being tiny.

Scope:
- Text search across scenes, characters, and locations
- Filter timeline by character
- Filter timeline by location
- Filter by scene status
- Preserve filter state while navigating

Definition of done:
A user can quickly answer questions like "show me every scene with Mira in Dock Nine" without manually scanning the whole project.

### 5. Relationship modelling, light version

Why this matters:
The current co-presence surface is useful, but relationship awareness is where the app starts becoming strategically valuable.

Scope:
- Explicit character-to-character relationship records
- Optional labels like ally, rival, family, secret, debt
- Simple notes and status changes over time
- Relationship visibility inside scene and character views

Definition of done:
The app can represent relationships as more than incidental co-appearance.

## Suggested order of execution

1. Import and export
2. Safer editing flows
3. Manuscript assembly view
4. Search and filtering
5. Relationship modelling

## Product hypotheses worth testing

### Hypothesis 1
Writers with complex stories care more about inspection than rich text polish in the early stages.

### Hypothesis 2
"Narrative debugging software" is a sharper market position than "writing app".

### Hypothesis 3
Tabletop GMs, game writers, and fanfiction writers may be easier early adopters than mainstream novelists because they often tolerate more structured tooling.

## Questions to keep alive

- Should scenes remain the sole central unit, or should beats become first-class soon?
- How much timeline semantics can be added before the UX becomes heavy?
- Should manuscript assembly stay read-only for a while, or support editing early?
- When portability exists, what is the simplest durable storage upgrade beyond raw localStorage?

## Progress note

Import and export are now in place.

Safer editing flows now include character and location deletion with dependency-aware cleanup.

The read-only manuscript assembly view is now in place as well.

A first pass of search and filtering is now in place on the timeline, covering text, character, location, and status filters with state preserved while navigating.

A clear-filters control is now in place too, which makes the timeline inspection loop less fiddly in real use.

## Practical next move

If work resumes immediately, deepen search and filtering beyond the timeline.

Good next slices would be workspace-wide search results, filter chips, and jumping straight from a result into the relevant scene, character, or location.

Timeline results now jump directly back into the workspace scene editor.

Active filter chips are now in place too.

A first workspace-wide search layer is now in place across scenes, characters, and locations.

Workspace search results are now grouped by entity type, and locations now have a lightweight inspector inside the workspace with linked-scene visibility.

A first ranking pass is now in place too, and manuscript, location, and character inspection now link directly back into scene editing. Scenes can now jump out to manuscript, timeline, and meetings views as well.

Active-scene arrival highlighting is now in place for timeline and manuscript, and meetings now highlight the active character pair when the current scene contains exactly two characters while showing cast-context notes for larger scenes. Larger-scene arrival notes now also link back to the current scene editor, name the active scene explicitly, include its time label and location when present, and highlight relevant cast pairs too.

The next ergonomic gain is probably richer relevance rules than simple text scoring, plus deeper meetings logic for larger ensemble scenes.

A concrete design note for that next meetings slice now lives at `docs/ensemble-meetings-design.md`, centred on an active-scene ensemble summary panel so larger casts read as social structure rather than just a pile of pair cards.

That ensemble summary panel is now in place in meetings view, along with clearer highlighting for active-ensemble pair cards.

The next likely gain is either better relevance rules for workspace search, or more structural ranking inside meetings so active-scene pairs and historically important pairs separate more cleanly.

A new design note, `docs/audit-workflow-productisation-note.md`, now argues for an additional intermediate lane as well: lightweight continuity records, starting with reveal-ledger support rather than jumping straight to heavier relationship modelling.

That note now has a concrete first-pass handoff at `docs/reveal-ledger-implementation-checklist.md`, which scopes the smallest useful coding slice for reveal records.

A first reveal-ledger slice is now in place in the workspace as project-level reveal records with scene and character links, local persistence, and import/export support.

Tiny reveal-aware integrations are now in place too, including workspace search results for reveal records, scene-list linkage hints, and lightweight inspector badges for linked reveal records.

The next continuation point is either a deeper second-pass model once real use exposes the right pressure points, or a pause to evaluate whether the current reveal surface is already enough signal for now.

That evaluation now lives at `docs/reveal-surface-evaluation.md`, with the current recommendation being restraint: small reveal-aware integrations are still sensible, but a heavier second-pass model should wait for a real pressure point.

A packaging reset note now also lives at `docs/post-launch-packaging-reset.md`, explicitly pushing future heartbeats back toward product trust, search and meetings improvements, and visual proof rather than further launch-prose accumulation.

Workspace search ranking is now slightly smarter as well, because scene results include linked chapter, location, and cast context, while reveal results include linked scenes and characters.

Workspace search now also gives a small match summary, which makes result piles easier to parse at a glance when a query hits multiple entity types.

The next likely product-facing gain is either another small relevance improvement or more structural ranking inside meetings.

Meetings ranking is now slightly more opinionated too, because active ensemble pairs sort ahead of merely historical pair frequency.

The next likely software-facing gain is either another small search-quality pass or a more explicit meetings distinction between current-scene relevance and long-run importance.
