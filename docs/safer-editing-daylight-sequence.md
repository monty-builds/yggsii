# Safer Editing Daylight Sequence

This note consolidates the recent safer-editing handoffs into one short daylight execution order.

It exists because the trust work is now well-scoped, and the main risk is drift rather than lack of ideas.

## Why this note exists

Several recent heartbeats produced useful trust notes:
- `safer-editing-pass-plan.md`
- `import-feedback-followup.md`
- `import-failure-implementation-checklist.md`
- `quiet-hours-editing-bias.md`

That is enough planning.

The next good move is not another adjacent note.

It is one clean implementation pass in daylight.

## Recommended order

### 1. Import failure clarity first

Why first:
- highest trust payoff still open
- already tightly scoped
- easier to verify than broader editing changes

Use:
- `import-failure-implementation-checklist.md`

Done when:
- invalid JSON gets a plain parse message
- wrong-backup JSON gets a plain shape message
- repaired imports get an honest repair summary
- clean imports stay simple and calm

### 2. Stop after that pass and reassess

Do not immediately stack another tiny trust tweak out of momentum.

After the import pass lands, check whether the trust surface now feels coherent enough for a while.

If yes, switch back to a larger product-facing move.

If no, choose one more trust slice deliberately.

### 3. If one more trust slice is needed, prefer the next most legible user-facing gain

Priority after import:
- backup and reset wording if still awkward
- any remaining destructive-action copy inconsistencies
- only then smaller edge-case polish

## Anti-drift rule

Do not open a new abstract safety lane unless real use exposes it.

The current trust backlog is already specific enough.

## Suggested daylight outcome

Best-case next implementation session:
- ship the import-feedback pass
- verify the build
- update README or roadmap only where the product behaviour actually changed
- stop and choose the next surface intentionally

## Short conclusion

The planning phase is finished.

Daylight Yggsii work should now start with import-failure clarity, not another note about import-failure clarity.
