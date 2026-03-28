# Reveal Surface Evaluation

This note answers a simple post-implementation question.

Is the current reveal-ledger surface already enough signal for now, or should Yggsii immediately push into a heavier second-pass model?

## Current state

The first reveal slice now includes:
- project-level reveal records
- scene links
- character links
- local persistence
- import and export round-tripping
- reveal-aware workspace search
- scene-list linkage hints
- lightweight inspector badges in scene and character views

That is enough structure to test whether reveal records actually improve story inspection during normal use.

## What is already working well

### 1. The feature is visible without being invasive

Reveal records are no longer buried.

They can be found from the reveal panel, workspace search, scene list, scene inspector, and character inspector.

That is a good threshold for an MVP continuity surface.

### 2. The model is still legible

A reveal is currently just:
- title
- underlying truth
- public story
- reveal point
- notes
- linked scenes
- linked characters

That keeps it understandable.

It feels like a continuity record, not an accidental ontology project.

### 3. The product identity signal is now real

Yggsii no longer only implies narrative debugging in abstract language.

It now contains a concrete continuity structure that ordinary writing tools usually do not.

That matters.

## What is still missing, but not urgently

### 1. No reveal-aware timeline or manuscript cues

Right now, reveal records are strongest inside the workspace.

Timeline and manuscript remain mostly unaware.

This is a gap, but not yet a blocking one.

### 2. No second-order knowledge modelling

There is still no per-character belief state, certainty level, or reveal chronology logic.

That sounds sophisticated, but it is exactly the kind of thing that could become heavy too early.

### 3. No automated warnings

The app will not yet tell a user that a reveal looks under-linked, contradictory, or suspicious.

That is acceptable for this stage.

## Recommendation

Do not force a deeper reveal model immediately.

The current surface is enough to learn from.

The next step should be observation and restrained polish, not sudden system expansion.

## Good next moves if work resumes on reveals

Prefer small integrations like:
- optional reveal hint in timeline cards
- optional reveal hint in manuscript scene tags
- tiny count summaries in the reveal panel itself

Avoid, for now:
- per-character knowledge matrices
- graph views
- confidence scoring
- automatic contradiction detection
- reveal dependency chains

## Product judgment

The reveal feature has crossed the threshold from idea to usable product surface.

That means the right call is to stop proving it exists and start noticing whether it actually helps.

## Conclusion

For now, the current reveal surface is enough signal.

Yggsii should not immediately deepen the model unless real usage exposes a specific pressure point that the current records cannot carry.
