import { NavLink } from 'react-router-dom'
import { HomeIcon, CompassIcon, BookmarkIcon, PlusSquareIcon } from './Icons.jsx'

const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/discover', label: 'Discover', Icon: CompassIcon },
  { to: '/saved', label: 'Saved', Icon: BookmarkIcon },
  { to: '/post', label: 'Post', Icon: PlusSquareIcon },
]

export default function TabBar({ active }) {
  return (
    <nav className="tabbar">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `tab ${isActive || active === to ? 'tab-active' : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}