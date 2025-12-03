// User roles
export type UserRole = 'student' | 'supervisor' | 'coordinator' | 'hod' | 'evaluator';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  evaluatorType?: EvaluatorType; // Only for evaluator role
  avatar?: string;
}

// Project statuses
export type ProposalStatus = 'pending' | 'approved' | 'revision_required' | 'rejected';
export type ProjectStage = 'proposal' | 'in_progress' | 'final_report' | 'defense' | 'completed';

// Student interfaces
export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  supervisorId?: string;
  supervisorName?: string;
  projectTitle?: string;
  proposalStatus: ProposalStatus;
  currentStage: ProjectStage;
  progressPercentage: number;
  compliance: 'good' | 'warning' | 'critical';
  penaltyPoints: number;
}

// Project interfaces
export interface Project {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  proposalStatus: ProposalStatus;
  stage: ProjectStage;
  supervisorId: string;
  submittedAt: Date;
  approvedAt?: Date;
  feedback?: string;
}

// Monthly log interfaces
export interface MonthlyLog {
  id: string;
  studentId: string;
  month: string;
  year: number;
  activities: string;
  progress: string;
  challenges?: string;
  submittedAt: Date;
  supervisorSigned: boolean;
  supervisorFeedback?: string;
  rating?: number;
}

// Defense interfaces
export type DefenseType = 'proposal' | 'interim' | 'final';
export type EvaluatorType = 'internal' | 'external';

export interface Defense {
  id: string;
  studentId: string;
  studentName: string;
  projectTitle: string;
  type: DefenseType;
  date: Date;
  time: string;
  room: string;
  evaluatorIds: string[];
  evaluatorNames: string[];
  evaluatorType: EvaluatorType; // internal for proposal/interim, external for final
  status: 'scheduled' | 'completed' | 'cancelled';
  score?: number;
}

// Evaluation interfaces
export interface EvaluationCriteria {
  technicalImplementation: number; // 30%
  presentationSkills: number; // 25%
  innovation: number; // 20%
  documentation: number; // 15%
  overallQuality: number; // 10%
}

export interface Evaluation {
  id: string;
  defenseId: string;
  evaluatorId: string;
  studentId: string;
  criteria: EvaluationCriteria;
  totalScore: number;
  feedback: string;
  submittedAt: Date;
}

// Appeal interfaces
export type AppealType = 'grade' | 'penalty' | 'supervisor' | 'other';
export type AppealStatus = 'pending' | 'approved' | 'rejected';

export interface Appeal {
  id: string;
  studentId: string;
  studentName: string;
  type: AppealType;
  reason: string;
  details: string;
  submittedAt: Date;
  status: AppealStatus;
  hodDecision?: string;
  decidedAt?: Date;
}

// Escalation interfaces
export interface Escalation {
  id: string;
  supervisorId: string;
  supervisorName: string;
  studentId: string;
  studentName: string;
  issue: string;
  details: string;
  priority: 'low' | 'medium' | 'high';
  submittedAt: Date;
  status: 'pending' | 'resolved';
  hodAction?: string;
  resolvedAt?: Date;
}

// Penalty interfaces
export interface Penalty {
  id: string;
  studentId: string;
  studentName: string;
  violation: string;
  points: number;
  appliedBy: string;
  appliedAt: Date;
  description?: string;
}

// Notification interfaces
export type NotificationType = 'info' | 'warning' | 'critical' | 'success';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

// Supervisor workload
export interface SupervisorWorkload {
  supervisorId: string;
  supervisorName: string;
  currentLoad: number;
  capacity: number;
  students: Student[];
}

// Room booking
export interface Room {
  id: string;
  name: string;
  capacity: number;
  facilities: string[];
}

export interface RoomBooking {
  id: string;
  roomId: string;
  roomName: string;
  date: Date;
  timeSlot: string;
  bookedBy: string;
  purpose: string;
}

// Dashboard stats
export interface StudentStats {
  totalProjects: number;
  approvedProposals: number;
  pendingReviews: number;
  overdueSubmissions: number;
}

export interface SupervisorStats {
  totalStudents: number;
  pendingReviews: number;
  approvedProjects: number;
  activeIssues: number;
}

export interface CoordinatorStats {
  totalProposals: number;
  approvedProposals: number;
  scheduledDefenses: number;
  completedDefenses: number;
  overdueSubmissions: number;
  penaltiesApplied: number;
}

export interface HODStats {
  totalStudents: number;
  totalSupervisors: number;
  pendingAppeals: number;
  activeEscalations: number;
  pendingApprovals: number;
}

export interface EvaluatorStats {
  upcomingDefenses: number;
  completedEvaluations: number;
  pendingEvaluations: number;
}

// Document Templates
export type DocumentTemplateType = 'srs' | 'sds' | 'proposal' | 'log_form' | 'progress_report';

export interface DocumentTemplate {
  id: string;
  type: DocumentTemplateType;
  name: string;
  description: string;
  fileUrl: string;
  version: string;
  updatedAt: Date;
}

// Submission Slots (LMS-like system)
export type SlotStatus = 'upcoming' | 'open' | 'closed' | 'graded';
export type SubmissionType = 'srs' | 'sds' | 'proposal' | 'monthly_log' | 'final_report' | 'presentation' | 'code';

export interface SubmissionSlot {
  id: string;
  title: string;
  description: string;
  type: SubmissionType;
  openDate: Date;
  closeDate: Date;
  status: SlotStatus;
  maxFileSize: number; // in MB
  allowedFileTypes: string[];
  isRequired: boolean;
  createdBy: string;
  createdAt: Date;
}

// Announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  targetRole: UserRole | 'all';
  publishedBy: string;
  publishedAt: Date;
  expiresAt?: Date;
  attachments?: string[];
}

// Project Upload (by Supervisor)
export interface ProjectTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredSkills: string[];
  supervisorId: string;
  supervisorName: string;
  uploadedAt: Date;
  maxStudents: number;
  currentStudents: number;
  status: 'available' | 'assigned' | 'closed';
}

export interface StudentSubmission {
  id: string;
  slotId: string;
  studentId: string;
  studentName: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'late' | 'graded' | 'rejected';
}

export interface SlotSubmissionSummary {
  slotId: string;
  totalStudents: number;
  submitted: number;
  pending: number;
  late: number;
  graded: number;
}

// Result Compilation and Publishing
export type ResultStatus = 'draft' | 'submitted_to_hod' | 'approved' | 'published';

export interface StudentResult {
  studentId: string;
  studentName: string;
  rollNumber: string;
  projectTitle: string;
  proposalScore?: number;
  interimScore?: number;
  finalScore?: number;
  supervisorEvaluation?: number;
  totalScore?: number;
  grade?: string;
  remarks?: string;
}

export interface ResultCompilation {
  id: string;
  semester: string;
  academicYear: string;
  compiledBy: string; // Coordinator ID
  compiledAt: Date;
  status: ResultStatus;
  results: StudentResult[];
  hodApprovedBy?: string;
  hodApprovedAt?: Date;
  publishedToLMS?: boolean;
  publishedAt?: Date;
  hodComments?: string;
}
