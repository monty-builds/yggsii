# Audit Workflow Productisation Note

This note turns the new continuity-audit service workflow back toward the product.

The question is simple:
Which parts of the campaign audit method should stay manual service scaffolding, and which parts should become first-class Yggsii features?

## Why this matters

The service work uncovered a real pattern.

The most valuable continuity problems are often not generic prose issues. They cluster around three structural surfaces:
- knowledge and reveal order
- movement, urgency, and consequence
- absence, reintegration, and cast drift

If Yggsii wants to deserve the "narrative debugging software" framing, it should eventually expose at least some of that structure directly.

## Candidate product surfaces

### 1. Reveal ledger support

What it would mean:
Add a lightweight way to track important secrets, disputed facts, reader-facing reveals, and character knowledge state.

Why it belongs in-product:
This is one of the highest-value continuity surfaces discovered by the campaign audit workflow.

Smallest plausible version:
- project-level reveal records
- title, underlying truth, public story, reveal point, notes
- optional links to scenes and characters
- simple list view, not a giant graph

Why not do the full thing yet:
A full knowledge graph would sprawl fast and bury the current app under complexity.

### 2. Travel spine support

What it would mean:
Add explicit movement links or journey notes between scenes so travel time and consequence stop living only in free text.

Why it belongs in-product:
Current timeline labels help with order, but not with movement logic.

Smallest plausible version:
- optional travel note on a scene
- previous location to current location context
- elapsed-time or travel-gap note
- visible in timeline and manuscript inspection

Why not do the full thing yet:
A route-planning system or map view would be overkill for the current stage.

### 3. Absence tracking support

What it would mean:
Help users see meaningful cast gaps, weak-presence drift, and reintegration points.

Why it belongs in-product:
The meetings and character-inspection surfaces already point toward this, but they do not yet distinguish sustained absence from simple non-appearance.

Smallest plausible version:
- highlight long scene gaps between character appearances
- show "last seen" and "gap length" in character inspector
- optionally flag return scenes after long absences

Why not do the full thing yet:
Full intention modelling around absence would need too much authorial metadata too early.

## Ranking by product leverage

### Highest leverage now, reveal ledger light

Reason:
It is the most distinctively narrative-debugging surface and the least well covered by current Yggsii structures.

### Second, absence-aware character inspection

Reason:
This could likely be added with lighter data-model changes and would make existing character views more strategically useful.

### Third, travel spine light

Reason:
Still valuable, but likely needs a cleaner model for scene-to-scene movement context before it feels elegant.

## Recommended next product slice

Do not attempt all three at once.

Best next slice:
A light reveal-ledger feature, anchored as project-level records with optional scene and character links.

Why this slice first:
- it aligns strongly with the continuity-audit service insight
- it sharpens Yggsii's product identity beyond generic writing tools
- it can start as a list surface rather than a heavy visual system
- it creates a path toward richer relationship and continuity modelling later

## Acceptance check for the first build pass

A user should be able to record a secret or disputed fact, note what is publicly believed, attach it to relevant scenes or characters, and later inspect that record without leaving the main local-first workflow.

## What should stay manual for now

These should remain service-side or documentation-side for the moment:
- full campaign audit workflow orchestration
- detailed memo generation
- heavy reveal semantics like confidence scoring or per-character knowledge timelines
- map-like travel systems
- highly interpretive absence labelling

## Product implication for roadmap

The roadmap should stop treating all future continuity intelligence as generic relationship modelling.

There is now a clearer intermediate lane:
light continuity records, starting with reveals and knowledge-state structure.

## Implementation handoff

A concrete first-pass build checklist now lives at `docs/reveal-ledger-implementation-checklist.md`.

## Short conclusion

The service thread did its job.

It did not just create sales collateral. It exposed a sharper product path.

If Yggsii follows the signal, the next meaningful feature is not more cosmetic polish. It is lightweight reveal-ledger support.
