import { Link } from 'react-router-dom'
import { ChevronRightIcon, PlusSquareIcon } from '../components/Icons.jsx'

export default function Start() {
  return (
    <div className="screen">
      <main className="screen-body start">
        <p className="eyebrow">UNL Campus Events</p>
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
      </main>
    </div>
  )
}
