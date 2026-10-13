import { Link } from 'react-router-dom'
import { ChevronRightIcon, PlusSquareIcon, UserIcon, BookmarkIcon } from '../components/Icons.jsx'
import { currentUser } from '../data/user.js'
import { useApp } from '../state/AppContext.jsx'

export default function Start() {
  const { savedIds } = useApp()
  return (
    <div className="screen">
      <main className="screen-body start">
        <div className="home-top">
          <p className="eyebrow">Hi {currentUser.firstName} · UNL Campus Events</p>
          <Link to="/profile" className="avatar-btn" aria-label="Profile">
            <UserIcon />
          </Link>
        </div>
        <h1 className="display">What brings you here today?</h1>
        <p className="muted">Pick one. You can switch anytime from the bottom bar.</p>

        <div className="start-options">
          <Link to="/discover" className="card start-card">
            <div>
              <h2 className="start-title">Find something to do</h2>
              <p className="muted">See what's happening on campus soon and close to you.</p>
            </div>
            <ChevronRightIcon className="accent" />
          </Link>
          <Link to="/post" className="card start-card">
            <div>
              <h2 className="start-title">Post an event</h2>
              <p className="muted">For student org officers who want to reach students.</p>
            </div>
            <PlusSquareIcon className="accent" />
          </Link>
        </div>
        <Link to="/saved" className="card shortcut-card">
          <BookmarkIcon className="accent" />
          <div className="shortcut-text">
            <strong>Saved events</strong>
            <p className="muted small">
              {savedIds.length} {savedIds.length === 1 ? 'event' : 'events'} you're planning to go to
            </p>
          </div>
          <ChevronRightIcon className="muted" />
        </Link>
      </main>
    </div>
  )
}
