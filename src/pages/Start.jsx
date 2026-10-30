import { Link } from 'react-router-dom'
import { ChevronRightIcon, PlusSquareIcon, UserIcon, BookmarkIcon, BellIcon } from '../components/Icons.jsx'
import { currentUser } from '../data/user.js'
import { useApp } from '../state/AppContext.jsx'
import Screen from '../components/Screen.jsx'
import { sortByTime, dayLabel, startTime } from '../data/events.js'

export default function Start() {
  const { events, savedIds } = useApp()
  const nextSaved = sortByTime(events.filter((e) => savedIds.includes(e.id)))[0]
  const verifiedClub = currentUser.clubs.find((club) => club.verified)
  return (
    <Screen>
      <div className="start">
        <div className="home-top">
          <p className="eyebrow">Hi {currentUser.firstName} · UNL Campus Events</p>
          <div className="home-actions">
            <Link to="/notifications" className="avatar-btn" aria-label="Notifications">
              <BellIcon />
            </Link>
            <Link to="/profile" className="avatar-btn" aria-label="Profile">
              <UserIcon />
            </Link>
          </div>
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
              <p className="muted">Student Involvement reviews every post before it goes live.</p>
              {verifiedClub ? (
                <p className="start-status">
                  Posting as {verifiedClub.name}
                  <span className="badge badge-ok">Verified officer</span>
                </p>
              ) : (
                <p className="start-status muted">Only verified club officers can post</p>
              )}
            </div>
            <PlusSquareIcon className="accent" />
          </Link>
        </div>
        <Link to="/saved" className="card shortcut-card">
          <BookmarkIcon className="accent" />
          <div className="shortcut-text">
            <strong>Saved events</strong>
            {nextSaved ? (
              <>
                <p className="shortcut-next">{nextSaved.title}</p>
                <p className="muted small">
                  <span className="accent">{dayLabel(nextSaved)} · {startTime(nextSaved)}</span>
                  {' · '}{savedIds.length} saved
                </p>
              </>
            ) : (
              <p className="muted small">Nothing saved yet. Tap Save on any event to keep it here.</p>
            )}
          </div>
          <ChevronRightIcon className="muted" />
        </Link>
      </div>
    </Screen>
  )
}
