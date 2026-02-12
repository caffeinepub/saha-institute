# Specification

## Summary
**Goal:** Expand the Admin Panel with an admin-only “Effects & Popups” section that can publish site-wide visual effects and popup announcements (delivered on refresh/navigation), and add additional effect presets with polished admin-page styling.

**Planned changes:**
- Add an admin-only “Effects & Popups” section on `/admin` with an effect preset selector, popup message input, and a publish/trigger button, including a small preview/description per preset.
- Implement backend (single Motoko actor) storage + methods for admin-only publishing of the current site-wide effect and optional popup payload, plus a user-readable query to fetch the latest active effect/popup on page load/navigation.
- Add at least 5 new safe, non-offensive effect presets with distinct, non-blocking visual implementations that self-clean after a defined duration and don’t break navigation.
- Improve `/admin` visual experience with tasteful micro-interactions and admin-only styling that stays scoped to the Admin Panel route and keeps all text in English.

**User-visible outcome:** Verified admins can configure and publish a site-wide visual effect and optional popup announcement from `/admin`, and users see the latest effect/popup when they refresh or navigate the site.
