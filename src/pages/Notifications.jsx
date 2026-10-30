import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { ChevronLeftIcon } from '../components/Icons.jsx'
import { notifications } from '../data/notifications.js'

export default function Notifications() {
    const navigate = useNavigate()
    const unreadCount = notifications.filter((n) => n.unread).length

    return (
        <Screen>
        <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeftIcon /> Back
        </button>

        <header className="page-header">
            <h1 className="display">Notifications</h1>
            <p className="muted">{unreadCount} new</p>
        </header>

        <div className="list">
            {notifications.map((n) => (
            <Link key={n.id} to={n.link} className={`card notif-card ${n.unread ? 'unread' : ''}`}>
                <div className="notif-top">
                <strong>{n.title}</strong>
                <span className="muted tiny">{n.time}</span>
                </div>
                <p className="muted small">{n.body}</p>
            </Link>
            ))}
        </div>
        </Screen>
    )
}