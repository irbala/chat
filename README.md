# Twitch Chat Viewer — Customizable Embedded Popout

https://irbala.github.io/chat/

A lightweight, responsive web app that embeds a Twitch popout chat for the streamers, with an easy-to-use interface to adjust font size, text color, and chat background for better readability and aesthetic comfort. Perfect for second-screen stream watching, streaming setups, or cozy lurking with your favorite vibes.

Includes:
- Light, dark and cozy themes (the dark theme also darkens the Twitch chat itself)
- Adjustable chat background color
- Simple, responsive layout
- Clean design focused on legibility

Note: Twitch doesn't allow other sites to restyle the chat's font size or text color, so those two controls are shown for reference only.

[ Set to future development ]

![image](https://github.com/user-attachments/assets/ddc0999a-4f9d-4a02-bb63-cf5a2789afde)

## Design Decisions

- **Three themes.** Light, dark and a "cozy" theme based on the Solarized palette, which is known for being easy on the eyes during long viewing. <!-- guess: Fay, please confirm or edit -->
- **The dark theme reaches inside the chat.** Choosing dark also asks Twitch for its dark chat (`darkpopout`), so the whole screen matches.
- **Honest controls.** Twitch doesn't let other sites restyle its chat, so the font size and text colour controls are labelled "Info Only" instead of pretending to work.
- **One control bar.** All settings sit in one row above the chat and stack neatly on phones, leaving the rest of the screen for the chat itself.

## Accessibility

Checked on 19 November 2026 with [axe-core](https://github.com/dequelabs/axe-core) 4.10, the engine behind Lighthouse's accessibility score, against WCAG 2.1 A and AA plus axe's best-practice rules. Every page was tested in a desktop browser.

| Page | Issues | Rules passed |
|---|---|---|
| `index.html` | ✅ 0 issues | 25 |

All three themes (light, dark and cozy) were tested.

Fixed in this round:

- Wrapped the page in `<main>` and added a visually hidden page heading for screen readers.
- Gave the Twitch chat frame a title, so screen readers announce what it is.
- Darkened the dimmed "Info Only" labels in every theme, and the cozy theme's button, so text passes 4.5:1 contrast.
