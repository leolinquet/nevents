# NEVENTS

Functional mobile prototype of NEVENTS, a campus events app for UNL students. Built with React and Vite for CSCE 378 (Human-Computer Interaction).

## Intended users

- **Students** with a gap between classes who want to find something to do on campus, soon and close by.
- **Student org officers** who want to post their club's events so other students can find them.

## Core tasks

1. Find an event happening soon on City Campus and save it.
2. Filter events to show only free events on City Campus.
3. Post an event as a verified club officer and submit it for review.

All three tasks start on the Home screen. Every button and tab leads to a real screen, so wrong choices can be explored and undone.

## Run it

Requirements: Node.js 20.19 or newer, and a modern browser (tested in Chrome).

```bash
git clone https://github.com/leolinquet/nevents.git
cd nevents
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173). On a laptop the app shows inside a phone-sized frame. On a phone, or in Chrome DevTools mobile view, it fills the screen.

## Known limitations and simulated features

- No backend. Events are fake data in `src/data/events.js` and everything lives in memory. Refreshing the page resets saved events and posts.
- The app pretends it is always Thursday, 2:04 PM so event times stay consistent.
- No real login. You are signed in as a fake student who is a verified officer of Soccer Club.
- Review is simulated. Submitted events show as "Pending review" on the Profile page and never appear in Discover.
- Notifications are fixed examples.
- English only.

## Who built what

| Area | Owner |
|---|---|
| Home, Profile, Notifications, shared layout, tab bar and styles | Leo |
| Discover and Filters | Darius |
| Event detail and Saved | Salah |
| Post an event and Sent for review | Patrick |

## Project structure

```
src/
  components/   shared UI (phone frame, tab bar, event card, filters sheet)
  pages/        one file per screen
  data/         fake events, user, notifications and filter logic
  state/        app-wide state (saved events, filters, posts)
```