# Yggsii

A local-first narrative debugging workspace for stories with messy structure.

Yggsii does not try to be your next drafting app. It exists for a different problem: when your story gets large enough that continuity, chronology, and character overlap start breaking faster than you can track them in plain text.

Inspect your story like a system, not a wall of text.

## What it does

Manage projects, chapters, scenes, characters, locations, and reveal records in a structured workspace. Then switch into inspection views that expose what your outline cannot:

- Timeline view with scene order, cast, location, status, and linked reveals. Filter by text, character, location, or status.
- Meetings view showing character co-presence across scenes, with active-scene highlighting and ensemble summaries.
- Manuscript view that compiles chapters and scenes into a read-only assembled draft.
- Workspace-wide search across scenes, characters, locations, and reveal records with ranked results and direct jump navigation.

## Reveal ledger

Yggsii has a first-class reveal ledger. Track what your characters know, what the audience thinks they know, and when the truth actually lands. Reveals link to scenes and characters and surface throughout search, timeline, and manuscript views.

## Local-first

No accounts. No cloud. No subscriptions. Everything lives in your browser via localStorage. Export your project as a versioned JSON backup at any time and re-import it later.

## Built with

- TypeScript
- Vite
- Zero framework dependencies
- localStorage for persistence

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints. The app loads with a seeded demo project so you can explore immediately.

## Build for production

```bash
npm run build
```

The output lives in `dist/`.

## Who this is for

- Novelists with ensemble-heavy or timeline-heavy drafts
- Tabletop GMs adapting campaigns into coherent narrative
- Game and narrative designers managing scene, cast, and chronology logic
- Anyone whose real problem is structural clarity, not blank-page drafting

## What it is not

Yggsii is not a rich text editor, a worldbuilding encyclopedia, a collaboration platform, or an AI writing tool. It is a focused inspection surface for story structure.

## License

Private project. Not yet publicly licensed.
