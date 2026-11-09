import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { ChevronLeftIcon } from '../components/Icons.jsx'
import { currentUser } from '../data/user.js'
import { useApp } from '../state/AppContext.jsx'

const formatDate = (value) =>
    new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })

// "Thu, Dec 3 · Avery Hall 115", plus how many extra days if it repeats
const postDetails = (post) => {
    const days = post.days ?? []
    const when = days[0]?.date ? formatDate(days[0].date) : ''
    const extra = days.length > 1 ? ` + ${days.length - 1} more` : ''
    return [when + extra, post.location].filter(Boolean).join(' · ')
}

export default function Profile() {
    const navigate = useNavigate()
    const { pendingPosts, withdrawPost } = useApp()
    const [confirmId, setConfirmId] = useState(null)
    const [withdrawnTitle, setWithdrawnTitle] = useState('')
    const { firstName, lastName, email, year, major } = currentUser
    const initials = firstName[0] + lastName[0]

    const withdraw = (post) => {
        withdrawPost(post.id)
        setConfirmId(null)
        setWithdrawnTitle(post.title)
    }

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

            {withdrawnTitle && (
                <p className="callout callout-neutral" role="status">
                    "{withdrawnTitle}" was withdrawn.
                </p>
            )}

            {pendingPosts.length > 0 ? (
                <div className="list">
                    {pendingPosts.map((post) => (
                        <div key={post.id} className="card post-row">
                            <div className="post-row-top">
                                <strong>{post.title}</strong>
                                <span className="badge">Pending review</span>
                            </div>
                            <p className="muted small">{postDetails(post)}</p>

                            {confirmId === post.id ? (
                                <div className="confirm-row">
                                    <span className="small">Withdraw this post?</span>
                                    <button className="link-btn quiet small" onClick={() => setConfirmId(null)}>
                                        Keep
                                    </button>
                                    <button className="link-btn small" onClick={() => withdraw(post)}>
                                        Withdraw
                                    </button>
                                </div>
                            ) : (
                                <button className="link-btn small" onClick={() => setConfirmId(post.id)}>
                                    Withdraw
                                </button>
                            )}
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