import { Routes, Route, Navigate } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame.jsx'
import Start from './pages/Start.jsx'
import Discover from './pages/Discover.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Saved from './pages/Saved.jsx'
import PostEvent from './pages/PostEvent.jsx'
import SentForReview from './pages/SentForReview.jsx'

export default function App() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/post" element={<PostEvent />} />
        <Route path="/post/sent/:id" element={<SentForReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
