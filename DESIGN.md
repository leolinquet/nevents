# NEVENTS Design Guide

Read this before you start your page. The goal is that the four pages look like one app, not four.

Everything shared already exists in the repo. **Use the shared CSS classes and components instead of writing your own styles.** If you need something that isn't here, add it to `src/index.css` or `src/components/` and tell the group, so nobody builds the same thing twice.

Figma reference: NEVENTS-prototype-v2 (match it as closely as you can).

---

## 1. Who owns what

| Page | Route | File | Owner |
|---|---|---|---|
| Home (start screen) | `/` | `src/pages/Start.jsx` | Leo |
| Discover + Filters | `/discover` | `src/pages/Discover.jsx`, `src/components/FiltersSheet.jsx` | Darius |
| Event detail | `/event/:id` | `src/pages/EventDetail.jsx` | Salah |
| Saved | `/saved` | `src/pages/Saved.jsx` | Salah |
| Post an event | `/post` | `src/pages/PostEvent.jsx` | Patrick |
| Sent for review | `/post/sent/:id` | `src/pages/SentForReview.jsx` | Patrick |
| Shared files (CSS, components, data, state, routes) | | `src/index.css`, `src/components/`, `src/data/`, `src/state/`, `src/App.jsx` | Leo |

Only edit your own page files. If you need to change a shared file, mention it in your pull request.

---

## 2. Colors

All colors are CSS variables in `src/index.css`. Never hardcode a hex value in your page.

| Variable | Value | Use it for |
|---|---|---|
| `--bg` | `#f6f3ee` | Page background (warm cream) |
| `--surface` | `#ffffff` | Cards, inputs, tab bar |
| `--border` | `#e6e1d9` | Card and input borders, dividers |
| `--text` | `#1f1a17` | Main text |
| `--muted` | `#6b635c` | Secondary text, labels |
| `--accent` | `#8c1d2c` | Primary buttons, times, active tab, links |
| `--accent-soft` | `#f5dfe2` | Selected chips, callouts, secondary buttons |
| `--badge` | `#ede8e1` | Small tags like "Free" |
| `--ok` / `--ok-soft` | `#2f6b3a` / `#e1efe3` | Success states only (verified, sent) |

Rule of thumb: one red (`--accent`) action per screen. If everything is red, nothing stands out.

---

## 3. Typography

Two fonts, both loaded in `index.html`:

- **Fraunces** (`--serif`): page titles and event titles only.
- **Inter** (`--sans`): everything else.

| Element | Class | Size |
|---|---|---|
| Page title | `.display` | 32px serif |
| Small caps label above a title ("THURSDAY · 2:04 PM") | `.eyebrow` | 12px, bold, uppercase |
| Section label ("TODAY", "WHEN") | `.section-label` | 12px, bold, uppercase |
| Event title on a card | `.event-title` | 19px serif |
| Body text | default | 16px |
| Secondary text | `.muted` + `.small` | 13px gray |
| Fine print under buttons | `.muted .tiny` | 12px gray |

Write titles in sentence case: "Post an event", not "Post An Event".

---

## 4. Layout

The app runs inside a phone frame (390 × 844). Every page uses the `Screen` component so headers, spacing, footers and the tab bar line up:

```jsx
import Screen from '../components/Screen.jsx'

export default function MyPage() {
  return (
    <Screen footer={<button className="btn-primary">Main action</button>}>
      <header className="page-header">
        <p className="eyebrow">Optional label</p>
        <h1 className="display">Page title</h1>
        <p className="muted">One line of context.</p>
      </header>
      {/* page content */}
    </Screen>
  )
}
```

- `footer` is optional. Use it for the main button so it stays pinned above the tab bar.
- `tab={false}` hides the tab bar (only Home and Sent for review do this).
- Side padding is 20px everywhere. Don't add extra horizontal padding.
- Space between stacked cards: wrap them in `<div className="list">` (10px gap).

---

## 5. Components and classes

**Cards**
- `.card`: white box, 1px border, 14px radius. Base for anything boxed.
- `<EventCard event={e} />`: use this anywhere you show an event in a list. Use `variant="saved"` on the Saved page.

**Buttons**
- `.btn-primary`: full width, red, 52px tall. The main action of the screen.
- `.btn-secondary`: same size, light red. Secondary action.
- `.btn-pair`: wrap two buttons side by side.
- `.btn-outline`: pill with red border (the Filters button).
- `.link-btn`: red text only (Reset).
- `.back-btn`: "‹ Back" at the top of detail pages.

**Chips**
- `.chip`: small gray tag, display only.
- `.chip.chip-on`: active filter shown on Discover.
- `.chip-lg` / `.chip-lg.on`: big tappable chip used inside the filters sheet.
- `.badge`: tiny tag on the right of a card ("Free", "$5").

**Forms**
- Wrap each input in `<label className="field"><span>Label</span><input /></label>`.
- `.field-row`: two fields side by side.
- `.segmented`: two-option toggle (All students / Club members only).
- `.check-row`: checkbox inside a card.
- `.invalid` on an input when it's missing, plus a `.error` line explaining what to fix.

**Other**
- `.callout`: light red box for important info ("Starts in 26 minutes").
- `.callout-neutral`: gray version for notes.
- `.info-list` + `.info-row`: stacked rows with dividers (where / access / cost on Event detail).
- `.empty`: centered gray text when a list has no results. Every list needs one.

**Icons** live in `src/components/Icons.jsx`. Use those, don't paste new SVGs into your page. Need a new icon? Add it there with the same stroke style (2px, rounded).

---

## 6. Data and state

- Events come from `src/data/events.js`. Use the helpers (`timeRange`, `dayLabel`, `minutesUntil`) instead of formatting times yourself.
- The app pretends it is always **Thursday, 2:04 PM**. Don't use the real clock.
- Shared state comes from `useApp()`:

```jsx
import { useApp } from '../state/AppContext.jsx'
const { events, isSaved, toggleSaved, filters, setFilters, submitPost, pendingPosts } = useApp()
```
- Navigate with `<Link to="/saved">` or `useNavigate()`. Never use `<a href>` or `window.location`.

---

## 7. Writing style (copy)

- Short and plain. "Save event", not "Click here to save this event to your list".
- Talk to the student: "6 min walk from you".
- Times: `2:30–3:15 PM` (en dash, AM/PM once at the end if both match).
- Separators: use ` · ` between pieces of info ("ASUN · Nebraska Union").

---

## 8. The assignment rule: wrong paths must exist

Instructor will try to complete each task without knowing where things are. **Every button and tab has to go somewhere real**, even if it's not the right place for the task. When you build your page, ask: if someone lands here by mistake, does it make sense, and can they get back?

Don't build pages where there's only one thing to click.

---

## 9. Git workflow

1. `git pull` on `main` before you start.
2. Create your branch: `git checkout -b [name]` 
3. Commit often with clear messages.
4. Push and open a pull request to `main`. Someone else glances at it before merging.
5. Never push directly to `main`.
