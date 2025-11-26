import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Calendar, User, Eye, Download, CheckCircle, XCircle } from 'lucide-react';

interface MonthlyLog {
  id: string;
  studentName: string;
  rollNumber: string;
  month: string;
  slotNumber: number; // 1-4 (4 slots per month)
  year: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'revision-requested';
  workDone: string[];
  challenges: string[];
  nextMonthPlan: string[];
  feedback?: string;
}

const mockMonthlyLogs: MonthlyLog[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    month: 'February',
    slotNumber: 1,
    year: 2024,
    submittedDate: '2024-02-05',
    status: 'pending',
    workDone: [
      'Completed literature review of 15 research papers',
      'Finalized project proposal document',
      'Created initial system architecture diagrams'
    ],
    challenges: [
      'Finding recent research papers in the domain',
      'Understanding complex research methodologies'
    ],
    nextMonthPlan: [
      'Complete SRS document',
      'Start database design',
      'Prepare for proposal defense'
    ]
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    month: 'February',
    slotNumber: 2,
    year: 2024,
    submittedDate: '2024-02-12',
    status: 'approved',
    workDone: [
      'Completed and submitted SRS document',
      'Designed database schema',
      'Successfully defended project proposal'
    ],
    challenges: [
      'Time management during proposal defense preparation'
    ],
    nextMonthPlan: [
      'Complete system design document',
      'Finalize UI/UX mockups'
    ],
    feedback: 'Excellent progress! Keep up the good work.'
  },
  {
    id: '3',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    month: 'January',
    slotNumber: 4,
    year: 2024,
    submittedDate: '2024-01-25',
    status: 'revision-requested',
    workDone: [
      'Started literature review',
      'Drafted problem statement'
    ],
    challenges: [
      'Unclear project scope',
      'Limited resources'
    ],
    nextMonthPlan: [
      'Finalize proposal'
    ],
    feedback: 'Please provide more details on your methodology. The problem statement needs refinement.'
  }
];

export function MonthlyLogsPage() {
  const [selectedLog, setSelectedLog] = useState<MonthlyLog | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const getStatusColor = (status: MonthlyLog['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'revision-requested':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleApprove = () => {
    console.log('Approving log:', selectedLog?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
  };

  const handleRequestRevision = () => {
    console.log('Requesting revision:', selectedLog?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monthly Progress Logs</h1>
        <p className="text-gray-600 mt-1">Review and sign monthly logs for your supervised students</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockMonthlyLogs.filter(l => l.status === 'pending').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {mockMonthlyLogs.filter(l => l.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Revision</p>
              <p className="text-2xl font-bold text-red-600">
                {mockMonthlyLogs.filter(l => l.status === 'revision-requested').length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Monthly Logs List */}
      <div className="grid grid-cols-1 gap-6">
        {mockMonthlyLogs.map((log) => (
          <Card key={log.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {log.month} {log.year} - Slot {log.slotNumber}/4 - {log.studentName}
                  </h3>
                  <Badge className={`${getStatusColor(log.status)} text-white`}>
                    {log.status.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {log.rollNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Submitted: {new Date(log.submittedDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Work Completed:</p>
                  <ul className="space-y-1">
                    {log.workDone.slice(0, 2).map((work, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {work}
                      </li>
                    ))}
                  </ul>
                  {log.workDone.length > 2 && (
                    <p className="text-sm text-gray-500 mt-1">+{log.workDone.length - 2} more items</p>
                  )}
                </div>

                {log.feedback && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Your Feedback: </span>
                      {log.feedback}
                    </p>
                  </div>
                )}
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    setSelectedLog(log);
                    setShowViewModal(true);
                  }}
                  variant="outline"
                  className="border-[#FF8C00] text-[#FF8C00]"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {log.status === 'pending' && (
                  <Button
                    onClick={() => {
                      setSelectedLog(log);
                      setShowReviewModal(true);
                    }}
                    className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
                  >
                    Sign & Submit to Coordinator
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedLog !== null}
        onClose={() => setShowViewModal(false)}
        title={selectedLog ? `${selectedLog.month} ${selectedLog.year} - ${selectedLog.studentName}` : 'Monthly Log'}
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Student:</span>
                  <p className="text-gray-900">{selectedLog.studentName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Roll Number:</span>
                  <p className="text-gray-900">{selectedLog.rollNumber}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Month:</span>
                  <p className="text-gray-900">{selectedLog.month} {selectedLog.year}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <Badge className={`${getStatusColor(selectedLog.status)} text-white`}>
                    {selectedLog.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Work Completed</h4>
              <ul className="space-y-2">
                {selectedLog.workDone.map((work, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {work}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Challenges Faced</h4>
              <ul className="space-y-2">
                {selectedLog.challenges.map((challenge, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Month's Plan</h4>
              <ul className="space-y-2">
                {selectedLog.nextMonthPlan.map((plan, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    {plan}
                  </li>
                ))}
              </ul>
            </div>

            {selectedLog.feedback && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Your Feedback</h4>
                <p className="text-sm text-blue-800">{selectedLog.feedback}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
              <Button className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal && selectedLog !== null}
        onClose={() => setShowReviewModal(false)}
        title={selectedLog ? `Sign Monthly Log: ${selectedLog.month} ${selectedLog.year}` : 'Sign Log'}
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm"><span className="font-semibold">Student:</span> {selectedLog.studentName}</p>
              <p className="text-sm"><span className="font-semibold">Month:</span> {selectedLog.month} {selectedLog.year}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800">
              After signing, this log will be submitted to the coordinator for record keeping.
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor Comments (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                rows={6}
                placeholder="Add your comments on the student's progress..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleRequestRevision}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Request Revision from Student
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Sign & Submit to Coordinator
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
