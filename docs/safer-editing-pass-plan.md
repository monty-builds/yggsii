# Safer Editing Pass Plan

This note scopes the next worthwhile trust-building move for Yggsii.

The recent work improved inspection surfaces a lot.

The next larger gain should probably come from making editing and data-risk moments feel safer and clearer.

## Why this matters now

Yggsii has crossed the threshold where losing or mangling project state would feel meaningfully worse than a normal MVP papercut.

That means trust is no longer just about visibility.

It is also about:
- whether destructive actions are legible
- whether imports fail clearly
- whether reset paths feel scary or safe
- whether the user can tell what will happen before they click

## Current risky or ambiguous moments

### 1. Deletion flows

Current state:
- scenes, characters, locations, and reveals all rely on browser confirm dialogs
- some warnings are richer than others
- the amount of downstream cleanup is not always equally visible

Good next step:
- make destructive copy more consistent
- state the consequence clearly in plain language
- where practical, mention what will be removed versus merely unlinked

### 2. Import validation feedback

Current state:
- invalid imports fail with a generic alert
- normalization quietly repairs some structure

Good next step:
- surface clearer reasons for import failure when possible
- distinguish invalid file shape from readable but incomplete project data
- consider a tiny import summary after success, such as scene and character counts

### 3. Demo reset trust

Current state:
- demo reset is one confirm away

Good next step:
- clarify that local data will be replaced
- remind the user to export a backup first if that is the intended safety valve
- keep the action simple, but less abrupt

### 4. Empty-state ambiguity

Current state:
- normalization ensures the app is never structurally empty, which is good
- but the user may not always understand whether something was auto-created for safety

Good next step:
- make forced fallback states slightly more explicit in copy
- avoid letting auto-created content feel like user-authored content by accident

## Best first implementation slice

Do not try to build a full undo system yet.

Best first slice:
- improve destructive-action copy for scene, character, location, reveal, import, and demo-reset paths
- add a small import success summary
- add one explicit backup hint near import or demo reset if that fits cleanly

## Why this slice first

- higher trust payoff than another tiny inspection hint
- smaller and safer than introducing undo
- helps the product feel more deliberate without heavy architecture changes
- aligns with the current overnight bias toward safer editing flows

## Not part of this slice

- full undo and redo
- version history
- recovery bins
- autosave snapshots
- complex modal system

Those may be worthwhile later, but not as the next move.

## Acceptance check

A user deleting something important, importing a project, or resetting to the demo should be able to understand the consequence before acting and feel less likely to lose track of what just happened.

## Short conclusion

The next worthwhile Yggsii step is probably not more visibility polish.

It is a safer-editing pass focused on destructive actions, import clarity, and reset trust.

For the current daylight execution order, see `safer-editing-daylight-sequence.md`.
