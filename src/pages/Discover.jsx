import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import EventCard from '../components/EventCard.jsx'
import FiltersSheet from '../components/FiltersSheet.jsx'
import { SlidersIcon, BookmarkIcon } from '../components/Icons.jsx'
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

  const results = applyFilters(events, filters)
  const whenLabel = WHEN_OPTIONS.find((o) => o.value === filters.when)?.label
  const activeChips = [
    whenLabel,
    ...filters.where,
    ...filters.categories,
    ...filters.hosts,
    filters.freeOnly && 'Free only',
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

      <div className="chip-row">
        <div className="chips">
          {activeChips.map((label) => (
            <span key={label} className="chip chip-on">{label}</span>
          ))}
        </div>
        <button className="btn-outline" onClick={() => setShowFilters(true)}>
          <SlidersIcon />
          Filters
        </button>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <p>No events match your filters.</p>
          <button className="link-btn" onClick={() => setFilters(DEFAULT_FILTERS)}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="list" style={{ marginTop: 16 }}>
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
