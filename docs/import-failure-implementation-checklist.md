# Import Failure Implementation Checklist

This is a concrete build checklist for the next daylight safer-editing pass in Yggsii.

It turns the earlier follow-up note into an implementation-shaped handoff.

## Goal

Make project import failures easier to recover from.

The app should explain what went wrong in plain language, and it should be honest when it repaired incomplete data during import.

## First pass scope

Keep this pass small.

Do not redesign import architecture.

Do:
- improve failure classification
- improve user-facing copy
- surface normalization or repair notes when relevant

Do not:
- add remote sync
- add heavy schema migration machinery
- add noisy validation that blocks obviously repairable imports

## Failure cases to distinguish

### 1. File is not valid JSON

Detection:
- JSON.parse fails

User-facing message target:
- This file could not be parsed as JSON.
- Check that it was exported correctly and was not edited into an invalid state.

Implementation notes:
- keep the technical parse error out of the main message
- optional tiny detail line is fine if it helps debugging

### 2. File is JSON, but not a Yggsii project backup

Detection:
- parsed JSON exists
- shape does not match a project record
- shape does not match an export object with a project field

User-facing message target:
- This file is readable JSON, but it does not look like a Yggsii project backup.
- Import expects either a direct project record or an exported backup with a project field.

Implementation notes:
- avoid listing every missing field unless it is genuinely helpful
- the point is orientation, not schema theatre

### 3. File imports, but repaired data was needed

Detection examples:
- default chapter created
- fallback opening scene created
- missing arrays normalized to empty arrays
- missing linked id arrays repaired

User-facing summary target:
- Project imported successfully, with a few repairs.
- Yggsii rebuilt some missing structure so the project can open safely.

Repair note examples:
- Added a default chapter.
- Rebuilt missing scene or character link lists.
- Created a fallback opening scene.

Implementation notes:
- surface these as a short list in the success summary when practical
- if nothing was repaired, keep the current smaller success summary

## UI shape

A good first pass would produce one of three outcomes:

- clear failure notice for invalid JSON
- clear failure notice for wrong backup shape
- success notice with optional repair bullets

Keep the current import flow intact.

Just make the result state more honest and more actionable.

## Suggested coding order

1. Separate parse failure from shape failure.
2. Thread a small repair-summary structure through import normalization.
3. Show repair bullets in the existing success summary area.
4. Verify that clean imports still produce a simple success message.

## Done when

This pass is done when:
- an invalid JSON file gets a plain parse message
- a random JSON file gets a plain not-a-backup message
- a damaged but recoverable backup imports with an explicit repair summary
- a clean export still imports without scary extra noise

## Why this pass is worth it

Deletion warnings made risky actions clearer.

This pass does the same for import trust.

If Yggsii repairs something, it should say so.

If a file is wrong, it should explain that in human language instead of shrugging.
