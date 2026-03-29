# Relationship Modelling — Design and Implementation Plan

Date: 2026-03-30

## Why this matters now

The first four roadmap items are all shipped. Relationship modelling is the next major product-facing feature.

The meetings view already shows character co-presence, but that is only proximity, not relationship. A reader looking at two characters sharing three scenes learns nothing about whether they are allies, rivals, family, or strangers who happen to be in the same room.

Explicit relationship records are what turn Yggsii from a co-presence inspector into a relationship-debugging tool.

## Data model

```typescript
type Relationship = {
  id: Id
  characterA: Id   // first character id
  characterB: Id   // second character id
  label: string    // e.g. "ally", "rival", "family", "mentor", "secret", "debt"
  notes: string    // freeform relationship description
  status: 'active' | 'changed' | 'ended'
  startsInSceneId?: Id   // optional scene where relationship begins or is revealed
  endsInSceneId?: Id     // optional scene where relationship changes or ends
}
```

The pair direction should not matter. Store characterA and characterB sorted by id so that lookups are deterministic. The UI should present them in a natural order (alphabetical or by the order the user picks).

## Storage

Relationships live at the project level, alongside scenes, characters, locations, and reveals.

```typescript
type StoryProject = {
  // ... existing fields
  relationships: Relationship[]
}
```

## CRUD

Basic CRUD flow, same pattern as characters and locations:

- Add relationship: pick two characters, optional label, optional notes
- Edit relationship: change label, notes, status, scene links
- Delete relationship: remove the record, no cascade needed since scenes do not reference relationships

Deletion should be simple since relationships are not referenced by other entities. A plain confirmation is sufficient.

## Visibility

Relationships should surface in three places:

### 1. Workspace — relationship inspector panel

A new section below the reveals section in the workspace inspector column.

For each relationship:
- Character pair names
- Label badge
- Notes preview (truncated)
- Status indicator
- Direct jump to linked scenes if start/end scenes are set
- Edit and delete buttons

Add button at the section header.

### 2. Character editor — relationship summary

When viewing a character, show a compact list of that character's relationships.

For each:
- Other character name (clickable to jump to their editor)
- Label
- Status
- Notes preview

This makes the character editor significantly more useful for understanding a single character's social graph.

### 3. Meetings view — relationship annotations

In the meeting cards, if a pair has an explicit relationship record, show the label as a small badge.

This connects the co-presence surface to the relationship model without replacing it. A meeting card that says "Mira and Seline · 2 shared scenes · rival" is much more informative than "Mira and Seline · 2 shared scenes".

## UI controls

### Add relationship form

- Character A dropdown (existing characters)
- Character B dropdown (existing characters, filtered to exclude Character A)
- Label text input (with a few preset suggestions: ally, rival, family, mentor, friend, enemy, secret, debt, colleague, stranger)
- Notes textarea
- Start scene dropdown (optional, existing scenes)
- End scene dropdown (optional, existing scenes)
- Status select (active, changed, ended)

### Character pair constraint

A pair should probably allow at most one active relationship. If a user tries to add a second active relationship for the same pair, the UI should warn or prevent it.

Rationale: if "Mira and Seline" can have five relationship records, the surface becomes confusing. One active record per pair keeps things clean. Status changes (changed, ended) create the history without piling up active duplicates.

This can be relaxed later if real use demands it.

## Import and export

Relationships must round-trip through the existing JSON export/import flow.

- Export: include `relationships` array in the project JSON
- Import: normalize missing array to empty array, same as reveals
- No special repair logic needed since relationships have no required references

## Normalization

In `normalizeProject`:
- Ensure `relationships` is always an array (default to `[]`)
- Validate `characterA` and `characterB` are non-empty strings
- Ensure the pair is sorted so lookups are deterministic

## Search integration

Workspace search should include relationship records.

Match against:
- Both character names in the pair
- Label text
- Notes text

Result type: `relationship`

Result action: jump to the relationship in the workspace inspector.

## Suggested coding order

1. Add `Relationship` type and extend `StoryProject` to include `relationships: Relationship[]`
2. Add normalization in `normalizeProject`
3. Add relationship CRUD functions: `addRelationship`, `updateRelationship`, `deleteRelationship`
4. Add relationship panel to workspace inspector (below reveals)
5. Add relationship summary to character editor
6. Add relationship badges to meetings view cards
7. Extend workspace search to include relationships
8. Ensure export/import round-trips correctly
9. Extend `isStoryProject` if the schema check needs updating

## Definition of done

- A user can create, edit, and delete character relationship records
- Relationships are visible in the workspace inspector
- A character's relationships appear in the character editor
- Meeting cards show relationship labels for pairs that have them
- Workspace search finds relationships by label, notes, or character names
- Export and import preserves relationships
- The demo project ships with at least one seeded relationship to demonstrate the feature

## Demo seed addition

Add to `demoProject()`:

- Mira Vale and Tarin Holt: ally, "Unlikely allies bound by a shared secret. Trust is transactional but deepening."
- Mira Vale and Seline Ash: rival, "Political opponents whose goals temporarily align. Neither trusts the other."
- Brother Cael and Mira Vale: mentor, "Cael sees archival talent in Mira and offers guarded guidance."
- Tarin Holt and Seline Ash: stranger, "No established relationship yet, but both operate in the same circles."

This gives the demo project four relationships that illustrate the range of labels and add depth to the existing scenes.

## Open questions

- Should relationships support a timeline of status changes (e.g., "ally → rival → reconciled") as separate records, or should status changes overwrite the single record?
  - Recommendation: single record with status field for MVP. Timeline of relationship events is a heavier feature that can come later if requested.
- Should the label field be freeform or constrained to a preset list?
  - Recommendation: freeform text input with preset suggestions. Presets help discoverability without constraining users who need custom labels.
- Should the meetings view sort or filter by relationship type?
  - Recommendation: not in the first pass. Annotation is enough. Filtering can come later.

## Anti-scope rule

Do not add:
- Relationship timeline or event history
- Relationship graphs or visual network views
- Relationship templates or starter packs
- Scene-level relationship markers (too heavy for MVP)

The first pass is records, visibility, and search. That is enough to make the product meaningfully more useful.
