# Yggsii

Yggsii is a local-first narrative planning app for writing stories as structured systems rather than one endless document.

This MVP focuses on inspectability. You can manage projects, chapters, scenes, characters, and locations, then switch into views that expose chronology and shared character presence.

## Chosen stack

I chose Vite with TypeScript and a small framework-free SPA.

Why:

- very fast to scaffold and run locally
- robust enough for a practical MVP
- no backend needed for local-first storage
- plain TypeScript keeps the data model easy to reason about and easy to evolve into React, Svelte, or a backend later if desired

## What is built

- multi-project local story workspace
- data model for project, chapter, scene, character, and location
- create and switch between projects
- CRUD-style editing for story metadata, scenes, characters, and locations
- chapter and scene navigation column
- workspace search across scenes, characters, and locations, grouped by entity type, with simple result ranking and direct jump back into scene, character, or location context
- location inspector showing linked scenes, editable location details, and direct jump into linked scene editing
- structured scene editor with summary, draft text, timeline label, chapter assignment, status, location, character presence, and direct jumps to manuscript, timeline, and meetings views
- character inspector showing scene appearances with direct jump into scene editing
- timeline view showing scene order, chapter, location, cast, and status
- timeline search and filtering by text, character, location, and status, with filter state preserved while navigating and active-scene highlighting after view jumps
- character meetings view showing who shares scenes and how often, with active-pair highlighting for clean two-character arrivals, cast-pair highlighting plus titled and time-aware cast-context notes for larger scenes, and a return path to the current scene editor
- read-only manuscript assembly view that compiles chapters, scenes, summaries, and draft text, with direct jump back into scene editing
- dark mode and light mode toggle
- local persistence with `localStorage`
- project export as versioned JSON backup
- project import from exported JSON with basic validation
- dependency-aware character and location deletion that cleans linked scene references safely
- seeded demo project so the app feels useful on first launch
- restore-demo button for resetting the dataset quickly

## Strong defaults chosen for MVP

A few ambiguous product decisions were fixed deliberately so the build could stay coherent:

- scenes are the main writing unit
- chapters are containers and ordering groups
- timeline is represented by a manual scene order integer plus a freeform time label
- persistence is browser `localStorage`, so the MVP is single-browser and local-machine by default
- locations are lightweight records rather than a full map system
- the meetings view is a practical character co-presence surface instead of a full graph library

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build for production

```bash
npm run build
```

## Known limitations

- no backend or cross-device sync
- import validation is intentionally basic and expects Yggsii-shaped JSON
- manuscript assembly is read-only for now
- timeline ordering is manual rather than calendar-aware
- there is no rich text editor, just structured plain text fields
- validation is intentionally light for speed

## Project path

`C:\Users\Mahon\.openclaw\workspace\projects\yggsii`
