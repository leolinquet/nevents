// Fake data for the prototype. The app pretends it is always Thursday, 2:04 PM.
// day: 0 = today (Thu), 1 = Fri, 2 = Sat ... 6 = Wed
// start / end: "HH:MM" in 24h time

export const NOW = { day: 0, minutes: 14 * 60 + 4 }

export const DAY_NAMES = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']
export const CATEGORIES = ['Academic', 'Social', 'Wellness', 'Service']
export const CAMPUSES = ['City Campus', 'East Campus']

export const events = [
  {
    id: 'trivia-warmup',
    title: 'Trivia night + free Runza',
    fullTitle: 'Trivia night warm-up + free Runza',
    host: 'ASUN',
    hostFull: 'ASUN Student Government',
    day: 0, start: '14:30', end: '15:15',
    campus: 'City Campus', place: 'Nebraska Union, the Crib', placeDetail: 'Lower level',
    walkMin: 6, category: 'Social', free: true,
    access: 'Open to all students', accessDetail: 'No sign-up, come and go',
    food: 'Runza sandwiches while they last',
    description: "Practice round before Thursday's campus-wide trivia tournament. Teams form on the spot, so showing up alone is normal.",
  },
  {
    id: 'grad-panel',
    title: 'Grad panel: CS & SWE',
    host: 'ACM @ Nebraska',
    day: 0, start: '14:45', end: '15:30',
    campus: 'City Campus', place: 'Avery Hall 115', placeDetail: 'First floor',
    walkMin: 2, category: 'Academic', free: true,
    access: 'Open to all students', accessDetail: 'No sign-up needed',
    description: 'Recent CS and SWE grads talk about job hunting, internships and what they wish they knew as undergrads. Q&A at the end.',
  },
  {
    id: 'outdoor-yoga',
    title: 'Outdoor yoga on the green',
    host: 'Campus Rec',
    day: 0, start: '15:00', end: '15:45',
    campus: 'City Campus', place: 'Broyhill Plaza', placeDetail: 'Moves to the Rec Center if it rains',
    walkMin: 4, category: 'Wellness', free: true,
    access: 'Open to all students', accessDetail: 'Bring a mat or borrow one',
    description: 'All-levels flow led by a Campus Rec instructor. Wear comfortable clothes.',
  },
  {
    id: 'plant-sale',
    title: 'Fall plant sale',
    host: 'Horticulture Club',
    day: 0, start: '15:00', end: '17:00',
    campus: 'East Campus', place: 'East Campus Union', placeDetail: 'Main lobby',
    walkMin: 22, category: 'Social', free: false, price: '$3–$10',
    access: 'Open to everyone', accessDetail: 'Cash or card',
    description: 'Succulents, herbs and houseplants grown by club members. Proceeds fund spring trips.',
  },
  {
    id: 'resume-dropin',
    title: 'Resume review drop-in',
    host: 'Career Services',
    day: 0, start: '16:30', end: '18:00',
    campus: 'City Campus', place: 'Nebraska Union, Room 225', placeDetail: 'Second floor',
    walkMin: 6, category: 'Academic', free: true,
    access: 'Open to all students', accessDetail: 'Bring a printed or digital copy',
    description: 'Quick 10-minute resume reviews with career coaches. First come, first served.',
  },
  {
    id: 'coffee-hour',
    title: 'International coffee hour',
    host: 'Global Huskers',
    day: 0, start: '17:00', end: '18:00',
    campus: 'City Campus', place: 'Jackie Gaughan Multicultural Center', placeDetail: 'Main lounge',
    walkMin: 9, category: 'Social', free: true,
    access: 'Open to all students', accessDetail: 'Come and go',
    food: 'Coffee and snacks from around the world',
    description: 'Meet students from all over the world over coffee. Great place to practice a new language.',
  },
  {
    id: 'hack-info',
    title: 'Husker Hack info session',
    host: 'ACM @ Nebraska',
    day: 1, start: '18:00', end: '19:00',
    campus: 'City Campus', place: 'Avery Hall 115', placeDetail: 'First floor',
    walkMin: 2, category: 'Academic', free: true,
    access: 'Open to all students', accessDetail: 'No experience needed',
    food: 'Pizza',
    description: 'Learn how the spring hackathon works, find teammates and ask the organizers anything.',
  },
  {
    id: 'volleyball',
    title: 'Intramural volleyball sign-ups',
    host: 'Campus Rec',
    day: 1, start: '12:00', end: '14:00',
    campus: 'City Campus', place: 'Campus Rec Center', placeDetail: 'Front desk',
    walkMin: 7, category: 'Wellness', free: false, price: '$10 per team',
    access: 'Open to all students', accessDetail: 'Teams of 6',
    description: 'Register your team for the fall intramural volleyball league.',
  },
  {
    id: 'habitat-build',
    title: 'Huskers for Habitat build day',
    host: 'Habitat for Humanity',
    day: 2, start: '09:00', end: '13:00',
    campus: 'City Campus', place: 'Union loop', placeDetail: 'Van leaves from here',
    walkMin: 6, category: 'Service', free: true,
    access: 'Sign-up required', accessDetail: 'Closed-toe shoes required',
    description: 'Help build a home with Lincoln Habitat for Humanity. Transportation and lunch included.',
  },
  {
    id: 'diwali-night',
    title: 'Diwali night',
    host: 'Global Huskers',
    day: 2, start: '18:00', end: '21:00',
    campus: 'City Campus', place: 'Nebraska Union Ballroom', placeDetail: 'Third floor',
    walkMin: 6, category: 'Social', free: false, price: '$5',
    access: 'Open to everyone', accessDetail: 'Tickets at the door',
    food: 'Dinner included',
    description: 'Dinner, dance performances and a fashion show celebrating the festival of lights.',
  },
  {
    id: 'dairy-tour',
    title: 'Dairy Store tour + ice cream',
    host: 'East Campus Activities',
    day: 4, start: '13:00', end: '14:00',
    campus: 'East Campus', place: 'Dairy Store', placeDetail: 'Food Innovation Center',
    walkMin: 25, category: 'Social', free: true,
    access: 'Open to all students', accessDetail: 'Limited to 20 people',
    food: 'Free scoop of ice cream',
    description: 'See how the Dairy Store makes its ice cream and get a free scoop at the end.',
  },
  {
    id: 'study-jam',
    title: 'Midterm study jam',
    host: 'ACM @ Nebraska',
    day: 5, start: '19:00', end: '22:00',
    campus: 'City Campus', place: 'Love Library South', placeDetail: 'Room 221',
    walkMin: 5, category: 'Academic', free: true,
    access: 'Open to all students', accessDetail: 'Tutors for CSCE 155 and 156',
    food: 'Snacks',
    description: 'Quiet study space with upperclassmen tutors around to help.',
  },
  {
    id: 'stress-workshop',
    title: 'Managing midterm stress',
    host: 'Campus Rec',
    day: 6, start: '15:00', end: '16:00',
    campus: 'East Campus', place: 'East Campus Rec', placeDetail: 'Room 104',
    walkMin: 24, category: 'Wellness', free: true,
    access: 'Open to all students', accessDetail: 'No sign-up',
    description: 'Practical tips for sleep, focus and stress during exam season.',
  },
  {
    id: 'food-bank',
    title: 'Food bank volunteer shift',
    host: 'Center for Civic Engagement',
    day: 6, start: '17:00', end: '19:00',
    campus: 'East Campus', place: 'East Campus Union', placeDetail: 'Meet in the lobby',
    walkMin: 22, category: 'Service', free: true,
    access: 'Sign-up required', accessDetail: 'Counts toward service hours',
    description: 'Sort and pack food for the Lincoln Food Bank.',
  },
]

// ---------- helpers ----------

export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const fmt = (hhmm) => {
  let [h, m] = hhmm.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return { text: `${h}:${String(m).padStart(2, '0')}`, ampm }
}

export const timeRange = (e) => {
  const a = fmt(e.start)
  const b = fmt(e.end)
  return a.ampm === b.ampm ? `${a.text}–${b.text} ${b.ampm}` : `${a.text} ${a.ampm}–${b.text} ${b.ampm}`
}

export const startTime = (e) => {
  const a = fmt(e.start)
  return `${a.text} ${a.ampm}`
}

export const dayLabel = (e) => (e.day === NOW.day ? 'Today' : e.day === NOW.day + 1 ? 'Tomorrow' : DAY_NAMES[e.day])

export const minutesUntil = (e) => (e.day - NOW.day) * 24 * 60 + toMinutes(e.start) - NOW.minutes

export const sortByTime = (list) => [...list].sort((a, b) => minutesUntil(a) - minutesUntil(b))

export const hosts = [...new Set(events.map((e) => e.host))]
