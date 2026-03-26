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

type AppState = {
  projects: StoryProject[]
  activeProjectId: Id
  activeChapterId?: Id
  activeSceneId?: Id
  activeCharacterId?: Id
  theme: 'dark' | 'light'
  view: 'workspace' | 'timeline' | 'meetings'
}

const STORAGE_KEY = 'yggsii-mvp-v1'

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
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    view: 'workspace',
  }
}

let state: AppState = loadState()
const app = document.querySelector<HTMLDivElement>('#app')!

function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultState()
  try {
    const parsed = JSON.parse(raw) as AppState
    if (!parsed.projects?.length) return defaultState()
    return parsed
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
}

function createProject() {
  const title = prompt('Project title?', 'Untitled Story')?.trim()
  if (!title) return
  update((draft) => {
    const chapterId = makeId()
    const sceneId = makeId()
    const project: StoryProject = {
      id: makeId(),
      title,
      premise: '',
      genre: 'Fiction',
      viewpoint: '',
      chapters: [{ id: chapterId, title: 'Chapter 1', summary: '', order: 1 }],
      scenes: [{ id: sceneId, chapterId, title: 'Opening scene', summary: '', content: '', order: 1, timeLabel: 'Day 1', characterIds: [], status: 'draft' }],
      characters: [],
      locations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    draft.projects.unshift(project)
    draft.activeProjectId = project.id
    draft.activeChapterId = chapterId
    draft.activeSceneId = sceneId
    draft.activeCharacterId = undefined
  })
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
            <button data-action="theme-toggle">${state.theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
            <button data-action="seed-reset">Restore demo</button>
          </div>
        </header>
        ${state.view === 'workspace' ? renderWorkspace(project, chapters, scenes, activeScene, activeCharacter) : ''}
        ${state.view === 'timeline' ? renderTimeline(project, scenes) : ''}
        ${state.view === 'meetings' ? renderMeetings(project, scenes) : ''}
      </main>
    </div>
  `

  bindEvents(project, activeScene, activeCharacter)
}

function renderWorkspace(project: StoryProject, chapters: Chapter[], scenes: Scene[], activeScene?: Scene, activeCharacter?: Character) {
  return `
    <section class="workspace-grid">
      <div class="panel column-list">
        <div class="section-head"><h3>Chapters and scenes</h3><button data-action="add-chapter">Add chapter</button></div>
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
            .map(
              (location) => `<div class="location-item"><strong>${escapeHtml(location.name)}</strong><span>${escapeHtml(location.details)}</span></div>`,
            )
            .join('')}
        </div>
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
    <div class="section-head"><h3>Scene editor</h3><button class="danger" data-action="delete-scene" data-scene-id="${scene.id}">Delete</button></div>
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
  const appearances = sortedScenes(project).filter((scene) => scene.characterIds.includes(character.id))
  return `
    <label>Name<input id="character-name" value="${escapeAttr(character.name)}" /></label>
    <label>Role<input id="character-role" value="${escapeAttr(character.role)}" /></label>
    <label>Notes<textarea id="character-notes">${escapeHtml(character.notes)}</textarea></label>
    <p class="muted">Appears in ${appearances.length} scene${appearances.length === 1 ? '' : 's'}.</p>
    <div class="mini-list">
      ${appearances.map((scene) => `<div><strong>${scene.order}. ${escapeHtml(scene.title)}</strong><span>${escapeHtml(scene.timeLabel)}</span></div>`).join('')}
    </div>
  `
}

function renderTimeline(project: StoryProject, scenes: Scene[]) {
  return `
    <section class="panel timeline-panel">
      <div class="section-head"><h3>Scene timeline</h3><p class="muted">Tracks order, cast, place, and chapter at a glance.</p></div>
      <div class="timeline-list">
        ${scenes
          .map((scene) => {
            const chapter = sceneChapter(project, scene)
            const location = sceneLocation(project, scene)
            const cast = scene.characterIds.map((id) => characterById(project, id)?.name).filter(Boolean).join(', ')
            return `
              <article class="timeline-card">
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
                </div>
              </article>`
          })
          .join('')}
      </div>
    </section>
  `
}

function renderMeetings(project: StoryProject, scenes: Scene[]) {
  const pairs = new Map<string, { names: string; count: number; moments: string[] }>()
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
        if (existing) {
          existing.count += 1
          existing.moments.push(moment)
        } else {
          pairs.set(ids, { names: label, count: 1, moments: [moment] })
        }
      }
    }
  }

  const rows = [...pairs.values()].sort((a, b) => b.count - a.count)
  return `
    <section class="panel meetings-panel">
      <div class="section-head"><h3>Character meetings</h3><p class="muted">A quick relationship surface for who shares scenes and when.</p></div>
      <div class="meeting-grid">
        ${rows.length
          ? rows
              .map(
                (row) => `<article class="meeting-card"><h3>${escapeHtml(row.names)}</h3><strong>${row.count} shared scene${row.count === 1 ? '' : 's'}</strong><p>${escapeHtml(row.moments.join(' • '))}</p></article>`,
              )
              .join('')
          : '<p class="muted">No overlapping characters yet. Add multiple characters to a scene and this view will come alive.</p>'}
      </div>
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
    })
  })

  on('[data-view]', (element) => update((draft) => { draft.view = element.dataset.view as AppState['view'] }))
  on('[data-action="create-project"]', () => createProject())
  on('[data-action="theme-toggle"]', () => update((draft) => { draft.theme = draft.theme === 'dark' ? 'light' : 'dark' }))
  on('[data-action="seed-reset"]', () => { if (confirm('Replace local data with the demo project?')) { state = defaultState(); saveState(); render() } })
  on('[data-chapter-id]', (element) => update((draft) => { draft.activeChapterId = element.dataset.chapterId! }))
  on('[data-scene-id]', (element) => update((draft) => { draft.activeSceneId = element.dataset.sceneId! }))
  on('[data-character-id]', (element) => update((draft) => { draft.activeCharacterId = element.dataset.characterId! }))
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
    current.locations.push({ id: makeId(), name: `Location ${current.locations.length + 1}`, details: '' })
    stamp(current)
  }))
  on('[data-action="delete-scene"]', (element) => {
    if (confirm('Delete this scene?')) deleteScene(element.dataset.sceneId!)
  })

  bindInput('story-title', (value) => update(() => { project.title = value; stamp(project) }))
  bindInput('story-premise', (value) => update(() => { project.premise = value; stamp(project) }))
  bindInput('story-genre', (value) => update(() => { project.genre = value; stamp(project) }))
  bindInput('story-viewpoint', (value) => update(() => { project.viewpoint = value; stamp(project) }))

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
