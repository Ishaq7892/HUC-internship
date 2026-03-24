# ClubSync - Student Tech Club Platform

A full-stack web application built with Next.js, TypeScript, Tailwind CSS, Prisma, and MongoDB to manage student tech club events and registrations.

## Features

- **Authentication System**: Secure login and signup using NextAuth.js.
- **Role-Based Access**: Separate dashboards for Admins and Students.
- **Admin Panel**: Create, edit, and delete events.
- **Student Dashboard**: View upcoming events, register for events, and manage registrations.
- **Responsive UI**: Modern, clean design using Tailwind CSS and Lucide React icons.
- **Toast Notifications**: Real-time feedback using `react-hot-toast`.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Backend**: Next.js API Routes, Prisma ORM, MongoDB.
- **Auth**: NextAuth.js with JWT strategy.

## Prerequisites

- Node.js (v18 or later)
- MongoDB (Local or Atlas)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd clubsync
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**:
   Create both `.env` and `.env.local` files in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Generate Prisma Client and push schema**:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Folder Structure

- `/src/app`: Next.js pages and API routes.
- `/src/components`: Reusable UI components.
- `/src/lib`: Prisma client, Auth configuration, and utilities.
- `/prisma`: Prisma schema for User, Event, and Registration models.
- `/src/styles`: Global CSS styles.

## License

MIT
