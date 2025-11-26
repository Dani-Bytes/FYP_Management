import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { SidebarLayout } from './components/layout/SidebarLayout';

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { SubmissionsPage as StudentSubmissionsPage } from './pages/student/SubmissionsPage';
import { AssignmentsPage } from './pages/student/AssignmentsPage';
import { MonthlyLogsPage as StudentMonthlyLogsPage } from './pages/student/MonthlyLogsPage';

// Supervisor Pages
import { SupervisorDashboardPage } from './pages/supervisor/SupervisorDashboardPage';
import { MyStudentsPage } from './pages/supervisor/MyStudentsPage';
import { PendingReviewsPage } from './pages/supervisor/PendingReviewsPage';
import { MonthlyLogsPage as SupervisorMonthlyLogsPage } from './pages/supervisor/MonthlyLogsPage';
import { EscalationsPage as SupervisorEscalationsPage } from './pages/supervisor/EscalationsPage';

// Coordinator Pages
import { CoordinatorDashboardPage } from './pages/coordinator/CoordinatorDashboardPage';
import { PenaltiesPage } from './pages/coordinator/PenaltiesPage';
import { CompileResultsPage } from './pages/coordinator/CompileResultsPage';
import { ParticipantPaymentsPage } from './pages/coordinator/ParticipantPaymentsPage';
import { MonthlyLogsRecordPage } from './pages/coordinator/MonthlyLogsRecordPage';

// HOD Pages
import { HODDashboardPage } from './pages/hod/HODDashboardPage';
import { AppealsPage } from './pages/hod/AppealsPage';
import { EscalationsPage as HODEscalationsPage } from './pages/hod/EscalationsPage';
import { ResultApprovalPage } from './pages/hod/ResultApprovalPage';
import { PublishResultsPage } from './pages/hod/PublishResultsPage';
import { AnalyticsPage } from './pages/hod/AnalyticsPage';

// Evaluator Pages
import { EvaluatorDashboardPage } from './pages/evaluator/EvaluatorDashboardPage';
import { EvaluationsPage } from './pages/evaluator/EvaluationsPage';

// Shared Components
import { GuidelinesPage } from './components/shared/GuidelinesPage';
import { DefenseSchedulePage } from './components/shared/DefenseSchedulePage';
import { AnnouncementsPage } from './components/shared/AnnouncementsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><StudentDashboardPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/submissions" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><StudentSubmissionsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/defense-schedule" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><DefenseSchedulePage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/assignments" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><AssignmentsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/monthly-logs" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><StudentMonthlyLogsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/announcements" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><AnnouncementsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/student/guidelines" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SidebarLayout><GuidelinesPage /></SidebarLayout>
            </ProtectedRoute>
          } />

          {/* Supervisor Routes */}
          <Route path="/supervisor/dashboard" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><SupervisorDashboardPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/my-students" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><MyStudentsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/pending-reviews" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><PendingReviewsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/monthly-logs" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><SupervisorMonthlyLogsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/escalations" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><SupervisorEscalationsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/guidelines" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SidebarLayout><GuidelinesPage /></SidebarLayout>
            </ProtectedRoute>
          } />

          {/* Coordinator Routes */}
          <Route path="/coordinator/dashboard" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><CoordinatorDashboardPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/defense-schedule" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><DefenseSchedulePage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/announcements" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><AnnouncementsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/participant-payments" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><ParticipantPaymentsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/penalties" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><PenaltiesPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/compile-results" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><CompileResultsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/monthly-logs" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><MonthlyLogsRecordPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/coordinator/guidelines" element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <SidebarLayout><GuidelinesPage /></SidebarLayout>
            </ProtectedRoute>
          } />

          {/* HOD Routes */}
          <Route path="/hod/dashboard" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><HODDashboardPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/appeals" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><AppealsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/escalations" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><HODEscalationsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/result-approval" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><ResultApprovalPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/publish-results" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><PublishResultsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/analytics" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><AnalyticsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/hod/guidelines" element={
            <ProtectedRoute allowedRoles={['hod']}>
              <SidebarLayout><GuidelinesPage /></SidebarLayout>
            </ProtectedRoute>
          } />

          {/* Evaluator Routes */}
          <Route path="/evaluator/dashboard" element={
            <ProtectedRoute allowedRoles={['evaluator']}>
              <SidebarLayout><EvaluatorDashboardPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/evaluator/defense-schedule" element={
            <ProtectedRoute allowedRoles={['evaluator']}>
              <SidebarLayout><DefenseSchedulePage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/evaluator/evaluations" element={
            <ProtectedRoute allowedRoles={['evaluator']}>
              <SidebarLayout><EvaluationsPage /></SidebarLayout>
            </ProtectedRoute>
          } />
          <Route path="/evaluator/guidelines" element={
            <ProtectedRoute allowedRoles={['evaluator']}>
              <SidebarLayout><GuidelinesPage /></SidebarLayout>
            </ProtectedRoute>
          } />

          {/* Default Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navigate to="/login" replace />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
