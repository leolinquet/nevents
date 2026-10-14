import { NOW, toMinutes, sortByTime } from './events.js'

export const DEFAULT_FILTERS = {
  when: 'next2h', // 'next2h' | 'today' | 'week'
  where: ['City Campus'], // empty array = any campus
  categories: [],
  hosts: [],
  freeOnly: false,
}

export const WHEN_OPTIONS = [
  { value: 'next2h', label: 'Next 2 hours' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
]

export function applyFilters(events, f) {
  const filtered = events.filter((e) => {
    const start = toMinutes(e.start)
    const end = toMinutes(e.end)
    if (f.when === 'next2h' && !(e.day === NOW.day && end > NOW.minutes && start <= NOW.minutes + 120)) return false
    if (f.when === 'today' && !(e.day === NOW.day && end > NOW.minutes)) return false
    if (f.where.length && !f.where.includes(e.campus)) return false
    if (f.categories.length && !f.categories.includes(e.category)) return false
    if (f.hosts.length && !f.hosts.includes(e.host)) return false
    if (f.freeOnly && !e.free) return false
    return true
  })
  return sortByTime(filtered)
}

