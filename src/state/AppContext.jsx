import { createContext, useContext, useState } from 'react'
import { events as seedEvents } from '../data/events.js'
import { DEFAULT_FILTERS } from '../data/filters.js'

const AppContext = createContext(null)

// All state lives in memory. Refreshing the page resets the prototype.
export function AppProvider({ children }) {
  const [events] = useState(seedEvents)
  const [savedIds, setSavedIds] = useState(['habitat-build'])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [pendingPosts, setPendingPosts] = useState([])

  const isSaved = (id) => savedIds.includes(id)
  const toggleSaved = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  const submitPost = (post) => {
    const newPost = { ...post, id: `post-${Date.now()}` }
    setPendingPosts((p) => [...p, newPost])
    return newPost.id
  }

  const value = {
    events, savedIds, isSaved, toggleSaved,
    filters, setFilters,
    pendingPosts, submitPost,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
