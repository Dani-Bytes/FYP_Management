import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileText, Calendar, User, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PendingReview {
  id: string;
  studentName: string;
  rollNumber: string;
  submissionType: 'assignment' | 'monthly-log' | 'document' | 'proposal';
  title: string;
  submittedDate: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  files: string[];
}

const mockPendingReviews: PendingReview[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    submissionType: 'monthly-log',
    title: 'February 2024 Progress Log',
    submittedDate: '2024-02-20',
    dueDate: '2024-02-25',
    priority: 'high',
    files: ['february_log.pdf', 'screenshots.zip']
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    submissionType: 'document',
    title: 'System Design Document (SDS)',
    submittedDate: '2024-02-19',
    dueDate: '2024-02-24',
    priority: 'high',
    files: ['sds_document.docx', 'architecture_diagrams.pdf']
  },
  {
    id: '3',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    submissionType: 'assignment',
    title: 'Literature Review Chapter',
    submittedDate: '2024-02-18',
    dueDate: '2024-02-26',
    priority: 'medium',
    files: ['literature_review.pdf']
  },
  {
    id: '4',
    studentName: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    submissionType: 'proposal',
    title: 'Project Proposal - Final Draft',
    submittedDate: '2024-02-15',
    dueDate: '2024-02-28',
    priority: 'low',
    files: ['proposal_final.pdf', 'gantt_chart.xlsx']
  }
];

export function PendingReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<PendingReview | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const getPriorityColor = (priority: PendingReview['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: PendingReview['submissionType']) => {
    switch (type) {
      case 'proposal':
        return 'bg-purple-500';
      case 'document':
        return 'bg-blue-500';
      case 'assignment':
        return 'bg-green-500';
      case 'monthly-log':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleApprove = () => {
    console.log('Approving review:', selectedReview?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
  };

  const handleReject = () => {
    console.log('Rejecting review:', selectedReview?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Reviews</h1>
        <p className="text-gray-600 mt-1">Review and provide feedback on your supervised students' submissions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">{mockPendingReviews.length}</p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {mockPendingReviews.filter(r => r.priority === 'high').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Logs</p>
              <p className="text-2xl font-bold text-orange-600">
                {mockPendingReviews.filter(r => r.submissionType === 'monthly-log').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-orange-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockPendingReviews.filter(r => r.submissionType === 'document').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Pending Reviews List */}
      <div className="grid grid-cols-1 gap-6">
        {mockPendingReviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                  <Badge className={`${getPriorityColor(review.priority)} text-white`}>
                    {review.priority} priority
                  </Badge>
                  <Badge className={`${getTypeColor(review.submissionType)} text-white`}>
                    {review.submissionType.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {review.studentName} ({review.rollNumber})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Submitted: {new Date(review.submittedDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <Clock className="h-4 w-4" />
                    Due: {new Date(review.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {review.files.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Attached Files:</p>
                    <div className="flex flex-wrap gap-2">
                      {review.files.map((file, index) => (
                        <button
                          key={index}
                          className="flex items-center gap-1 text-sm text-[#FF8C00] hover:text-[#cc7000] border border-[#FF8C00] rounded px-3 py-1"
                        >
                          <Download className="h-4 w-4" />
                          {file}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  setSelectedReview(review);
                  setShowReviewModal(true);
                }}
                className="bg-[#FF8C00] hover:bg-[#cc7000] text-white ml-4"
              >
                Review
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal && selectedReview !== null}
        onClose={() => setShowReviewModal(false)}
        title={selectedReview ? `Review: ${selectedReview.title}` : 'Review Submission'}
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Student:</span>
                  <p className="text-gray-900">{selectedReview.studentName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Roll Number:</span>
                  <p className="text-gray-900">{selectedReview.rollNumber}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <p className="text-gray-900 capitalize">{selectedReview.submissionType.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Submitted:</span>
                  <p className="text-gray-900">{new Date(selectedReview.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback / Comments
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                rows={6}
                placeholder="Provide detailed feedback for the student..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                placeholder="Enter grade (0-100)"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Request Revision
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
