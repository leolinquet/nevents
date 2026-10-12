import { NavLink } from 'react-router-dom'
import { CompassIcon, BookmarkIcon, PlusSquareIcon } from './Icons.jsx'

const tabs = [
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
          className={({ isActive }) => `tab ${isActive || active === to ? 'tab-active' : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
