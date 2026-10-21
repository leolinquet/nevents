import { useParams, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'
import { dayLabel, timeRange } from '../data/events.js'

// Owner: Salah
export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { events, isSaved, toggleSaved } = useApp()

  const event = events.find((e) => e.id === id)

  if (!event) {
    return (
      <Screen>
        <button className="back-btn" onClick={() => navigate(-1)}>‹ Back</button>
        <p className="empty">Event not found.</p>
      </Screen>
    )
  }

  const saved = isSaved(event.id)

  return (
    <Screen
      footer={
        <button
          className={saved ? 'btn-secondary' : 'btn-primary'}
          onClick={() => toggleSaved(event.id)}
        >
          {saved ? 'Remove from saved' : 'Save event'}
        </button>
      }
    >
      <button className="back-btn" onClick={() => navigate(-1)}>
        ‹ Back
      </button>

      <header className="page-header">
        <p className="eyebrow">{event.host}</p>
        <h1 className="display">{event.title}</h1>
        <p className="muted">{dayLabel(event)} · {timeRange(event)}</p>
      </header>

      <div className="list">
        <div className="card">
          <h3 className="event-title">Location</h3>
          <p className="muted small">{event.place} · {event.campus}</p>
        </div>

        <div className="card">
          <h3 className="event-title">Details</h3>
          <p className="muted small">{event.description}</p>
        </div>
      </div>
    </Screen>
  )
}