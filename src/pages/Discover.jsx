import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import EventCard from '../components/EventCard.jsx'
import FiltersSheet from '../components/FiltersSheet.jsx'
import { SlidersIcon, BookmarkIcon, SearchIcon } from '../components/Icons.jsx'
import { useApp } from '../state/AppContext.jsx'
import { applyFilters, DEFAULT_FILTERS, WHEN_OPTIONS } from '../data/filters.js'
import { NOW, DAY_NAMES } from '../data/events.js'

const clock = (minutes) => {
  const h = Math.floor(minutes / 60)
  return `${h % 12 || 12}:${String(minutes % 60).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

// Owner: Darius
export default function Discover() {
  const { events, filters, setFilters, isSaved, toggleSaved } = useApp()
  const [showFilters, setShowFilters] = useState(false)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const handleSave = (event) => {
    const wasSaved = isSaved(event.id)
    toggleSaved(event.id)
    setToast({ id: event.id, saved: !wasSaved, title: event.title })
  }

  const filteredEvents = applyFilters(events, filters)
  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery
    ? filteredEvents.filter((event) =>
        [event.title, event.fullTitle, event.host, event.place, event.campus, event.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery)),
      )
    : filteredEvents
  const whenLabel = WHEN_OPTIONS.find((o) => o.value === filters.when)?.label
  const activeChips = [
    whenLabel && { label: whenLabel, patch: { when: DEFAULT_FILTERS.when } },
    ...filters.where.map((value) => ({ label: value, patch: { where: filters.where.filter((item) => item !== value) } })),
    ...filters.categories.map((value) => ({ label: value, patch: { categories: filters.categories.filter((item) => item !== value) } })),
    ...filters.hosts.map((value) => ({ label: value, patch: { hosts: filters.hosts.filter((item) => item !== value) } })),
    filters.freeOnly && { label: 'Free only', patch: { freeOnly: false } },
  ].filter(Boolean)

  return (
    <Screen
      footer={
        toast && (
          <div className="callout" role="status">
            <strong>{toast.saved ? 'Saved' : 'Removed from saved'}</strong>
            <br />
            {toast.title} ·{' '}
            <Link to="/saved" className="link-btn">
              View saved
            </Link>
          </div>
        )
      }
    >
      <header className="page-header">
        <p className="eyebrow">
          {DAY_NAMES[NOW.day]} · {clock(NOW.minutes)}
        </p>
        <h1 className="display">Discover</h1>
        <p className="muted">
          {results.length} {results.length === 1 ? 'event' : 'events'} for you
        </p>
      </header>

      <label className="search-field">
        <SearchIcon aria-hidden="true" />
        <span className="sr-only">Search events</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search events, hosts, or places"
        />
        {query && (
          <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
            Clear
          </button>
        )}
      </label>

      <div className="filter-controls">
        <button className="btn-outline" onClick={() => setShowFilters(true)}>
          <SlidersIcon />
          Filters
        </button>
      </div>

      {activeChips.length > 0 && (
        <div className="active-filters" aria-label="Active filters">
          {activeChips.map(({ label, patch }) => (
            <button key={label} className="chip chip-on chip-removable" onClick={() => setFilters({ ...filters, ...patch })}>
              {label} <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <div className="empty">
          <p>{query ? 'No events match your search.' : 'No events match your filters.'}</p>
          <div className="empty-actions">
            {query && <button className="link-btn" onClick={() => setQuery('')}>Clear search</button>}
            <button className="link-btn" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <div className="list discover-list">
          {results.map((event) => {
            const saved = isSaved(event.id)
            return (
              <div key={event.id} style={{ position: 'relative' }}>
                <EventCard event={event} variant="discover" />
                <button
                  onClick={() => handleSave(event)}
                  aria-label={saved ? `Remove ${event.title} from saved` : `Save ${event.title}`}
                  aria-pressed={saved}
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 8,
                    padding: 8,
                    color: saved ? 'var(--accent)' : 'var(--muted)',
                  }}
                >
                  <BookmarkIcon fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {showFilters && (
        <FiltersSheet
          events={events}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </Screen>
  )
}
