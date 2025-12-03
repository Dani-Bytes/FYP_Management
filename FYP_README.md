# FYP Management System

A comprehensive web-based platform for managing Final Year Projects (FYP) for students, faculty, and administration.

## Features

### Role-Based Dashboards

1. **Student Dashboard**
   - Project progress timeline
   - Proposal submission and status
   - Monthly log submissions
   - Final report upload
   - Defense schedule viewing
   - Supervisor contact information
   - Submit appeals

2. **Supervisor Dashboard**
   - View all supervisees
   - Review proposals and monthly logs
   - Provide feedback and ratings
   - Track student compliance
   - Escalate issues to HOD

3. **Coordinator Dashboard**
   - Schedule defenses
   - Manage room bookings
   - Apply penalties for violations
   - View proposal status distribution
   - Monitor overdue submissions

4. **HOD Dashboard**
   - Review student appeals
   - Handle supervisor escalations
   - Manage supervisor workloads
   - Approve final results
   - Executive oversight

5. **Evaluator Dashboard**
   - View assigned defense schedules
   - Access project materials
   - Rubric-based grading (5 criteria)
   - Submit weighted evaluations
   - Provide detailed feedback

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Utilities:** date-fns

## Getting Started

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Login

1. Navigate to the login page
2. Select a role (Student/Supervisor/Coordinator/HOD/Evaluator)
3. Enter any email and password (demo mode)
4. Click "Sign In"

## Project Structure

```
src/
├── components/
│   ├── dashboards/          # Role-specific dashboards
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── contexts/                # React contexts
├── pages/                   # Page components
├── types/                   # TypeScript types
└── utils/                   # Utilities and mock data
```

## License

This project is for educational purposes.
