Project Purpose

A modern, user-friendly sports betting web application. Users can browse upcoming matches fetched from a betting API, view live odds, and add selected bets to a basket. The app also includes a detailed match page with extended odds information. Users can filter matches by sports categories and are prevented from placing bets on past events. Authentication is handled via Firebase.

⸻

Features
• Upcoming match listing with odds
• Add odds to basket and manage selections (remove)
• Firebase Authentication (Login / Register)
• Search functionality for matches
• Block betting on past events with warning alerts
• Filter matches based on selected sports category
• Match detail pages with extended odds
• Persistent bet basket using redux-persist

⸻

Tech Stack
• React 19 – Modern UI development
• TypeScript – Strong typing and better developer tooling
• Redux Toolkit – State management
• Firebase Authentication – User management and auth
• Tailwind CSS – Utility-first CSS framework
• React Router – Routing and navigation
• Framer Motion – Smooth UI animations
• Axios – HTTP client for API requests

⸻

Architecture & Best Practices
• Container/Presentational Pattern: Separation of UI and business logic
• Redux Persist: Store and persist basket state across sessions
• Modular Project Structure: Organized with separate folders for components, hooks, and models
• Protected Routes: Restrict access to certain pages based on authentication
