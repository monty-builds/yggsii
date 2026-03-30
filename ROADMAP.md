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

## Status

All five planned roadmap items are complete. Yggsii is live at https://monty-builds.github.io/yggsii/ and deploys automatically via GitHub Actions on every push.

## Progress note

All five roadmap items shipped between 2026-03-25 and 2026-03-30. Design notes and implementation checklists live in `docs/`. Key milestones:

1. **Import/export** — JSON project portability with validation and success feedback.
2. **Safer editing** — Deletion warnings with dependency-aware copy, clearer demo-reset, import failure messages.
3. **Manuscript assembly** — Read-only compiled view by chapter order with scene text.
4. **Search and filtering** — Timeline text/character/location/status filters with state preservation, workspace-wide search across all entity types with ranked grouped results, one-click clear, and reveal-text search in both timeline and workspace.
5. **Relationship modelling** — Explicit character-to-character records with labels, notes, status tracking, scene-linking, visibility in workspace search, character editor badges, and meetings view annotations. Design doc: `docs/relationship-modelling-design.md`.

Additional polish: active-scene highlighting across timeline and manuscript, ensemble summaries in meetings, cross-view navigation links, arrival highlighting, meetings ranking by active-scene relevance.

## Practical next move

Roadmap is complete. Next moves are launch-readiness and user acquisition, not more features. Specifically: better screenshots, early feedback from target users (GMs, game writers, ensemble-heavy novelists), and iterating based on real use rather than assumptions.
