# Reveal Ledger Implementation Checklist

This note turns the reveal-ledger productisation idea into a concrete first coding pass.

The goal is not to build a grand knowledge graph.

The goal is to ship a lightweight continuity-record surface that fits the current Yggsii shape.

## Scope for first pass

Add project-level reveal records with optional links to scenes and characters.

Each reveal record should support:
- title
- underlying truth
- current public story
- reveal point
- notes
- linked scene ids
- linked character ids

Do not add per-character certainty levels, timeline graphs, or relationship inference yet.

## Data model changes

1. Add a `reveals` array to the project model.
2. Define a `RevealRecord` type.
3. Include stable ids for each reveal record.
4. Ensure export and import include reveal data.
5. Keep validation light but reject obviously broken linked ids during import if practical.

## UI placement

Best first placement:
A new project-level panel in the main workspace, near other inspectable structures rather than buried inside a single scene.

Good first-pass options:
- a new workspace section below locations
- or a new tab if the current layout can absorb it cleanly

Bias:
Prefer the smallest addition that keeps reveals easy to inspect and edit.

## Record list behaviour

The reveal list should show, at minimum:
- title
- short public-story summary
- reveal point
- counts of linked scenes and characters

It should allow:
- creating a new reveal
- selecting a reveal
- editing the selected reveal
- deleting a reveal

## Editor behaviour

The selected reveal editor should include:
- plain text inputs for title and reveal point
- textareas for underlying truth, public story, and notes
- multi-select checklists for scenes and characters using existing project entities

The editor does not need advanced filtering on day one.

## View integration

First pass integration should stay modest.

Useful small integrations:
1. Show linked reveal count in character inspector when a character is attached to reveals.
2. Show linked reveal count in scene editor when a scene is attached to reveals.
3. Allow direct jump from reveal editor to linked scene editing if that is easy with current button patterns.

Avoid building a whole reveal dashboard on the first pass.

## Ordering and display

Default sort for the first pass:
- reveals with a reveal point first if present
- then alphabetical by title

If reveal point is free text, do not pretend it has strict chronology semantics yet.

## Guardrails

- No graph visualisation.
- No per-character knowledge matrix yet.
- No automated continuity warnings yet.
- No relationship-system merge yet.
- No heavy new navigation model unless the existing shell cannot support the feature cleanly.

## Acceptance check

A user should be able to create a reveal record, link it to relevant scenes and characters, save it locally, export and import it with the project, and inspect it again later without losing context.

## Nice follow-ons, not in this slice

- reveal-aware search results
- scene badges for linked reveals
- character-inspector summary of reveal participation
- knowledge-state views built on top of the same records
- warnings for reveal records linked to deleted scenes or characters beyond simple cleanup

## Best implementation sequence

1. Extend the project model and seed data safely.
2. Render a simple reveal list and editor.
3. Add create, update, and delete flows.
4. Add scene and character link selection.
5. Confirm export and import round-trip the new data.
6. Add one or two tiny inspector integrations if time remains.
