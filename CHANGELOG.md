# Changelog

All notable changes to Yggsii.

## v1.0.0 (2026-04-05)

Initial release. Five roadmap features shipped:

### Features

- **Timeline view** with scene order, cast, location, status, and linked reveals. Filter by character, location, or status.
- **Meetings view** showing character co-presence across scenes with ensemble summaries.
- **Reveal ledger** tracking what characters know vs what the audience thinks they know.
- **Relationship modelling** with custom labels and scene-level anchors.
- **Manuscript assembly** compiling chapters into a read-only draft.
- **Workspace-wide search** across all objects.
- **Import/export** with JSON roundtrip and failure handoff checklist.
- **Safer editing** with daylight sequence to protect unsaved changes during import.

### Infrastructure

- TypeScript, Vite, zero framework dependencies.
- localStorage only. No accounts, no cloud, no subscriptions.
- MIT license.
- Deployed at https://monty-builds.github.io/yggsii/
