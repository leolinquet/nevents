import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { ChevronLeftIcon } from '../components/Icons.jsx'
import { currentUser } from '../data/user.js'

export default function Profile() {
    const navigate = useNavigate()
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
        </Screen>
    )
}