/*
 * Author: Patrick Gurney
 * Date: October 14, 2026
 * Description: Confirms event submission and displays its details and review information.
 * TODOs:
 *      - Update description in author header to be more detailed.
 *      - Currently event postings are not stored. Must implement data storage or email routing for event postings.
 *      - Update the card summary so that the information in a smaller font is better spaced and distinguishable
 */

import { useNavigate, useParams } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'
export default function SentForReview() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { pendingPosts } = useApp()

    const event = pendingPosts.find((post) => post.id === id)

    const formatDate = (value) => {
        if (!value) return ''
        return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        })
    }

    const formatTime = (value) => {
        if (!value) return ''
        return new Date(`2000-01-01T${value}:00`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        })
    }

    const timeRange =
        event?.startTime && event?.endTime
            ? `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`
            : ''

    return (
        <Screen
            tab={false}
            footer={
                <div className="sent-actions">
                    <button
                        type="button"
                        className="sent-secondary"
                        onClick={() => navigate('/post')}
                    >
                        Post another event
                    </button>
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => navigate('/')}
                    >
                        Back to start
                    </button>
                </div>
            }
        >
            <div className="success-icon" aria-label="Success">
                <span aria-hidden="true">✓</span>
            </div>

            <header className="page-header sent-header">
                <h1 className="display">Sent for review</h1>
                <p className="muted">
                    Student Involvement usually approves posts within a few hours during business days.
                </p>
            </header>

            {event ? (
                <article className="card summary">
                    <h2 className="event-title">{event.title}</h2>

                    {event.days?.length > 0 ? (
                        event.days.map((day, index) => (
                            <p className="muted small" key={`${day.date}-${index}`}>
                                {event.days.length > 1 && `Day ${index + 1}: `}
                                {formatDate(day.date)}
                                {' · '}
                                {formatTime(day.startTime)} – {formatTime(day.endTime)}
                                {day.endTime < day.startTime && ' (ends the following day)'}
                            </p>
                        ))
                    ) : (
                        <p className="muted small">
                            {formatDate(event.date)}
                            {timeRange && ` · ${timeRange}`}
                        </p>
                    )}

                    {event.location && (
                        <p className="muted small">{event.location}</p>
                    )}

                    {event.moreInfo && (
                        <p className="muted small">{event.moreInfo}</p>
                    )}

                    <div className="chips">
                        <span className="chip">{event.campus}</span>
                        <span className="chip">{event.category}</span>
                        <span className="chip">
                            {event.audience === 'club' ? 'Club members only' : 'All students'}
                        </span>
                        {event.freeFood && <span className="chip">Free food</span>}
                    </div>
                </article>
            ) : (
                <div className="card summary">
                    <p className="event-title">No event found</p>
                    <p className="muted small">
                        This event may no longer be available.
                    </p>
                </div>
            )}

            <div className="callout sent-callout">
                {event?.audience === 'club'
                    ? 'Once approved, your event will show up in Discover for all club members browsing City Campus or Academic events.'
                    : 'Once approved, your event will show up in Discover for any student browsing City Campus or Academic events.'}
            </div>
        </Screen>
    )
}