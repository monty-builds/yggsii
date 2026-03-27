import './style.css'

type Id = string

type Character = {
  id: Id
  name: string
  role: string
  notes: string
  color: string
}

type Location = {
  id: Id
  name: string
  details: string
}

type Scene = {
  id: Id
  chapterId: Id
  title: string
  summary: string
  content: string
  order: number
  timeLabel: string
  locationId?: Id
  characterIds: Id[]
  status: 'draft' | 'outline' | 'revised'
}

type Chapter = {
  id: Id
  title: string
  summary: string
  order: number
}

type StoryProject = {
  id: Id
  title: string
  premise: string
  genre: string
  viewpoint: string
  chapters: Chapter[]
  scenes: Scene[]
  characters: Character[]
  locations: Location[]
  createdAt: string
  updatedAt: string
}

type ProjectBackup = {
  schemaVersion: 1
  exportedAt: string
  project: StoryProject
}

type TimelineFilters = {
  query: string
  characterId: string
  locationId: string
  status: '' | Scene['status']
}

type AppState = {
  projects: StoryProject[]
  activeProjectId: Id
  activeChapterId?: Id
  activeSceneId?: Id
  activeCharacterId?: Id
  activeLocationId?: Id
  theme: 'dark' | 'light'
  view: 'workspace' | 'timeline' | 'meetings' | 'manuscript'
  timelineFilters: TimelineFilters
  workspaceQuery: string
}

const STORAGE_KEY = 'yggsii-mvp-v1'
const BACKUP_SCHEMA_VERSION = 1

const emptyTimelineFilters = (): TimelineFilters => ({
  query: '',
  characterId: '',
  locationId: '',
  status: '',
})

const colors = ['#8b5cf6', '#0ea5e9', '#22c55e', '#f97316', '#ec4899', '#eab308']

const makeId = () => Math.random().toString(36).slice(2, 10)

const demoProject = (): StoryProject => {
  const chapter1 = { id: makeId(), title: 'Chapter 1, The Drift', summary: 'Mira receives a map grown inside a tree ring.', order: 1 }
  const chapter2 = { id: makeId(), title: 'Chapter 2, Lantern Market', summary: 'Alliances form under artificial dusk.', order: 2 }
  const chapter3 = { id: makeId(), title: 'Chapter 3, Root Memory', summary: 'The group descends into the archive beneath the city.', order: 3 }

  const chars: Character[] = [
    { id: makeId(), name: 'Mira Vale', role: 'Protagonist', notes: 'Archivist with a talent for reading living patterns.', color: colors[0] },
    { id: makeId(), name: 'Tarin Holt', role: 'Smuggler ally', notes: 'Knows every hidden route, trusts very few people.', color: colors[1] },
    { id: makeId(), name: 'Seline Ash', role: 'Political rival', notes: 'Elegant, strategic, and rarely fully honest.', color: colors[4] },
    { id: makeId(), name: 'Brother Cael', role: 'Keeper of roots', notes: 'Guardian of memory vaults, speaks in parables.', color: colors[2] },
  ]

  const locations: Location[] = [
    { id: makeId(), name: 'Glass Orchard', details: 'A greenhouse cathedral where maps are cultivated.' },
    { id: makeId(), name: 'Lantern Market', details: 'A night bazaar suspended over water channels.' },
    { id: makeId(), name: 'Root Archive', details: 'A subterranean lattice of memory wood and stone.' },
  ]

  const scenes: Scene[] = [
    {
      id: makeId(),
      chapterId: chapter1.id,
      title: 'The map in the trunk',
      summary: 'Mira discovers a growth-ring map that should not exist.',
      content: 'Mira presses her thumb against the felled trunk and feels a path pulse back. The ring pattern resolves into streets she knows, then diverges into routes no surveyor ever drew.',
      order: 1,
      timeLabel: 'Day 1, Dawn',
      locationId: locations[0].id,
      characterIds: [chars[0].id],
      status: 'draft',
    },
    {
      id: makeId(),
      chapterId: chapter1.id,
      title: 'Terms of transport',
      summary: 'Tarin agrees to move Mira through the canal wards.',
      content: 'Tarin listens, unimpressed until Mira names the district hidden in the wood grain. Then his expression changes. He names a price. She offers a secret instead.',
      order: 2,
      timeLabel: 'Day 1, Midday',
      locationId: locations[1].id,
      characterIds: [chars[0].id, chars[1].id],
      status: 'outline',
    },
    {
      id: makeId(),
      chapterId: chapter2.id,
      title: 'The rival arrives smiling',
      summary: 'Seline intercepts the pair with an offer that smells like a trap.',
      content: 'Seline appears with three lantern-bearers and the calm certainty of someone entering a conversation she planned a week ago.',
      order: 3,
      timeLabel: 'Day 1, Night',
      locationId: locations[1].id,
      characterIds: [chars[0].id, chars[1].id, chars[2].id],
      status: 'draft',
    },
    {
      id: makeId(),
      chapterId: chapter3.id,
      title: 'Descent into root memory',
      summary: 'Brother Cael guides the group below the city to inspect the living archive.',
      content: 'The stairs corkscrew around roots thicker than towers. Cael leads with a covered lamp and asks each of them, very softly, what they hope the archive will forgive.',
      order: 4,
      timeLabel: 'Day 2, Morning',
      locationId: locations[2].id,
      characterIds: [chars[0].id, chars[1].id, chars[3].id],
      status: 'revised',
    },
  ]

  return {
    id: makeId(),
    title: 'The Cartography of Roots',
    premise: 'A living map reveals a hidden civic memory system, forcing an archivist to navigate alliances, betrayals, and a city that remembers too much.',
    genre: 'Science fantasy',
    viewpoint: 'Close third, Mira',
    chapters: [chapter1, chapter2, chapter3],
    scenes,
    characters: chars,
    locations,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const defaultState = (): AppState => {
  const project = demoProject()
  return {
    projects: [project],
    activeProjectId: project.id,
    activeChapterId: project.chapters[0]?.id,
    activeSceneId: project.scenes[0]?.id,
    activeCharacterId: project.characters[0]?.id,
    activeLocationId: project.locations[0]?.id,
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    view: 'workspace',
    timelineFilters: emptyTimelineFilters(),
    workspaceQuery: '',
  }
}

let state: AppState = loadState()
const app = document.querySelector<HTMLDivElement>('#app')!

function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultState()
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (!parsed.projects?.length) return defaultState()
    return {
      ...defaultState(),
      ...parsed,
      timelineFilters: {
        ...emptyTimelineFilters(),
        ...(parsed.timelineFilters ?? {}),
      },
    }
  } catch {
    return defaultState()
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function update(mutator: (draft: AppState) => void) {
  mutator(state)
  saveState()
  render()
}

function getProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) ?? state.projects[0]
}

function stamp(project: StoryProject) {
  project.updatedAt = new Date().toISOString()
}

function sceneChapter(project: StoryProject, scene: Scene) {
  return project.chapters.find((chapter) => chapter.id === scene.chapterId)
}

function sceneLocation(project: StoryProject, scene: Scene) {
  return project.locations.find((location) => location.id === scene.locationId)
}

function characterById(project: StoryProject, id: Id) {
  return project.characters.find((character) => character.id === id)
}

function sortedChapters(project: StoryProject) {
  return [...project.chapters].sort((a, b) => a.order - b.order)
}

function sortedScenes(project: StoryProject) {
  return [...project.scenes].sort((a, b) => a.order - b.order)
}

function ensureSelections(project: StoryProject) {
  if (!project.chapters.find((chapter) => chapter.id === state.activeChapterId)) {
    state.activeChapterId = sortedChapters(project)[0]?.id
  }
  if (!project.scenes.find((scene) => scene.id === state.activeSceneId)) {
    state.activeSceneId = sortedScenes(project)[0]?.id
  }
  if (!project.characters.find((character) => character.id === state.activeCharacterId)) {
    state.activeCharacterId = project.characters[0]?.id
  }
  if (!project.locations.find((location) => location.id === state.activeLocationId)) {
    state.activeLocationId = project.locations[0]?.id
  }
}

function createProject() {
  const title = prompt('Project title?', 'Untitled Story')?.trim()
  if (!title) return
  importProjectRecord({
    id: makeId(),
    title,
    premise: '',
    genre: 'Fiction',
    viewpoint: '',
    chapters: [{ id: makeId(), title: 'Chapter 1', summary: '', order: 1 }],
    scenes: [],
    characters: [],
    locations: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, true)
}

function download(filename: string, contents: string, type = 'application/json') {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function filenameSafe(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'story-project'
}

function normalizeProject(project: StoryProject): StoryProject {
  const chapters = project.chapters?.length ? project.chapters : [{ id: makeId(), title: 'Chapter 1', summary: '', order: 1 }]
  const scenes = project.scenes?.length
    ? project.scenes.map((scene, index) => ({ ...scene, order: Number(scene.order) || index + 1, characterIds: Array.isArray(scene.characterIds) ? scene.characterIds : [] }))
    : [{ id: makeId(), chapterId: chapters[0].id, title: 'Opening scene', summary: '', content: '', order: 1, timeLabel: 'Day 1', characterIds: [], status: 'draft' as const }]

  return {
    ...project,
    chapters: chapters.map((chapter, index) => ({ ...chapter, order: Number(chapter.order) || index + 1 })),
    scenes,
    characters: (project.characters ?? []).map((character, index) => ({ ...character, color: character.color || colors[index % colors.length] })),
    locations: project.locations ?? [],
    createdAt: project.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function isStoryProject(value: unknown): value is StoryProject {
  if (!value || typeof value !== 'object') return false
  const project = value as Partial<StoryProject>
  return typeof project.id === 'string' && typeof project.title === 'string' && Array.isArray(project.chapters) && Array.isArray(project.scenes) && Array.isArray(project.characters) && Array.isArray(project.locations)
}

function importProjectRecord(project: StoryProject, replaceActive = false) {
  const normalized = normalizeProject(project)
  update((draft) => {
    if (replaceActive) {
      draft.projects = [normalized, ...draft.projects.filter((item) => item.id !== draft.activeProjectId && item.id !== normalized.id)]
    } else {
      draft.projects = [normalized, ...draft.projects.filter((item) => item.id !== normalized.id)]
    }
    draft.activeProjectId = normalized.id
    draft.activeChapterId = sortedChapters(normalized)[0]?.id
    draft.activeSceneId = sortedScenes(normalized)[0]?.id
    draft.activeCharacterId = normalized.characters[0]?.id
    draft.activeLocationId = normalized.locations[0]?.id
  })
}

function exportProject(project: StoryProject) {
  const backup: ProjectBackup = {
    schemaVersion: BACKUP_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    project,
  }
  download(`${filenameSafe(project.title)}.yggsii.json`, JSON.stringify(backup, null, 2))
}

async function importProjectFile(file?: File | null) {
  if (!file) return
  try {
    const raw = await file.text()
    const parsed = JSON.parse(raw) as ProjectBackup | StoryProject
    const project = 'project' in parsed ? parsed.project : parsed
    if (!isStoryProject(project)) {
      alert('That file does not look like a valid Yggsii project backup.')
      return
    }
    importProjectRecord(project)
  } catch {
    alert('Import failed. Check that the file is valid JSON exported from Yggsii.')
  }
}

function deleteScene(sceneId: Id) {
  update(() => {
    const project = getProject()
    project.scenes = project.scenes.filter((scene) => scene.id !== sceneId)
    if (!project.scenes.length) {
      const chapterId = project.chapters[0]?.id ?? makeId()
      if (!project.chapters.length) project.chapters.push({ id: chapterId, title: 'Chapter 1', summary: '', order: 1 })
      project.scenes.push({ id: makeId(), chapterId, title: 'New scene', summary: '', content: '', order: 1, timeLabel: '', characterIds: [], status: 'draft' })
    }
    stamp(project)
    ensureSelections(project)
  })
}

function characterAppearances(project: StoryProject, characterId: Id) {
  return sortedScenes(project).filter((scene) => scene.characterIds.includes(characterId))
}

function locationReferences(project: StoryProject, locationId: Id) {
  return sortedScenes(project).filter((scene) => scene.locationId === locationId)
}

function describeReferencedScenes(scenes: Scene[]) {
  if (!scenes.length) return 'No scenes reference it yet.'
  const preview = scenes.slice(0, 3).map((scene) => `${scene.order}. ${scene.title || 'Untitled scene'}`).join('\n')
  const extra = scenes.length > 3 ? `\n…and ${scenes.length - 3} more.` : ''
  return `${scenes.length} scene${scenes.length === 1 ? '' : 's'} reference it:\n${preview}${extra}`
}

function deleteCharacter(characterId: Id) {
  update(() => {
    const project = getProject()
    project.characters = project.characters.filter((character) => character.id !== characterId)
    project.scenes = project.scenes.map((scene) => ({ ...scene, characterIds: scene.characterIds.filter((id) => id !== characterId) }))
    stamp(project)
    ensureSelections(project)
  })
}

function deleteLocation(locationId: Id) {
  update(() => {
    const project = getProject()
    project.locations = project.locations.filter((location) => location.id !== locationId)
    project.scenes = project.scenes.map((scene) => scene.locationId === locationId ? { ...scene, locationId: undefined } : scene)
    stamp(project)
    ensureSelections(project)
  })
}

function render() {
  const project = getProject()
  ensureSelections(project)
  document.documentElement.dataset.theme = state.theme
  const activeScene = project.scenes.find((scene) => scene.id === state.activeSceneId) ?? sortedScenes(project)[0]
  const activeCharacter = project.characters.find((character) => character.id === state.activeCharacterId) ?? project.characters[0]
  const scenes = sortedScenes(project)
  const chapters = sortedChapters(project)

  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar left">
        <div class="brand-row">
          <div>
            <p class="eyebrow">Yggsii</p>
            <h1>Story projects</h1>
          </div>
          <button data-action="create-project">New</button>
        </div>
        <div class="project-list">
          ${state.projects
            .map(
              (item) => `
              <button class="project-pill ${item.id === project.id ? 'active' : ''}" data-project-id="${item.id}">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.genre || 'Unsorted fiction')}</span>
              </button>`,
            )
            .join('')}
        </div>
        <section class="panel">
          <label>Title<input id="story-title" value="${escapeAttr(project.title)}" /></label>
          <label>Premise<textarea id="story-premise">${escapeHtml(project.premise)}</textarea></label>
          <div class="split-2">
            <label>Genre<input id="story-genre" value="${escapeAttr(project.genre)}" /></label>
            <label>Viewpoint<input id="story-viewpoint" value="${escapeAttr(project.viewpoint)}" /></label>
          </div>
          <div class="toolbar compact">
            <button data-view="workspace" class="${state.view === 'workspace' ? 'active' : ''}">Workspace</button>
            <button data-view="timeline" class="${state.view === 'timeline' ? 'active' : ''}">Timeline</button>
            <button data-view="meetings" class="${state.view === 'meetings' ? 'active' : ''}">Meetings</button>
            <button data-view="manuscript" class="${state.view === 'manuscript' ? 'active' : ''}">Manuscript</button>
          </div>
        </section>
        <section class="panel stats-grid">
          <div><span>Chapters</span><strong>${project.chapters.length}</strong></div>
          <div><span>Scenes</span><strong>${project.scenes.length}</strong></div>
          <div><span>Characters</span><strong>${project.characters.length}</strong></div>
          <div><span>Locations</span><strong>${project.locations.length}</strong></div>
        </section>
      </aside>

      <main class="main">
        <header class="topbar panel">
          <div>
            <p class="eyebrow">Inspectable writing workspace</p>
            <h2>${escapeHtml(project.title)}</h2>
          </div>
          <div class="toolbar">
            <button data-action="project-export">Export JSON</button>
            <button data-action="project-import">Import JSON</button>
            <button data-action="theme-toggle">${state.theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
            <button data-action="seed-reset">Restore demo</button>
          </div>
        </header>
        <input id="project-import-file" type="file" accept="application/json,.json,.yggsii.json" hidden />
        ${state.view === 'workspace' ? renderWorkspace(project, chapters, scenes, activeScene, activeCharacter) : ''}
        ${state.view === 'timeline' ? renderTimeline(project, scenes) : ''}
        ${state.view === 'meetings' ? renderMeetings(project, scenes) : ''}
        ${state.view === 'manuscript' ? renderManuscript(project, scenes) : ''}
      </main>
    </div>
  `

  bindEvents(project, activeScene, activeCharacter)
}

type WorkspaceSearchResult = {
  type: 'scene' | 'character' | 'location'
  id: string
  chapterId?: string
  title: string
  meta: string
  score: number
}

function scoreMatch(...fields: string[]) {
  return (needle: string) => {
    const lowerFields = fields.map((field) => field.toLowerCase())
    let score = 0
    for (const field of lowerFields) {
      if (!field) continue
      if (field === needle) score += 10
      else if (field.startsWith(needle)) score += 6
      else if (field.includes(needle)) score += 3
    }
    return score
  }
}

function workspaceSearchResults(project: StoryProject, query: string): WorkspaceSearchResult[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []

  const sceneResults = sortedScenes(project)
    .map((scene) => ({
      scene,
      score: scoreMatch(scene.title, scene.summary, scene.content, scene.timeLabel)(needle),
    }))
    .filter(({ score }) => score > 0)
    .map(({ scene, score }) => ({
      type: 'scene' as const,
      id: scene.id,
      chapterId: scene.chapterId,
      title: scene.title || 'Untitled scene',
      meta: `${scene.timeLabel || 'Unscheduled'} · ${sceneChapter(project, scene)?.title || 'No chapter'}`,
      score,
    }))

  const characterResults = project.characters
    .map((character) => ({
      character,
      score: scoreMatch(character.name, character.role, character.notes)(needle),
    }))
    .filter(({ score }) => score > 0)
    .map(({ character, score }) => ({
      type: 'character' as const,
      id: character.id,
      title: character.name,
      meta: character.role || 'Character',
      score,
    }))

  const locationResults = project.locations
    .map((location) => ({
      location,
      score: scoreMatch(location.name, location.details)(needle),
    }))
    .filter(({ score }) => score > 0)
    .map(({ location, score }) => ({
      type: 'location' as const,
      id: location.id,
      title: location.name,
      meta: location.details || 'Location',
      score,
    }))

  return [...sceneResults, ...characterResults, ...locationResults]
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}

function renderWorkspace(project: StoryProject, chapters: Chapter[], scenes: Scene[], activeScene?: Scene, activeCharacter?: Character) {
  const activeLocation = project.locations.find((location) => location.id === state.activeLocationId) ?? project.locations[0]
  const results = workspaceSearchResults(project, state.workspaceQuery)
  return `
    <section class="workspace-grid">
      <div class="panel column-list">
        <div class="section-head"><h3>Chapters and scenes</h3><button data-action="add-chapter">Add chapter</button></div>
        <div class="panel-subtle workspace-search-panel">
          <label>Workspace search<input id="workspace-query" placeholder="Search scenes, characters, and locations" value="${escapeAttr(state.workspaceQuery)}" /></label>
          ${state.workspaceQuery.trim()
            ? results.length
              ? `${(['scene', 'character', 'location'] as const)
                  .map((type) => {
                    const rows = results.filter((result) => result.type === type)
                    if (!rows.length) return ''
                    return `<div class="search-group"><p class="eyebrow">${type === 'scene' ? 'Scenes' : type === 'character' ? 'Characters' : 'Locations'}</p><div class="mini-list search-results">${rows
                      .map((result) => `<button class="search-result" data-action="open-search-result" data-result-type="${result.type}" data-result-id="${result.id}" data-chapter-id="${result.chapterId || ''}"><strong>${escapeHtml(result.title)}</strong><span>${escapeHtml(result.type)} · ${escapeHtml(result.meta)}</span><span class="search-result-hint">${result.type === 'location' ? 'Open in workspace location inspector' : 'Open in workspace'} · rank ${result.score}</span></button>`)
                      .join('')}</div></div>`
                  })
                  .join('')}`
              : '<p class="muted">No workspace matches yet.</p>'
            : '<p class="muted">Search across scenes, characters, and locations.</p>'}
        </div>
        ${chapters
          .map((chapter) => {
            const chapterScenes = scenes.filter((scene) => scene.chapterId === chapter.id)
            return `
              <div class="chapter-block">
                <button class="chapter-row ${chapter.id === state.activeChapterId ? 'active' : ''}" data-chapter-id="${chapter.id}">
                  <span>${escapeHtml(chapter.title)}</span>
                  <small>${chapterScenes.length} scenes</small>
                </button>
                <div class="scene-list">
                  ${chapterScenes
                    .map(
                      (scene) => `
                    <button class="scene-card ${scene.id === state.activeSceneId ? 'active' : ''}" data-scene-id="${scene.id}">
                      <strong>${scene.order}. ${escapeHtml(scene.title)}</strong>
                      <span>${escapeHtml(scene.timeLabel || 'Unscheduled')}</span>
                    </button>`,
                    )
                    .join('')}
                  <button class="ghost-button" data-action="add-scene" data-chapter-id="${chapter.id}">+ Add scene</button>
                </div>
              </div>`
          })
          .join('')}
      </div>

      <div class="panel editor-panel">
        ${activeScene ? renderSceneEditor(project, activeScene) : '<p>Select a scene.</p>'}
      </div>

      <div class="panel inspector-panel">
        <div class="section-head"><h3>Characters</h3><button data-action="add-character">Add character</button></div>
        <div class="character-list">
          ${project.characters
            .map(
              (character) => `
              <button class="character-chip ${character.id === activeCharacter?.id ? 'active' : ''}" data-character-id="${character.id}">
                <span class="swatch" style="background:${character.color}"></span>
                <span>${escapeHtml(character.name)}</span>
              </button>`,
            )
            .join('')}
        </div>
        ${activeCharacter ? renderCharacterEditor(project, activeCharacter) : '<p class="muted">No character selected yet.</p>'}
        <div class="section-head locations-head"><h3>Locations</h3><button data-action="add-location">Add location</button></div>
        <div class="location-list">
          ${project.locations
            .map((location) => {
              const references = locationReferences(project, location.id)
              return `<button class="location-item ${location.id === activeLocation?.id ? 'active' : ''}" data-location-id="${location.id}"><div><strong>${escapeHtml(location.name)}</strong><span>${escapeHtml(location.details)}</span><span>${references.length} linked scene${references.length === 1 ? '' : 's'}</span></div></button>`
            })
            .join('')}
        </div>
        ${activeLocation ? renderLocationEditor(project, activeLocation) : '<p class="muted">No location selected yet.</p>'}
      </div>
    </section>
  `
}

function renderSceneEditor(project: StoryProject, scene: Scene) {
  const chapterOptions = sortedChapters(project)
    .map((chapter) => `<option value="${chapter.id}" ${chapter.id === scene.chapterId ? 'selected' : ''}>${escapeHtml(chapter.title)}</option>`)
    .join('')
  const locationOptions = [`<option value="">No location</option>`]
    .concat(project.locations.map((location) => `<option value="${location.id}" ${location.id === scene.locationId ? 'selected' : ''}>${escapeHtml(location.name)}</option>`))
    .join('')

  return `
    <div class="section-head"><h3>Scene editor</h3><div class="toolbar compact"><button data-action="open-scene-in-manuscript" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}">Open in manuscript</button><button data-action="open-scene-in-timeline" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}">Open in timeline</button><button data-action="open-scene-in-meetings" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}">Open in meetings</button><button class="danger" data-action="delete-scene" data-scene-id="${scene.id}">Delete</button></div></div>
    <div class="split-2">
      <label>Scene title<input id="scene-title" value="${escapeAttr(scene.title)}" /></label>
      <label>Timeline label<input id="scene-time" value="${escapeAttr(scene.timeLabel)}" /></label>
    </div>
    <div class="split-3">
      <label>Chapter<select id="scene-chapter">${chapterOptions}</select></label>
      <label>Order<input id="scene-order" type="number" min="1" value="${scene.order}" /></label>
      <label>Status<select id="scene-status">
        <option value="draft" ${scene.status === 'draft' ? 'selected' : ''}>Draft</option>
        <option value="outline" ${scene.status === 'outline' ? 'selected' : ''}>Outline</option>
        <option value="revised" ${scene.status === 'revised' ? 'selected' : ''}>Revised</option>
      </select></label>
    </div>
    <label>Location<select id="scene-location">${locationOptions}</select></label>
    <label>Summary<textarea id="scene-summary">${escapeHtml(scene.summary)}</textarea></label>
    <label>Draft text<textarea id="scene-content" class="large">${escapeHtml(scene.content)}</textarea></label>
    <fieldset class="character-picker">
      <legend>Characters in this scene</legend>
      ${project.characters
        .map(
          (character) => `<label class="check-row"><input type="checkbox" value="${character.id}" ${scene.characterIds.includes(character.id) ? 'checked' : ''} data-character-toggle /> ${escapeHtml(character.name)}</label>`,
        )
        .join('')}
    </fieldset>
  `
}

function renderCharacterEditor(project: StoryProject, character: Character) {
  const appearances = characterAppearances(project, character.id)
  return `
    <div class="section-head inline-head">
      <h3>Character editor</h3>
      <button class="danger" data-action="delete-character" data-character-id="${character.id}">Delete</button>
    </div>
    <label>Name<input id="character-name" value="${escapeAttr(character.name)}" /></label>
    <label>Role<input id="character-role" value="${escapeAttr(character.role)}" /></label>
    <label>Notes<textarea id="character-notes">${escapeHtml(character.notes)}</textarea></label>
    <p class="muted">Appears in ${appearances.length} scene${appearances.length === 1 ? '' : 's'}.</p>
    <div class="mini-list">
      ${appearances.length
        ? appearances
            .map((scene) => `<button class="search-result" data-action="open-scene-from-character" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}"><strong>${scene.order}. ${escapeHtml(scene.title)}</strong><span>${escapeHtml(scene.timeLabel)}</span><span class="search-result-hint">Open in scene editor</span></button>`)
            .join('')
        : '<p class="muted">No scene appearances yet.</p>'}
    </div>
  `
}

function renderLocationEditor(project: StoryProject, location: Location) {
  const references = locationReferences(project, location.id)
  return `
    <div class="section-head inline-head">
      <h3>Location inspector</h3>
      <button class="danger" data-action="delete-location" data-location-id="${location.id}">Delete</button>
    </div>
    <label>Name<input id="location-name" value="${escapeAttr(location.name)}" /></label>
    <label>Details<textarea id="location-details">${escapeHtml(location.details)}</textarea></label>
    <p class="muted">Referenced by ${references.length} scene${references.length === 1 ? '' : 's'}.</p>
    <div class="mini-list">
      ${references.length
        ? references
            .map((scene) => `<button class="search-result" data-action="open-scene-from-location" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}"><strong>${scene.order}. ${escapeHtml(scene.title)}</strong><span>${escapeHtml(scene.timeLabel || 'Unscheduled')}</span><span class="search-result-hint">Open in scene editor</span></button>`)
            .join('')
        : '<p class="muted">No linked scenes yet.</p>'}
    </div>
  `
}

function sceneMatchesTimelineFilters(project: StoryProject, scene: Scene, filters: TimelineFilters) {
  const location = sceneLocation(project, scene)
  const cast = scene.characterIds.map((id) => characterById(project, id)).filter(Boolean) as Character[]
  const haystack = [
    scene.title,
    scene.summary,
    scene.content,
    scene.timeLabel,
    location?.name || '',
    location?.details || '',
    ...cast.flatMap((character) => [character.name, character.role, character.notes]),
  ].join(' ').toLowerCase()
  const query = filters.query.trim().toLowerCase()

  if (query && !haystack.includes(query)) return false
  if (filters.characterId && !scene.characterIds.includes(filters.characterId)) return false
  if (filters.locationId && scene.locationId !== filters.locationId) return false
  if (filters.status && scene.status !== filters.status) return false
  return true
}

function activeTimelineFilterChips(project: StoryProject, filters: TimelineFilters) {
  const chips: { key: keyof TimelineFilters; label: string }[] = []
  if (filters.query) chips.push({ key: 'query', label: `Search: ${filters.query}` })
  if (filters.characterId) chips.push({ key: 'characterId', label: `Character: ${characterById(project, filters.characterId)?.name || 'Unknown'}` })
  if (filters.locationId) chips.push({ key: 'locationId', label: `Location: ${project.locations.find((location) => location.id === filters.locationId)?.name || 'Unknown'}` })
  if (filters.status) chips.push({ key: 'status', label: `Status: ${filters.status}` })
  return chips
}

function renderTimeline(project: StoryProject, scenes: Scene[]) {
  const filters = state.timelineFilters
  const filteredScenes = scenes.filter((scene) => sceneMatchesTimelineFilters(project, scene, filters))
  const activeSceneId = state.activeSceneId
  const chips = activeTimelineFilterChips(project, filters)
  const characterOptions = [`<option value="">All characters</option>`]
    .concat(project.characters.map((character) => `<option value="${character.id}" ${character.id === filters.characterId ? 'selected' : ''}>${escapeHtml(character.name)}</option>`))
    .join('')
  const locationOptions = [`<option value="">All locations</option>`]
    .concat(project.locations.map((location) => `<option value="${location.id}" ${location.id === filters.locationId ? 'selected' : ''}>${escapeHtml(location.name)}</option>`))
    .join('')

  return `
    <section class="panel timeline-panel">
      <div class="section-head"><h3>Scene timeline</h3><p class="muted">Tracks order, cast, place, and chapter at a glance.</p></div>
      <div class="timeline-filters panel-subtle">
        <div class="section-head inline-head">
          <h3>Filters</h3>
          <button data-action="clear-timeline-filters">Clear filters</button>
        </div>
        <label>Search<input id="timeline-query" placeholder="Search scenes, characters, or locations" value="${escapeAttr(filters.query)}" /></label>
        <div class="split-3">
          <label>Character<select id="timeline-character">${characterOptions}</select></label>
          <label>Location<select id="timeline-location">${locationOptions}</select></label>
          <label>Status<select id="timeline-status"><option value="">All statuses</option><option value="draft" ${filters.status === 'draft' ? 'selected' : ''}>draft</option><option value="outline" ${filters.status === 'outline' ? 'selected' : ''}>outline</option><option value="revised" ${filters.status === 'revised' ? 'selected' : ''}>revised</option></select></label>
        </div>
        ${chips.length ? `<div class="filter-chip-row">${chips.map((chip) => `<button class="filter-chip" data-action="clear-timeline-filter" data-filter-key="${chip.key}">${escapeHtml(chip.label)} ×</button>`).join('')}</div>` : ''}
        <p class="muted">Showing ${filteredScenes.length} of ${scenes.length} scene${scenes.length === 1 ? '' : 's'}.</p>
      </div>
      <div class="timeline-list">
        ${filteredScenes.length
          ? filteredScenes
              .map((scene) => {
                const chapter = sceneChapter(project, scene)
                const location = sceneLocation(project, scene)
                const cast = scene.characterIds.map((id) => characterById(project, id)?.name).filter(Boolean).join(', ')
                return `
                  <article class="timeline-card timeline-card-clickable ${scene.id === activeSceneId ? 'active-arrival' : ''}" data-action="open-scene-from-timeline" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}">
                    <div class="timeline-order">${scene.order}</div>
                    <div>
                      <p class="eyebrow">${escapeHtml(scene.timeLabel || 'Unscheduled')} · ${escapeHtml(chapter?.title || 'No chapter')}</p>
                      <h3>${escapeHtml(scene.title)}</h3>
                      <p>${escapeHtml(scene.summary)}</p>
                      <div class="tag-row">
                        <span>${escapeHtml(location?.name || 'No location')}</span>
                        <span>${escapeHtml(scene.status)}</span>
                        <span>${escapeHtml(cast || 'No characters')}</span>
                      </div>
                      <p class="muted timeline-hint">${scene.id === activeSceneId ? 'Current scene' : 'Open in workspace'}</p>
                    </div>
                  </article>`
              })
              .join('')
          : '<p class="muted">No scenes match the current filters.</p>'}
      </div>
    </section>
  `
}

function renderMeetings(project: StoryProject, scenes: Scene[]) {
  const activeScene = scenes.find((scene) => scene.id === state.activeSceneId)
  const activeNames = activeScene ? activeScene.characterIds.map((id) => characterById(project, id)?.name).filter(Boolean).sort() : []
  const pairs = new Map<string, { names: string; count: number; moments: string[]; active: boolean }>()
  for (const scene of scenes) {
    for (let i = 0; i < scene.characterIds.length; i += 1) {
      for (let j = i + 1; j < scene.characterIds.length; j += 1) {
        const a = characterById(project, scene.characterIds[i])
        const b = characterById(project, scene.characterIds[j])
        if (!a || !b) continue
        const ids = [a.id, b.id].sort().join('|')
        const existing = pairs.get(ids)
        const label = `${a.name} and ${b.name}`
        const moment = `${scene.timeLabel || 'Unscheduled'} in ${sceneLocation(project, scene)?.name || 'unknown location'}`
        const isActivePair = activeNames.length === 2 && activeNames[0] === a.name && activeNames[1] === b.name
        const isCastPair = activeNames.length > 2 && activeNames.includes(a.name) && activeNames.includes(b.name)
        if (existing) {
          existing.count += 1
          existing.moments.push(moment)
          existing.active = existing.active || isActivePair || isCastPair
        } else {
          pairs.set(ids, { names: label, count: 1, moments: [moment], active: isActivePair || isCastPair })
        }
      }
    }
  }

  const rows = [...pairs.values()].sort((a, b) => b.count - a.count)
  return `
    <section class="panel meetings-panel">
      <div class="section-head"><h3>Character meetings</h3><p class="muted">A quick relationship surface for who shares scenes and when.</p></div>
      ${activeScene && activeNames.length > 2 ? `<div class="panel-subtle arrival-note"><p class="muted">Current scene, ${escapeHtml(activeScene.title || 'Untitled scene')}${activeScene.timeLabel ? ` at ${escapeHtml(activeScene.timeLabel)}` : ''}, has cast: ${escapeHtml(activeNames.join(', '))}. Pair highlighting is partial here because the scene has more than two characters.</p><p class="manuscript-link-row"><button class="search-result" data-action="open-scene-from-meetings" data-scene-id="${activeScene.id}" data-chapter-id="${activeScene.chapterId}">Return to the current scene editor</button></p></div>` : ''}
      <div class="meeting-grid">
        ${rows.length
          ? rows
              .map(
                (row) => `<article class="meeting-card ${row.active ? 'active-arrival' : ''}"><h3>${escapeHtml(row.names)}</h3><strong>${row.count} shared scene${row.count === 1 ? '' : 's'}</strong><p>${escapeHtml(row.moments.join(' • '))}</p><p class="muted timeline-hint">${row.active ? (activeNames.length > 2 ? 'Current scene cast pair' : 'Current scene pair') : ''}</p></article>`,
              )
              .join('')
          : '<p class="muted">No overlapping characters yet. Add multiple characters to a scene and this view will come alive.</p>'}
      </div>
    </section>
  `
}

function renderManuscript(project: StoryProject, scenes: Scene[]) {
  const chapterMap = new Map(sortedChapters(project).map((chapter) => [chapter.id, chapter]))
  const grouped = sortedChapters(project).map((chapter) => ({
    chapter,
    scenes: scenes.filter((scene) => scene.chapterId === chapter.id),
  }))
  const orphanScenes = scenes.filter((scene) => !chapterMap.has(scene.chapterId))

  return `
    <section class="panel manuscript-panel">
      <div class="section-head manuscript-head">
        <div>
          <h3>Compiled manuscript</h3>
          <p class="muted">A read-only assembly of the current project by chapter and scene order.</p>
        </div>
        <div class="manuscript-meta muted">${scenes.length} scene${scenes.length === 1 ? '' : 's'} across ${project.chapters.length} chapter${project.chapters.length === 1 ? '' : 's'}</div>
      </div>
      <article class="manuscript-body">
        <header class="manuscript-cover">
          <p class="eyebrow">Narrative debugging output</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p>${escapeHtml(project.premise || 'No premise yet.')}</p>
        </header>
        ${grouped
          .map(({ chapter, scenes: chapterScenes }) => `
            <section class="manuscript-chapter">
              <p class="eyebrow">Chapter ${chapter.order}</p>
              <h2>${escapeHtml(chapter.title)}</h2>
              ${chapter.summary ? `<p class="chapter-summary">${escapeHtml(chapter.summary)}</p>` : ''}
              ${chapterScenes.length
                ? chapterScenes.map((scene) => renderManuscriptScene(project, scene)).join('')
                : '<p class="muted">No scenes in this chapter yet.</p>'}
            </section>
          `)
          .join('')}
        ${orphanScenes.length
          ? `<section class="manuscript-chapter"><p class="eyebrow">Unassigned</p><h2>Scenes without a valid chapter</h2>${orphanScenes.map((scene) => renderManuscriptScene(project, scene)).join('')}</section>`
          : ''}
      </article>
    </section>
  `
}

function renderManuscriptScene(project: StoryProject, scene: Scene) {
  const location = sceneLocation(project, scene)
  const cast = scene.characterIds.map((id) => characterById(project, id)?.name).filter(Boolean)
  const isActive = scene.id === state.activeSceneId
  return `
    <section class="manuscript-scene ${isActive ? 'active-arrival' : ''}">
      <div class="manuscript-scene-head">
        <p class="eyebrow">Scene ${scene.order}${scene.timeLabel ? ` · ${escapeHtml(scene.timeLabel)}` : ''}</p>
        <h3>${escapeHtml(scene.title || 'Untitled scene')}</h3>
      </div>
      <div class="tag-row manuscript-tags">
        <span>${escapeHtml(location?.name || 'No location')}</span>
        <span>${escapeHtml(scene.status)}</span>
        <span>${escapeHtml(cast.join(', ') || 'No characters')}</span>
      </div>
      <p class="manuscript-link-row"><button class="search-result" data-action="open-scene-from-manuscript" data-scene-id="${scene.id}" data-chapter-id="${scene.chapterId}">${isActive ? 'Current scene in workspace' : 'Open this scene in the workspace editor'}</button></p>
      ${scene.summary ? `<p class="scene-summary">${escapeHtml(scene.summary)}</p>` : ''}
      <div class="scene-content-block">${scene.content ? scene.content.split(/\n{2,}/).map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`).join('') : '<p class="muted">No draft text yet.</p>'}</div>
    </section>
  `
}

function bindEvents(project: StoryProject, activeScene?: Scene, activeCharacter?: Character) {
  const on = (selector: string, handler: (element: HTMLElement) => void) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.addEventListener('click', () => handler(element))
    })
  }

  on('[data-project-id]', (element) => {
    update((draft) => {
      draft.activeProjectId = element.dataset.projectId!
      const nextProject = getProject()
      draft.activeChapterId = sortedChapters(nextProject)[0]?.id
      draft.activeSceneId = sortedScenes(nextProject)[0]?.id
      draft.activeCharacterId = nextProject.characters[0]?.id
      draft.activeLocationId = nextProject.locations[0]?.id
    })
  })

  on('[data-view]', (element) => update((draft) => { draft.view = element.dataset.view as AppState['view'] }))
  on('[data-action="create-project"]', () => createProject())
  on('[data-action="project-export"]', () => exportProject(project))
  on('[data-action="project-import"]', () => document.getElementById('project-import-file')?.click())
  on('[data-action="theme-toggle"]', () => update((draft) => { draft.theme = draft.theme === 'dark' ? 'light' : 'dark' }))
  on('[data-action="seed-reset"]', () => { if (confirm('Replace local data with the demo project?')) { state = defaultState(); saveState(); render() } })
  on('[data-action="clear-timeline-filters"]', () => update((draft) => { draft.timelineFilters = emptyTimelineFilters() }))
  on('[data-action="clear-timeline-filter"]', (element) => update((draft) => {
    const key = element.dataset.filterKey as keyof TimelineFilters
    if (!key) return
    draft.timelineFilters[key] = '' as never
  }))
  on('[data-action="open-scene-from-timeline"]', (element) => update((draft) => {
    draft.view = 'workspace'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId!
  }))
  on('[data-action="open-search-result"]', (element) => update((draft) => {
    const resultType = element.dataset.resultType
    const resultId = element.dataset.resultId!
    if (resultType === 'scene') {
      draft.view = 'workspace'
      draft.activeSceneId = resultId
      draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
    }
    if (resultType === 'character') {
      draft.view = 'workspace'
      draft.activeCharacterId = resultId
    }
    if (resultType === 'location') {
      draft.view = 'workspace'
      draft.activeLocationId = resultId
    }
  }))
  on('[data-action="open-scene-from-location"]', (element) => update((draft) => {
    draft.view = 'workspace'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-from-character"]', (element) => update((draft) => {
    draft.view = 'workspace'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-from-manuscript"]', (element) => update((draft) => {
    draft.view = 'workspace'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-from-meetings"]', (element) => update((draft) => {
    draft.view = 'workspace'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-in-manuscript"]', (element) => update((draft) => {
    draft.view = 'manuscript'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-in-timeline"]', (element) => update((draft) => {
    draft.view = 'timeline'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-action="open-scene-in-meetings"]', (element) => update((draft) => {
    draft.view = 'meetings'
    draft.activeSceneId = element.dataset.sceneId!
    draft.activeChapterId = element.dataset.chapterId || draft.activeChapterId
  }))
  on('[data-chapter-id]', (element) => update((draft) => { draft.activeChapterId = element.dataset.chapterId! }))
  on('[data-scene-id]', (element) => update((draft) => { draft.activeSceneId = element.dataset.sceneId! }))
  on('[data-character-id]', (element) => update((draft) => { draft.activeCharacterId = element.dataset.characterId! }))
  on('[data-location-id]', (element) => update((draft) => { draft.activeLocationId = element.dataset.locationId! }))
  on('[data-action="add-chapter"]', () => update(() => {
    const current = getProject()
    const chapter = { id: makeId(), title: `Chapter ${current.chapters.length + 1}`, summary: '', order: current.chapters.length + 1 }
    current.chapters.push(chapter)
    state.activeChapterId = chapter.id
    stamp(current)
  }))
  on('[data-action="add-scene"]', (element) => update(() => {
    const current = getProject()
    const chapterId = element.dataset.chapterId || current.chapters[0]?.id || makeId()
    const scene = { id: makeId(), chapterId, title: 'New scene', summary: '', content: '', order: current.scenes.length + 1, timeLabel: '', characterIds: [], status: 'draft' as const }
    current.scenes.push(scene)
    state.activeSceneId = scene.id
    state.activeChapterId = chapterId
    stamp(current)
  }))
  on('[data-action="add-character"]', () => update(() => {
    const current = getProject()
    const character = { id: makeId(), name: `Character ${current.characters.length + 1}`, role: '', notes: '', color: colors[current.characters.length % colors.length] }
    current.characters.push(character)
    state.activeCharacterId = character.id
    stamp(current)
  }))
  on('[data-action="add-location"]', () => update(() => {
    const current = getProject()
    const location = { id: makeId(), name: `Location ${current.locations.length + 1}`, details: '' }
    current.locations.push(location)
    state.activeLocationId = location.id
    stamp(current)
  }))
  on('[data-action="delete-scene"]', (element) => {
    if (confirm('Delete this scene?')) deleteScene(element.dataset.sceneId!)
  })
  on('[data-action="delete-character"]', (element) => {
    const characterId = element.dataset.characterId!
    const character = project.characters.find((item) => item.id === characterId)
    if (!character) return
    const appearances = characterAppearances(project, characterId)
    const warning = `Delete ${character.name}?\n\nThis will remove the character from the project and from any linked scenes.\n\n${describeReferencedScenes(appearances)}`
    if (confirm(warning)) deleteCharacter(characterId)
  })
  on('[data-action="delete-location"]', (element) => {
    const locationId = element.dataset.locationId!
    const location = project.locations.find((item) => item.id === locationId)
    if (!location) return
    const references = locationReferences(project, locationId)
    const warning = `Delete ${location.name}?\n\nThis will remove the location from the project and clear it from any linked scenes.\n\n${describeReferencedScenes(references)}`
    if (confirm(warning)) deleteLocation(locationId)
  })

  const importInput = document.getElementById('project-import-file') as HTMLInputElement | null
  if (importInput) {
    importInput.onchange = async () => {
      await importProjectFile(importInput.files?.[0])
      importInput.value = ''
    }
  }

  bindInput('story-title', (value) => update(() => { project.title = value; stamp(project) }))
  bindInput('story-premise', (value) => update(() => { project.premise = value; stamp(project) }))
  bindInput('story-genre', (value) => update(() => { project.genre = value; stamp(project) }))
  bindInput('story-viewpoint', (value) => update(() => { project.viewpoint = value; stamp(project) }))
  bindInput('workspace-query', (value) => update((draft) => { draft.workspaceQuery = value }))
  bindInput('timeline-query', (value) => update((draft) => { draft.timelineFilters.query = value }))
  bindInput('timeline-character', (value) => update((draft) => { draft.timelineFilters.characterId = value }))
  bindInput('timeline-location', (value) => update((draft) => { draft.timelineFilters.locationId = value }))
  bindInput('timeline-status', (value) => update((draft) => { draft.timelineFilters.status = value as TimelineFilters['status'] }))

  if (activeScene) {
    bindInput('scene-title', (value) => update(() => { activeScene.title = value; stamp(project) }))
    bindInput('scene-time', (value) => update(() => { activeScene.timeLabel = value; stamp(project) }))
    bindInput('scene-summary', (value) => update(() => { activeScene.summary = value; stamp(project) }))
    bindInput('scene-content', (value) => update(() => { activeScene.content = value; stamp(project) }))
    bindInput('scene-order', (value) => update(() => { activeScene.order = Number(value) || 1; stamp(project) }))
    bindInput('scene-chapter', (value) => update(() => { activeScene.chapterId = value; state.activeChapterId = value; stamp(project) }))
    bindInput('scene-location', (value) => update(() => { activeScene.locationId = value || undefined; stamp(project) }))
    bindInput('scene-status', (value) => update(() => { activeScene.status = value as Scene['status']; stamp(project) }))
    document.querySelectorAll<HTMLInputElement>('[data-character-toggle]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => update(() => {
        const id = checkbox.value
        activeScene.characterIds = checkbox.checked ? [...new Set([...activeScene.characterIds, id])] : activeScene.characterIds.filter((item) => item !== id)
        stamp(project)
      }))
    })
  }

  if (activeCharacter) {
    bindInput('character-name', (value) => update(() => { activeCharacter.name = value; stamp(project) }))
    bindInput('character-role', (value) => update(() => { activeCharacter.role = value; stamp(project) }))
    bindInput('character-notes', (value) => update(() => { activeCharacter.notes = value; stamp(project) }))
  }

  const activeLocation = project.locations.find((location) => location.id === state.activeLocationId)
  if (activeLocation) {
    bindInput('location-name', (value) => update(() => { activeLocation.name = value; stamp(project) }))
    bindInput('location-details', (value) => update(() => { activeLocation.details = value; stamp(project) }))
  }
}

function bindInput(id: string, handler: (value: string) => void) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  if (!element) return
  element.addEventListener('input', () => handler(element.value))
  if (element instanceof HTMLSelectElement) element.addEventListener('change', () => handler(element.value))
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function escapeAttr(value: string) {
  return escapeHtml(value)
}

render()
