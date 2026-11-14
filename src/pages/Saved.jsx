import { useState } from 'react'
import { Link } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'
import { dayLabel, sortByTime, timeRange } from '../data/events.js'

// Owner: Salah
export default function Saved() {
  const { events, savedIds, toggleSaved } = useApp()
  const [removedTitle, setRemovedTitle] = useState('')
  const savedEvents = sortByTime(
    events.filter((event) => savedIds.includes(event.id)),
  )

  return (
    <Screen>
      <header className="page-header">
        <p className="eyebrow">SAVED EVENTS</p>
        <h1 className="display">Saved</h1>
        <p className="muted">Events you saved, in order of start time.</p>
      </header>

      <div role="status" className={removedTitle ? 'callout' : undefined}>
        {removedTitle && `Removed ${removedTitle} from Saved.`}
      </div>

      {savedEvents.length === 0 ? (
        <div className="empty">
          <p>No saved events right now.</p>
          <Link to="/discover" className="link-btn">Browse events</Link>
        </div>
      ) : (
        <div className="list">
          {savedEvents.map((event) => (
            <article key={event.id} className="card">
              <div className="info-row">
                <Link to={`/event/${event.id}`}>
                  <h2 className="event-title" style={{ margin: '0 0 4px' }}>
                    {event.title}
                  </h2>
                  <p className="muted">{dayLabel(event)} · {timeRange(event)}</p>
                  <p className="muted">
                    {event.place}{event.campus && ` · ${event.campus}`}
                  </p>
                </Link>

                <button
                  type="button"
                  className="link-btn"
                  style={{ alignSelf: 'flex-start', padding: '8px 0' }}
                  aria-label={`Remove ${event.title} from saved events`}
                  onClick={() => {
                    toggleSaved(event.id)
                    setRemovedTitle(event.title)
                  }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </Screen>
  )
}