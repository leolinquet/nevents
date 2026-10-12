# NEVENTS

Functional mobile prototype of NEVENTS, a campus events app for UNL students. Built with React and Vite for CSCE 378.

## Requirements

- Node.js 20 or newer (https://nodejs.org)
- Any modern browser (tested in Chrome)

## Run it

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

On a laptop the app shows inside a phone-sized frame. Refreshing the page resets everything (saved events, posts).

## Supported tasks

1. Find an event happening soon on City Campus and save it.
2. Post an event as a student org officer and submit it for review.

## Project structure

```
src/
  components/   shared UI (phone frame, tab bar, event card, filters sheet)
  pages/        one file per screen
  data/         fake events and filter logic
  state/        app-wide state (saved events, filters, posts)
```

The app pretends it is always Thursday, 2:04 PM so the event times stay consistent.
