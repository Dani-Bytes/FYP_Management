import type { 
  Student, 
  Project, 
  MonthlyLog, 
  Defense, 
  Appeal, 
  Escalation, 
  Penalty,
  Notification,
  SupervisorWorkload,
  RoomBooking,
  Announcement,
  ProjectTopic,
  ResultCompilation
} from '../types';

// Mock data generators
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    rollNumber: '2021-CS-001',
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    projectTitle: 'AI-Based Traffic Management System',
    proposalStatus: 'approved',
    currentStage: 'in_progress',
    progressPercentage: 65,
    compliance: 'good',
    penaltyPoints: 0
  },
  {
    id: 'STU002',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    rollNumber: '2021-CS-002',
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    projectTitle: 'Blockchain-Based Voting System',
    proposalStatus: 'approved',
    currentStage: 'in_progress',
    progressPercentage: 45,
    compliance: 'warning',
    penaltyPoints: 2
  },
  {
    id: 'STU003',
    name: 'Mike Johnson',
    email: 'mike.johnson@university.edu',
    rollNumber: '2021-CS-003',
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    projectTitle: 'Smart Home Automation Platform',
    proposalStatus: 'revision_required',
    currentStage: 'proposal',
    progressPercentage: 15,
    compliance: 'critical',
    penaltyPoints: 5
  }
];

export const mockProjects: Project[] = [
  {
    id: 'PROJ001',
    studentId: 'STU001',
    studentName: 'John Doe',
    title: 'AI-Based Traffic Management System',
    description: 'A comprehensive system using machine learning to optimize traffic flow in urban areas.',
    proposalStatus: 'approved',
    stage: 'in_progress',
    supervisorId: 'SUP001',
    submittedAt: new Date('2024-09-15'),
    approvedAt: new Date('2024-09-20'),
    feedback: 'Excellent proposal. Clear objectives and methodology.'
  }
];

export const mockMonthlyLogs: MonthlyLog[] = [
  {
    id: 'LOG001',
    studentId: 'STU001',
    month: 'October',
    year: 2024,
    activities: 'Completed literature review and initial algorithm design',
    progress: 'Implemented basic traffic detection module using YOLO',
    challenges: 'Limited computational resources for model training',
    submittedAt: new Date('2024-10-31'),
    supervisorSigned: true,
    supervisorFeedback: 'Good progress. Consider cloud resources for training.',
    rating: 8
  },
  {
    id: 'LOG002',
    studentId: 'STU001',
    month: 'November',
    year: 2024,
    activities: 'Refined detection model and started simulation framework',
    progress: 'Achieved 85% accuracy in vehicle detection',
    submittedAt: new Date('2024-11-25'),
    supervisorSigned: false
  }
];

export const mockDefenses: Defense[] = [
  {
    id: 'DEF001',
    studentId: 'STU001',
    studentName: 'John Doe',
    projectTitle: 'AI-Based Traffic Management System',
    type: 'proposal',
    date: new Date('2024-12-10'),
    time: '10:00 AM',
    room: 'Lab 301',
    evaluatorIds: ['EVAL001', 'EVAL002'],
    evaluatorNames: ['Dr. Emily Brown', 'Dr. James Wilson'],
    evaluatorType: 'internal',
    status: 'scheduled'
  },
  {
    id: 'DEF002',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    projectTitle: 'Blockchain-Based Voting System',
    type: 'interim',
    date: new Date('2024-12-15'),
    time: '2:00 PM',
    room: 'Lab 302',
    evaluatorIds: ['EVAL001', 'EVAL003'],
    evaluatorNames: ['Dr. Emily Brown', 'Dr. Robert Chen'],
    evaluatorType: 'internal',
    status: 'scheduled'
  },
  {
    id: 'DEF003',
    studentId: 'STU003',
    studentName: 'Mike Johnson',
    projectTitle: 'Smart Home Automation Platform',
    type: 'final',
    date: new Date('2024-12-20'),
    time: '11:00 AM',
    room: 'Conference Room A',
    evaluatorIds: ['EVAL004', 'EVAL005'],
    evaluatorNames: ['Prof. Dr. Ahmed Khan', 'Dr. Maria Garcia'],
    evaluatorType: 'external',
    status: 'scheduled'
  }
];

export const mockAppeals: Appeal[] = [
  {
    id: 'APP001',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    type: 'penalty',
    reason: 'Late submission due to medical emergency',
    details: 'I was hospitalized for three days and could not submit the monthly log on time. Medical certificate attached.',
    submittedAt: new Date('2024-11-20'),
    status: 'pending'
  }
];

export const mockEscalations: Escalation[] = [
  {
    id: 'ESC001',
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    studentId: 'STU003',
    studentName: 'Mike Johnson',
    issue: 'Repeated non-compliance',
    details: 'Student has failed to submit monthly logs for two consecutive months despite multiple reminders.',
    priority: 'high',
    submittedAt: new Date('2024-11-22'),
    status: 'pending'
  }
];

export const mockPenalties: Penalty[] = [
  {
    id: 'PEN001',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    violation: 'Late monthly log submission',
    points: 2,
    appliedBy: 'Dr. Michael Johnson',
    appliedAt: new Date('2024-11-15'),
    description: 'Submitted October log 5 days past deadline'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'NOT001',
    userId: 'STU001',
    type: 'warning',
    title: 'November Log Due Soon',
    message: 'Your November monthly log is due in 3 days.',
    createdAt: new Date('2024-11-22'),
    read: false
  },
  {
    id: 'NOT002',
    userId: 'STU001',
    type: 'success',
    title: 'Defense Scheduled',
    message: 'Your proposal defense has been scheduled for December 10, 2024 at 10:00 AM in Lab 301.',
    createdAt: new Date('2024-11-20'),
    read: false
  }
];

export const mockSupervisorWorkloads: SupervisorWorkload[] = [
  {
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    currentLoad: 8,
    capacity: 10,
    students: mockStudents
  },
  {
    supervisorId: 'SUP002',
    supervisorName: 'Dr. Michael Johnson',
    currentLoad: 12,
    capacity: 10,
    students: []
  }
];

export const mockRoomBookings: RoomBooking[] = [
  {
    id: 'BOOK001',
    roomId: 'ROOM301',
    roomName: 'Lab 301',
    date: new Date('2024-12-10'),
    timeSlot: '10:00 AM - 11:00 AM',
    bookedBy: 'Dr. Michael Johnson',
    purpose: 'Proposal Defense - John Doe'
  }
];

// Document Templates
export const mockDocumentTemplates = [
  {
    id: 'TEMP001',
    type: 'srs' as const,
    name: 'Software Requirements Specification (SRS) Template',
    description: 'IEEE Standard 830-1998 compliant SRS template for documenting software requirements',
    fileUrl: '/templates/SRS_Template.docx',
    version: '2.0',
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 'TEMP002',
    type: 'sds' as const,
    name: 'Software Design Specification (SDS) Template',
    description: 'Comprehensive template for documenting system architecture and detailed design',
    fileUrl: '/templates/SDS_Template.docx',
    version: '2.0',
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 'TEMP003',
    type: 'proposal' as const,
    name: 'Project Proposal Template',
    description: 'Standard template for FYP project proposal submission',
    fileUrl: '/templates/Proposal_Template.docx',
    version: '3.1',
    updatedAt: new Date('2024-08-15')
  },
  {
    id: 'TEMP004',
    type: 'log_form' as const,
    name: 'Monthly Progress Log Form',
    description: 'Standard form for documenting monthly project progress and activities',
    fileUrl: '/templates/Monthly_Log_Template.docx',
    version: '1.5',
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 'TEMP005',
    type: 'progress_report' as const,
    name: 'Progress Report Template',
    description: 'Comprehensive template for interim and final progress reports',
    fileUrl: '/templates/Progress_Report_Template.docx',
    version: '2.1',
    updatedAt: new Date('2024-09-15')
  }
];

// Submission Slots
export const mockSubmissionSlots = [
  {
    id: 'SLOT001',
    title: 'Project Proposal Submission',
    description: 'Submit your initial project proposal including title, objectives, methodology, and timeline',
    type: 'proposal' as const,
    openDate: new Date('2024-09-01'),
    closeDate: new Date('2024-09-30'),
    status: 'closed' as const,
    maxFileSize: 5,
    allowedFileTypes: ['.pdf', '.docx'],
    isRequired: true,
    createdBy: 'Dr. Michael Johnson',
    createdAt: new Date('2024-08-15')
  },
  {
    id: 'SLOT002',
    title: 'SRS Document Submission',
    description: 'Submit your Software Requirements Specification document',
    type: 'srs' as const,
    openDate: new Date('2024-10-15'),
    closeDate: new Date('2024-11-15'),
    status: 'closed' as const,
    maxFileSize: 10,
    allowedFileTypes: ['.pdf', '.docx'],
    isRequired: true,
    createdBy: 'Dr. Michael Johnson',
    createdAt: new Date('2024-10-01')
  },
  {
    id: 'SLOT003',
    title: 'November Progress Log',
    description: 'Submit your monthly progress log for November 2024',
    type: 'monthly_log' as const,
    openDate: new Date('2024-11-01'),
    closeDate: new Date('2024-11-30'),
    status: 'open' as const,
    maxFileSize: 2,
    allowedFileTypes: ['.pdf', '.docx'],
    isRequired: true,
    createdBy: 'Dr. Michael Johnson',
    createdAt: new Date('2024-10-25')
  },
  {
    id: 'SLOT004',
    title: 'SDS Document Submission',
    description: 'Submit your Software Design Specification document',
    type: 'sds' as const,
    openDate: new Date('2024-12-01'),
    closeDate: new Date('2024-12-31'),
    status: 'upcoming' as const,
    maxFileSize: 10,
    allowedFileTypes: ['.pdf', '.docx'],
    isRequired: true,
    createdBy: 'Dr. Michael Johnson',
    createdAt: new Date('2024-11-20')
  },
  {
    id: 'SLOT005',
    title: 'Final Report Submission',
    description: 'Submit your complete final year project report',
    type: 'final_report' as const,
    openDate: new Date('2025-04-01'),
    closeDate: new Date('2025-04-30'),
    status: 'upcoming' as const,
    maxFileSize: 20,
    allowedFileTypes: ['.pdf'],
    isRequired: true,
    createdBy: 'Dr. Michael Johnson',
    createdAt: new Date('2024-11-20')
  }
];

// Student Submissions
export const mockStudentSubmissions = [
  {
    id: 'SUB001',
    slotId: 'SLOT001',
    studentId: 'STU001',
    studentName: 'John Doe',
    fileName: 'AI_Traffic_Proposal.pdf',
    fileSize: 2.5,
    fileUrl: '/uploads/STU001/proposal.pdf',
    submittedAt: new Date('2024-09-28'),
    grade: 85,
    feedback: 'Good proposal with clear objectives',
    status: 'graded' as const
  },
  {
    id: 'SUB002',
    slotId: 'SLOT002',
    studentId: 'STU001',
    studentName: 'John Doe',
    fileName: 'SRS_AI_Traffic.pdf',
    fileSize: 8.3,
    fileUrl: '/uploads/STU001/srs.pdf',
    submittedAt: new Date('2024-11-14'),
    grade: 90,
    feedback: 'Comprehensive requirements documentation',
    status: 'graded' as const
  },
  {
    id: 'SUB003',
    slotId: 'SLOT003',
    studentId: 'STU001',
    studentName: 'John Doe',
    fileName: 'November_Log.pdf',
    fileSize: 1.2,
    fileUrl: '/uploads/STU001/nov_log.pdf',
    submittedAt: new Date('2024-11-25'),
    status: 'submitted' as const
  }
];

// Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN001',
    title: 'Interim Defense Schedule Released',
    content: 'The interim defense schedule for Fall 2024 has been published. Please check your assigned date and time in the Defense section. Make sure to prepare your presentation and demo accordingly.',
    type: 'info',
    targetRole: 'student',
    publishedBy: 'Dr. Michael Johnson',
    publishedAt: new Date('2024-11-15'),
    expiresAt: new Date('2024-12-31')
  },
  {
    id: 'ANN002',
    title: 'Important: SDS Submission Deadline Extended',
    content: 'Due to technical difficulties, the SDS submission deadline has been extended by one week. New deadline: December 7, 2024. No further extensions will be granted.',
    type: 'warning',
    targetRole: 'student',
    publishedBy: 'Dr. Michael Johnson',
    publishedAt: new Date('2024-11-20'),
    expiresAt: new Date('2024-12-07')
  },
  {
    id: 'ANN003',
    title: 'Supervisor Meeting Required',
    content: 'All supervisors are requested to attend a mandatory meeting on November 30, 2024 at 2:00 PM in Conference Room A to discuss evaluation criteria and timeline.',
    type: 'urgent',
    targetRole: 'supervisor',
    publishedBy: 'Dr. Michael Johnson',
    publishedAt: new Date('2024-11-18'),
    expiresAt: new Date('2024-11-30')
  },
  {
    id: 'ANN004',
    title: 'New Project Topics Available',
    content: 'Supervisors have uploaded new project topics for the upcoming semester. Students interested in selecting projects for next semester can review available topics.',
    type: 'success',
    targetRole: 'all',
    publishedBy: 'Dr. Michael Johnson',
    publishedAt: new Date('2024-11-10')
  }
];

// Project Topics (uploaded by supervisors)
export const mockProjectTopics: ProjectTopic[] = [
  {
    id: 'PROJ001',
    title: 'Real-time Object Detection for Autonomous Vehicles',
    description: 'Develop a deep learning model for real-time object detection and classification in autonomous vehicle scenarios using YOLO or similar architectures.',
    category: 'Artificial Intelligence',
    difficulty: 'advanced',
    requiredSkills: ['Python', 'TensorFlow/PyTorch', 'Computer Vision', 'Deep Learning'],
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    uploadedAt: new Date('2024-11-01'),
    maxStudents: 2,
    currentStudents: 0,
    status: 'available'
  },
  {
    id: 'PROJ002',
    title: 'Blockchain-based Supply Chain Management',
    description: 'Design and implement a blockchain solution for transparent and secure supply chain tracking using Ethereum or Hyperledger.',
    category: 'Blockchain',
    difficulty: 'intermediate',
    requiredSkills: ['JavaScript', 'Solidity', 'Web3.js', 'Smart Contracts'],
    supervisorId: 'SUP001',
    supervisorName: 'Dr. Sarah Smith',
    uploadedAt: new Date('2024-11-05'),
    maxStudents: 2,
    currentStudents: 1,
    status: 'available'
  },
  {
    id: 'PROJ003',
    title: 'Mobile Health Monitoring Application',
    description: 'Create a cross-platform mobile application for personal health monitoring with wearable device integration.',
    category: 'Mobile Development',
    difficulty: 'intermediate',
    requiredSkills: ['React Native', 'Firebase', 'RESTful APIs', 'UI/UX Design'],
    supervisorId: 'SUP002',
    supervisorName: 'Dr. James Brown',
    uploadedAt: new Date('2024-10-28'),
    maxStudents: 1,
    currentStudents: 1,
    status: 'assigned'
  },
  {
    id: 'PROJ004',
    title: 'Cybersecurity Threat Detection System',
    description: 'Build an intrusion detection system using machine learning to identify and classify network security threats.',
    category: 'Cybersecurity',
    difficulty: 'advanced',
    requiredSkills: ['Python', 'Machine Learning', 'Network Security', 'Data Analysis'],
    supervisorId: 'SUP002',
    supervisorName: 'Dr. James Brown',
    uploadedAt: new Date('2024-11-08'),
    maxStudents: 2,
    currentStudents: 0,
    status: 'available'
  },
  {
    id: 'PROJ005',
    title: 'E-learning Platform with AI Recommendations',
    description: 'Develop an intelligent e-learning platform with personalized course recommendations using collaborative filtering.',
    category: 'Web Development',
    difficulty: 'beginner',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Basic ML'],
    supervisorId: 'SUP003',
    supervisorName: 'Dr. Emily Davis',
    uploadedAt: new Date('2024-11-12'),
    maxStudents: 2,
    currentStudents: 0,
    status: 'available'
  }
];

// Result Compilations
export const mockResultCompilations: ResultCompilation[] = [
  {
    id: 'RC001',
    semester: 'Fall 2024',
    academicYear: '2024-2025',
    compiledBy: 'Dr. Michael Johnson',
    compiledAt: new Date('2024-11-20'),
    status: 'draft',
    results: [
      {
        studentId: 'STU001',
        studentName: 'John Doe',
        rollNumber: '2021-CS-001',
        projectTitle: 'AI-Based Traffic Management System',
        proposalScore: 85,
        interimScore: 88,
        supervisorEvaluation: 90,
        totalScore: 87.67,
        grade: 'A',
        remarks: 'Excellent progress and implementation'
      },
      {
        studentId: 'STU002',
        studentName: 'Jane Smith',
        rollNumber: '2021-CS-002',
        projectTitle: 'Blockchain-Based Voting System',
        proposalScore: 82,
        interimScore: 85,
        supervisorEvaluation: 87,
        totalScore: 84.67,
        grade: 'A-',
        remarks: 'Good work with minor improvements needed'
      },
      {
        studentId: 'STU003',
        studentName: 'Mike Johnson',
        rollNumber: '2021-CS-003',
        projectTitle: 'Smart Home Automation Platform',
        proposalScore: 78,
        interimScore: 80,
        supervisorEvaluation: 82,
        totalScore: 80,
        grade: 'B+',
        remarks: 'Satisfactory progress'
      }
    ]
  },
  {
    id: 'RC002',
    semester: 'Spring 2024',
    academicYear: '2023-2024',
    compiledBy: 'Dr. Michael Johnson',
    compiledAt: new Date('2024-05-15'),
    status: 'published',
    results: [
      {
        studentId: 'STU004',
        studentName: 'Sarah Williams',
        rollNumber: '2020-CS-045',
        projectTitle: 'Cloud-Based E-Commerce Platform',
        proposalScore: 90,
        interimScore: 92,
        finalScore: 94,
        supervisorEvaluation: 93,
        totalScore: 92.25,
        grade: 'A+',
        remarks: 'Outstanding work with excellent implementation'
      }
    ],
    hodApprovedBy: 'Dr. Ahmed Hassan',
    hodApprovedAt: new Date('2024-05-20'),
    publishedToLMS: true,
    publishedAt: new Date('2024-05-22'),
    hodComments: 'Approved for publication'
  }
];
