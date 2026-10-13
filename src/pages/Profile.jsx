import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { ChevronLeftIcon } from '../components/Icons.jsx'
import { currentUser } from '../data/user.js'
import { useApp } from '../state/AppContext.jsx'

export default function Profile() {
    const navigate = useNavigate()
    const { pendingPosts } = useApp()
    const { firstName, lastName, email, year, major } = currentUser
    const initials = firstName[0] + lastName[0]

    return (
        <Screen>
        <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeftIcon /> Back
        </button>

        <div className="profile-head">
            <div className="avatar-lg">{initials}</div>
            <div>
            <h1 className="display profile-name">{firstName} {lastName}</h1>
            <p className="muted small">{year} · {major}</p>
            <p className="muted small">{email}</p>
            </div>
        </div>

        <p className="section-label">My clubs</p>
        <div className="list">
        {currentUser.clubs.map((club) => (
            <div key={club.name} className="card club-row">
            <div>
                <strong>{club.name}</strong>
                <p className="muted small">{club.role}</p>
            </div>
            <span className={`badge ${club.verified ? 'badge-ok' : ''}`}>
                {club.verified ? 'Verified officer' : 'Not verified'}
            </span>
            </div>
        ))}
        </div>
        <p className="section-label">My posted events</p>
        {pendingPosts.length > 0 ? (
        <div className="list">
            {pendingPosts.map((post) => (
            <div key={post.id} className="card club-row">
                <div>
                <strong>{post.title}</strong>
                <p className="muted small">{post.place}</p>
                </div>
                <span className="badge">Pending review</span>
            </div>
            ))}
        </div>
        ) : (
        <div className="card empty-card">
            <p className="muted small">You haven't posted any events yet.</p>
            <Link to="/post" className="link-btn">Post an event</Link>
        </div>
        )}
        </Screen>

        

        
    )
}