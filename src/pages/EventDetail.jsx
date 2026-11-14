import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'
import { dayLabel, timeRange } from '../data/events.js'

function DetailCard({ title, children }) {
  return (
    <section className="card">
      <div className="info-row">
        <h2 className="event-title" style={{ margin: 0 }}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

// Owner: Salah
export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { events, isSaved, toggleSaved } = useApp()
  const [lastChangedEventId, setLastChangedEventId] = useState(null)

  const event = events.find((event) => event.id === id)

  if (!event) {
    return (
      <Screen>
        <button className="back-btn" onClick={() => navigate(-1)}>‹ Back</button>
        <p className="empty">Event not found.</p>
      </Screen>
    )
  }

  const saved = isSaved(event.id)
  const showSaveFeedback = lastChangedEventId === event.id

  return (
    <Screen
      footer={
        <>
          <div role="status" className={showSaveFeedback ? 'callout' : undefined}>
            {showSaveFeedback && (
              <>
                {saved ? 'Saved' : 'Removed from saved'}
                {saved && (
                  <>
                    {' · '}
                    <Link to="/saved" className="link-btn">View saved</Link>
                  </>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            className={saved ? 'btn-secondary' : 'btn-primary'}
            onClick={() => {
              toggleSaved(event.id)
              setLastChangedEventId(event.id)
            }}
          >
            {saved ? 'Remove from saved' : 'Save event'}
          </button>
        </>
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
        <DetailCard title="Location">
          <p className="muted">{event.place} · {event.campus}</p>
          {event.placeDetail && <p className="muted">{event.placeDetail}</p>}
        </DetailCard>

        {(event.free || event.price) && (
          <DetailCard title="Cost">
            <p className="muted">{event.free ? 'Free' : event.price}</p>
          </DetailCard>
        )}

        {(event.access || event.accessDetail) && (
          <DetailCard title="Who can attend?">
            {event.access && <p className="muted">{event.access}</p>}
            {event.accessDetail && <p className="muted">{event.accessDetail}</p>}
          </DetailCard>
        )}

        <DetailCard title="Details">
          <p className="muted">{event.description}</p>
        </DetailCard>
      </div>
    </Screen>
  )
}