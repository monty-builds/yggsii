# Import Feedback Follow-Up

This note scopes the next likely safer-editing follow-up after the first deletion and reset copy pass.

## Current state

Yggsii now does three useful things during risky flows:
- clearer deletion copy
- safer demo-reset copy
- a small import success summary after load

That is already better.

But import failure feedback is still blunt.

## Remaining weakness

Right now, import failure still collapses into one of two broad messages:
- invalid Yggsii backup shape
- generic JSON or structure failure

That is enough to stop confusion at the most basic level.

It is not yet enough to help a user recover quickly.

## Best next improvement

The next import-trust pass should distinguish at least three cases:

### 1. Not valid JSON

User-friendly message:
- This file could not be parsed as JSON.
- Check that it was exported correctly and was not edited into an invalid state.

### 2. JSON, but not a Yggsii-shaped project backup

User-friendly message:
- This file is readable JSON, but it does not look like a Yggsii project backup.
- Import expects either a direct project record or an exported backup with a `project` field.

### 3. Valid project shape, but incomplete or repaired data

User-friendly message:
- The project was imported, but some missing structure was repaired automatically.
- Consider exporting it again from the repaired state if this is now the canonical version.

## Nice but optional follow-on

If practical, surface a tiny normalization note after import when Yggsii had to auto-create fallback structure such as:
- a default chapter
- a fallback opening scene
- empty arrays repaired for scenes or linked ids

That would make the app feel more honest about silent repairs.

## Why this matters

Trust is not just about preventing catastrophic loss.

It is also about whether the app explains weird states clearly enough that a user can recover without feeling tricked.

## Recommendation

Do not make this the very next overnight code change unless the pass is still small and obvious.

But keep it as the next import-specific safer-editing move when work resumes in daylight.

For the concrete build handoff, see `import-failure-implementation-checklist.md`.
