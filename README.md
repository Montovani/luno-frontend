# Luno

Luno is a credit-based pet-sitting marketplace that helps pet owners swap trusted care without kennels. Owners can discover sitters nearby, send booking requests with their pets and travel dates, track Lunies earned or spent, and manage every booking, profile, and review from a single dashboard.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack / Technologies Used](#tech-stack--technologies-used)
- [How to Use the Project](#how-to-use-the-project)
- [API Routes](#api-routes)
- [Contact / Author Details](#contact--author-details)
- [Acknowledgements](#acknowledgements)

## Project Description
- **What it does:** Connects pet owners with verified sitters, enabling them to exchange pet care through a points system (Lunies) instead of cash.
- **Why it exists:** Traditional kennels can be stressful and expensive. Luno builds a community-first alternative where members earn credits by sitting and spend them when they travel.
- **Problem it solves:** Simplifies finding trustworthy home-based care, centralizes communication, and keeps every stay transparent with status tracking, maps, and reviews.

## Features
- 📍 **Location-aware sitter discovery:** Search by city and pet type, view results in a list and on an interactive map.
- 📅 **Booking requests:** Send date-bound requests, include care notes, and calculate Lunies based on pets and duration.
- 🐾 **Pet profiles:** Add, edit, or remove pets with avatars, traits, and special instructions.
- 👤 **Rich member profiles:** Showcase home details, care preferences, address, and photo galleries.
- 🧭 **Dashboard insights:** See Lunies balance, upcoming bookings, history, and shortcuts to edit profiles or pets.
- ✅ **Secure auth:** Sign up, log in, and validate sessions via JWT-backed endpoints.
- ⭐ **Reviews & reputation:** Leave and view host/requester reviews tied to completed bookings.

## Tech Stack / Technologies Used
- **Frontend:** React 19, Vite, React Router 7
- **Data & Networking:** Axios, React Context for auth
- **Mapping:** Leaflet with React Leaflet
- **UI/UX:** CSS Modules, React Spinners for loading states
- **Tooling:** ESLint 9, Vite build/preview scripts

## How to Use the Project
1. **Clone and install**
   ```bash
   git clone https://github.com/<your-org>/luno.git
   cd luno
   npm install
   ```
2. **Configure environment**
   - Create a `.env` file with `VITE_SERVER_URL=<your-api-base-url>` (e.g., `https://api.example.com`).
   - The frontend expects API endpoints under `${VITE_SERVER_URL}/api`.
3. **Run locally**
   ```bash
   npm run dev
   ```
   Vite will print the local URL (defaults to `http://localhost:5173`).
4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## API Routes
The UI consumes these backend endpoints (paths are relative to `${VITE_SERVER_URL}`):

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create a new member account. |
| POST | `/api/auth/login` | Authenticate and receive a JWT. |
| GET | `/api/auth/verify` | Validate stored JWT and fetch user id. |
| GET | `/api/user` | List sitters, filterable by `city` and `petsCategoryAllowed`. |
| GET | `/api/user/:userId` | Fetch sitter profile, pets, home details, and location. |
| PATCH | `/api/user/:userId` | Update profile, address, allowed pet categories, and images. |
| GET | `/api/user/dashboard` | Retrieve logged-in user summary (Lunies, pets, bookings). |
| GET | `/api/pet/owner` | List pets owned by the authenticated user. |
| POST | `/api/pet` | Create a pet profile with metadata and avatar. |
| DELETE | `/api/pet/:petId` | Remove an existing pet profile. |
| POST | `/api/upload` | Upload images for avatars or profile photos. |
| POST | `/api/booking` | Create a booking request with host, dates, pets, and message. |
| GET | `/api/booking/:bookingId` | Retrieve booking details, participants, pets, and status. |
| PATCH | `/api/booking/:bookingId` | Update booking status (confirm, progress, complete, cancel). |
| GET | `/api/review/user/:userId` | Get all reviews for a user. |
| GET | `/api/review/booking/:bookingId` | Fetch reviews tied to a booking. |
| POST | `/api/review` | Submit a new review for a completed booking. |

> Note: Ensure protected routes include the `Authorization: Bearer <token>` header as required by the backend.

## Contact / Author Details
- **Maintainer:** _Your Name_
- **Email:** _you@example.com_
- **LinkedIn:** [_linkedin.com/in/your-handle_](https://linkedin.com/in/your-handle)

## Acknowledgements
- Inspired by community-driven pet care platforms and trusted-home exchanges.
- Built with the support of the open-source React, Vite, and Leaflet ecosystems.
