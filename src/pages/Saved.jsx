import { Link } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'
import { dayLabel, timeRange } from '../data/events.js'

// Owner: Salah
export default function Saved() {
  const { events, savedIds } = useApp()
  const savedEvents = events.filter((e) => savedIds.includes(e.id))

  return (
    <Screen>
      <header className="page-header">
        <p className="eyebrow">SAVED EVENTS</p>
        <h1 className="display">Saved</h1>
        <p className="muted">Events you are planning to go to.</p>
      </header>

      {savedEvents.length === 0 ? (
        <div className="empty">
          <p>No saved events right now.</p>
        </div>
      ) : (
        <div className="list">
          {savedEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`} className="card event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="muted small">
                {dayLabel(event)} · {timeRange(event)} · {event.place}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Screen>
  )
}