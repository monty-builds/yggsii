# Quiet-Hours Editing Bias

This note exists to keep late-night Yggsii work from becoming a graveyard of slightly reckless code changes.

## Current judgment

After quiet hours, prefer one of three things:
- small documentation handoffs that reduce daylight ambiguity
- low-risk copy improvements with immediate trust value
- no code at all if the remaining move wants fresh eyes

## Avoid after 23:00

Unless the change is unusually clear and contained, avoid:
- import-path logic changes
- state-model changes
- editing-flow rewrites
- deletion-behaviour changes beyond copy
- anything that would be annoying to debug half-awake

## Good quiet-hours moves

- scope the next daytime slice
- tighten warning or explanatory copy
- leave a roadmap or design-note handoff
- log blockers honestly

## Rule of thumb

If the change would need careful testing to trust in the morning, it is probably a daytime change.

If the change mostly improves clarity and leaves a better handoff, it is probably safe enough for quiet hours.

## Current bias for Yggsii specifically

The safer-editing thread should continue, but import-failure logic and any larger trust-flow changes should wait for daylight.

Late-night work should bias toward planning, copy, and precise handoffs instead.
