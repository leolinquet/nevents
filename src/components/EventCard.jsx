import { Link } from 'react-router-dom'
import { timeRange, dayLabel, minutesUntil } from '../data/events.js'

// variant "discover": time · walk · Free badge
// variant "saved": time · starts in X min (today) or day · time
export default function EventCard({ event, variant = 'discover' }) {
  const mins = minutesUntil(event)
  let meta
  if (variant === 'saved') {
    meta =
      event.day === 0
        ? `${timeRange(event)}${mins > 0 ? ` · starts in ${mins} min` : ''}`
        : `${dayLabel(event)} · ${timeRange(event).split('–')[0]}`
  }

  return (
    <Link to={`/event/${event.id}`} className="card event-card">
      {variant === 'discover' ? (
        <div className="event-meta">
          <span className="event-time">
            {event.day !== 0 && `${dayLabel(event)} · `}
            {timeRange(event)}
          </span>
          <span className="muted">{event.walkMin} min walk</span>
          <span className="badge">{event.free ? 'Free' : event.price}</span>
        </div>
      ) : (
        <div className="event-meta">
          <span className="event-time">{meta}</span>
        </div>
      )}
      <h3 className="event-title">{event.title}</h3>
      <p className="muted small">
        {event.host} · {event.place}
      </p>
    </Link>
  )
}
