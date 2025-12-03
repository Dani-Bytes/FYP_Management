# FYP Management System - Quick Start Guide

## 🚀 Getting Started

Your FYP Management System is now ready to use!

### Development Server

The development server is running at: **http://localhost:5173**

### How to Login

1. Open http://localhost:5173 in your browser
2. You'll see the login page
3. **Select a role** from the dropdown:
   - Student
   - Supervisor
   - Coordinator
   - Head of Department (HOD)
   - Evaluator

4. Enter **any email and password** (this is demo mode)
5. Click "Sign In"

### What You'll See

Each role has a different dashboard:

#### 🎓 Student Dashboard
- Project progress timeline (65% complete)
- Proposal status (Approved)
- Monthly logs submission
- Final report upload area
- Upcoming defense schedule
- Supervisor contact card
- Quick action buttons

#### 👨‍🏫 Supervisor Dashboard
- Overview statistics (8 students, 5 pending reviews)
- Student list with progress bars
- Pending reviews section
- Review modal with rating slider (1-10)
- Escalation to HOD feature
- Compliance summary

#### 📅 Coordinator Dashboard
- 6 KPI cards (proposals, defenses, penalties)
- Defense scheduling interface
- Room availability calendar
- Penalty management
- Violation tracking table
- Proposal status distribution

#### 👔 HOD Dashboard
- Department statistics
- Student appeals review
- Supervisor escalation handling
- Workload management
- Priority actions panel
- Decision tracking

#### 📝 Evaluator Dashboard
- Assigned defense schedule
- Project materials download
- Rubric-based evaluation (5 criteria with weights)
- Weighted score calculation
- Detailed feedback submission

## 🎨 Features

### Interactive Components
- ✅ Modal dialogs for forms
- ✅ Data tables with sorting
- ✅ Progress bars and timelines
- ✅ Alert notifications
- ✅ Badge status indicators
- ✅ Stat cards with icons
- ✅ Responsive design

### Mock Data
- Pre-populated with realistic sample data
- 3 sample students
- Monthly logs with feedback
- Scheduled defenses
- Appeals and escalations

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Testing Different Roles

To test all features:

1. **Login as Student** 
   - Submit a monthly log
   - Upload a report
   - Submit an appeal

2. **Login as Supervisor**
   - Review student submissions
   - Provide ratings and feedback
   - Escalate an issue

3. **Login as Coordinator**
   - Schedule a defense
   - Apply a penalty
   - Check room availability

4. **Login as HOD**
   - Review an appeal
   - Handle an escalation
   - Check supervisor workloads

5. **Login as Evaluator**
   - View defense schedule
   - Evaluate using rubric
   - Submit weighted scores

## 🎯 Next Steps

To connect to a real backend:

1. Create API service files in `src/services/`
2. Replace mock data imports with API calls
3. Add environment variables for API endpoints
4. Implement error handling and loading states
5. Add authentication tokens and session management

## 📦 Project Structure

```
src/
├── App.tsx                  # Main app with routing
├── main.tsx                 # Entry point
├── index.css               # Global styles + Tailwind
├── components/
│   ├── dashboards/         # 5 role-specific dashboards
│   ├── layout/             # DashboardLayout
│   └── ui/                 # Reusable components
├── contexts/               # AuthContext
├── pages/                  # LoginPage
├── types/                  # TypeScript types
└── utils/                  # Mock data
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme

### Components
All UI components are in `src/components/ui/`
- Modify Card, Button, Modal, etc.

### Data
Mock data is in `src/utils/mockData.ts`
- Add more students, projects, defenses

## ✨ Highlights

- **Fully Typed**: TypeScript throughout
- **Modern Stack**: React 18, Vite, Tailwind CSS
- **Role-Based**: 5 different user experiences
- **Interactive**: Modals, forms, tables
- **Responsive**: Works on all screen sizes
- **Beautiful**: Professional UI with Tailwind

---

**Enjoy exploring your FYP Management System!** 🎉

For questions or issues, refer to FYP_README.md
