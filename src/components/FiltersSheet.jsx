import { CATEGORIES, CAMPUSES, hosts } from '../data/events.js'
import { DEFAULT_FILTERS, WHEN_OPTIONS, applyFilters } from '../data/filters.js'

const toggle = (list, item) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item])

export default function FiltersSheet({ events, filters, setFilters, onClose }) {
  const set = (patch) => setFilters({ ...filters, ...patch })
  const count = applyFilters(events, filters).length

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-head">
          <h2 className="sheet-title">Filters</h2>
          <button className="link-btn" onClick={() => setFilters(DEFAULT_FILTERS)}>
            Reset
          </button>
        </div>

        <div className="section-label" style={{ marginTop: 20 }}>When</div>
        <div className="chips" style={{ marginTop: 10 }}>
          {WHEN_OPTIONS.map((o) => (
            <button
              key={o.value}
              className={`chip-lg ${filters.when === o.value ? 'on' : ''}`}
              onClick={() => set({ when: o.value })}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="section-label" style={{ marginTop: 20 }}>Where</div>
        <div className="chips" style={{ marginTop: 10 }}>
          {CAMPUSES.map((c) => (
            <button
              key={c}
              className={`chip-lg ${filters.where.includes(c) ? 'on' : ''}`}
              onClick={() => set({ where: toggle(filters.where, c) })}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="section-label" style={{ marginTop: 20 }}>Category</div>
        <div className="chips" style={{ marginTop: 10 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip-lg ${filters.categories.includes(c) ? 'on' : ''}`}
              onClick={() => set({ categories: toggle(filters.categories, c) })}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="section-label" style={{ marginTop: 20 }}>Host</div>
        <div className="chips" style={{ marginTop: 10 }}>
          {hosts.map((h) => (
            <button
              key={h}
              className={`chip-lg ${filters.hosts.includes(h) ? 'on' : ''}`}
              onClick={() => set({ hosts: toggle(filters.hosts, h) })}
            >
              {h}
            </button>
          ))}
        </div>

        <label className="card toggle-row">
          <span>Free events only</span>
          <input
            type="checkbox"
            className="switch"
            checked={filters.freeOnly}
            onChange={(e) => set({ freeOnly: e.target.checked })}
          />
        </label>

        <button className="btn-primary" onClick={onClose}>
          Show {count} {count === 1 ? 'event' : 'events'}
        </button>
      </div>
    </div>
  )
}
