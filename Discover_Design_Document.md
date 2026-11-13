# NEVENTS Prototype V2: Design Considerations (Discover)

## Feedback & Iteration

1. **Saving required opening the event first (H6, severity 1).** An evaluator had to assume they should tap the card to save it. Now every card has a bookmark icon so you can save or remove an event right from the list.

2. **No confirmation after saving** Nothing told the user the save worked. Now a message appears saying "Saved" or "Removed from saved," with a link to the Saved page.

3. **No easy way back from an event** This problem is on the Event detail page, which a teammate owns, so I did not change it on Discover. The tab bar is always visible on Discover, so users can still get out.

## Design Considerations

- **Task flow & navigation:** Users reach Discover from Home or the tab bar. They can filter, open an event, or save it from the list. The "Saved" message links to the Saved page.
- **Affordances & signifiers:** Event cards are fully tappable. The bookmark and the Filters button are similar, and active filters show as chips above the list.
- **Feedback & system status:** The header shows the event count. Saving updates the bookmark instantly and shows a message. The Filters sheet shows how many events match before closing.
- **Consistency & predictability:** Discover uses the same layout, tab bar, cards, and colors as the other pages.
- **Error prevention & recovery:** Filters can be reset. If nothing matches, a message and a "Reset filters" button appear. Saving can be undone with a second tap.
