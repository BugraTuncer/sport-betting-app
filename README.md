### Getting Started

Follow the steps below to run the project locally.

## 1. Clone the Repository

git clone https://github.com/BugraTuncer/sport-betting-app
cd sports-betting-app

## 2. Install Dependencies

yarn install

## 3. Set Up Environment Variables

Create a .env file in the root directory and fill in the required Firebase configuration.

You can refer to .env.example for guidance.

VITE_FIREBASE_API_KEY=your_key  
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain  
VITE_FIREBASE_PROJECT_ID=your_project_id  
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket  
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id  
VITE_FIREBASE_APP_ID=your_app_id  

## 4. Start the Development Server

yarn dev

The app should now be running at http://localhost:5173

## Live Demo

https://sport-betting-app-three.vercel.app/

### Project Purpose

A modern, user-friendly sports betting web application. Users can browse upcoming matches fetched from a betting API, view live odds, and add selected bets to a basket. The app also includes a detailed match page with extended odds information. Users can filter matches by sports categories and are prevented from placing bets on past events. Authentication is handled via Firebase.

⸻

## System Overview

A detailed breakdown of the system’s core logic, features, and behaviors:

## Navigation & Routing

• Custom 404 page implemented – redirects users to a friendly error screen when visiting non-existent routes.  
• App-wide protected routes – routes require a valid Firebase token; otherwise, user is redirected.  

## Authentication

• Firebase Authentication is integrated.  
• Supports both email/password and Google login/register methods.  

## Match Listing & Sports Navigation

• After login, users see matches categorized by selected sport.  
• Each sport fetches its own set of matches dynamically from the API.  
• Sports selector is implemented as a horizontal slider (scrollable).  
• Past match handling: Matches with a start time in the past are visually faded, indicating that betting is no longer available.  
• Match list supports searching by match/team name using a debounced input for performance.  
• Matches are grouped by league and match time (e.g., Today, Tomorrow, or full date).  
• Each match card:  
• Displays odds for match result, over/under, and handicap, showing the highest odds across all bookmakers.  
• Includes sport-specific icon based on the selected sport.  

## Bet Basket (Bet Slip)

• Clicking an odd highlights it and adds it to the basket.  
• Bets on past events are blocked with a warning modal.  
• Odds added to the basket trigger Google Analytics events.  
• Bet basket is fixed to the bottom-right corner of the screen.  
• Turns red if it has 1–2 bets, and green if it has more than 2.  
• Removing a bet:  
• Sends an analytics event.  
• Shows an undo option visible for 5 seconds.  
• “Delete all” button clears the basket after a confirmation modal.  

## Match Detail Page

• Accessed by clicking on a team or player name.  
• Triggers an analytics event upon entry.  
• Includes additional betting markets like handicap odds.  
• Handicap odds display + / - values dynamically from the API.  
• Odds on detail page can also be added to the bet basket.  

## State Persistence & Animations

• redux-persist stores critical state across sessions:  
• Selected sport  
• Bet basket  
• Animations and transitions handled using Framer Motion.  
• Fully responsive design built with Tailwind CSS.  

⸻

## Tech Stack

• React 19 – Modern UI development  
• TypeScript – Strong typing and better developer tooling  
• Redux Toolkit – State management  
• redux-persist – Persistent state handling  
• Firebase Authentication – User management and auth  
• Tailwind CSS – Utility-first CSS framework  
• React Router – Routing and navigation  
• Framer Motion – Smooth UI animations  
• Axios – HTTP client for API requests  
• Node.js v20 – Runtime environment used in development and deployment  

⸻

## Architecture & Best Practices

• Container/Presentational Pattern – Separation of UI and business logic  
• Redux Persist – Store and persist basket state across sessions  
• Modular Project Structure – Organized with separate folders for components, hooks, and models  
• Protected Routes – Restrict access to certain pages based on authentication  
