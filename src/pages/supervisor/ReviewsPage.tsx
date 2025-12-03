import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileText, Calendar, User, Download, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

interface Review {
  id: string;
  studentName: string;
  rollNumber: string;
  type: 'assignment' | 'monthly-log' | 'document' | 'proposal';
  title: string;
  submittedDate: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'revision-requested';
  files: string[];
  // Monthly log specific fields
  month?: string;
  slotNumber?: number;
  year?: number;
  workDone?: string[];
  challenges?: string[];
  nextMonthPlan?: string[];
  feedback?: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    type: 'monthly-log',
    title: 'February 2024 Progress Log - Slot 1',
    submittedDate: '2024-02-05',
    dueDate: '2024-02-25',
    priority: 'high',
    status: 'pending',
    files: ['february_log.pdf'],
    month: 'February',
    slotNumber: 1,
    year: 2024,
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
    type: 'document',
    title: 'System Design Document (SDS)',
    submittedDate: '2024-02-19',
    dueDate: '2024-02-24',
    priority: 'high',
    status: 'pending',
    files: ['sds_document.docx', 'architecture_diagrams.pdf']
  },
  {
    id: '3',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    type: 'assignment',
    title: 'Literature Review Chapter',
    submittedDate: '2024-02-18',
    dueDate: '2024-02-26',
    priority: 'medium',
    status: 'pending',
    files: ['literature_review.pdf']
  },
  {
    id: '4',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    type: 'monthly-log',
    title: 'February 2024 Progress Log - Slot 2',
    submittedDate: '2024-02-12',
    dueDate: '2024-02-28',
    priority: 'medium',
    status: 'approved',
    files: ['feb_slot2_log.pdf'],
    month: 'February',
    slotNumber: 2,
    year: 2024,
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
  }
];

export function ReviewsPage() {
  const [selectedSemester, setSelectedSemester] = useState<string>('All Semesters');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [selectedStatus, setSelectedStatus] = useState<string>('Pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const getPriorityColor = (priority: Review['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white border-red-500';
      case 'medium':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'low':
        return 'bg-blue-500 text-white border-blue-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getTypeColor = (type: Review['type']) => {
    switch (type) {
      case 'proposal':
        return 'bg-purple-500 text-white border-purple-500';
      case 'document':
        return 'bg-blue-500 text-white border-blue-500';
      case 'assignment':
        return 'bg-green-500 text-white border-green-500';
      case 'monthly-log':
        return 'bg-orange-500 text-white border-orange-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white border-green-500';
      case 'pending':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'revision-requested':
        return 'bg-red-500 text-white border-red-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getFilteredReviews = () => {
    let filtered = mockReviews;
    
    // Filter by semester
    if (selectedSemester !== 'All Semesters') {
      // In a real app, you'd have semester info on each review
      filtered = filtered;
    }
    
    // Filter by type
    if (selectedType === 'Monthly Logs') {
      filtered = filtered.filter(r => r.type === 'monthly-log');
    } else if (selectedType === 'Documents & Reports') {
      filtered = filtered.filter(r => r.type === 'document' || r.type === 'proposal');
    } else if (selectedType === 'Assignments') {
      filtered = filtered.filter(r => r.type === 'assignment');
    }
    
    // Filter by status
    if (selectedStatus === 'Pending') {
      filtered = filtered.filter(r => r.status === 'pending');
    } else if (selectedStatus === 'Approved') {
      filtered = filtered.filter(r => r.status === 'approved');
    } else if (selectedStatus === 'Needs Revision') {
      filtered = filtered.filter(r => r.status === 'revision-requested');
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();

  const handleApprove = () => {
    console.log('Approving review:', selectedReview?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
    setSelectedReview(null);
  };

  const handleReject = () => {
    console.log('Requesting revision:', selectedReview?.id, 'Feedback:', feedback);
    setShowReviewModal(false);
    setFeedback('');
    setSelectedReview(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Approvals</h1>
        <p className="text-gray-600 mt-1">Review student submissions, documents, and monthly logs</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockReviews.filter(r => r.status === 'pending').length}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {mockReviews.filter(r => r.status === 'approved').length}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">High Priority</p>
          <p className="text-2xl font-bold text-red-600">
            {mockReviews.filter(r => r.priority === 'high' && r.status === 'pending').length}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900">{mockReviews.length}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">FILTERS</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Semester:</label>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option>All Semesters</option>
              <option>7th Semester</option>
              <option>8th Semester</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Type:</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option>All Types</option>
              <option>Monthly Logs</option>
              <option>Documents & Reports</option>
              <option>Assignments</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Status:</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Needs Revision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title / Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Files</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitted Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review, index) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{review.studentName}</p>
                      <p className="text-xs text-gray-600">{review.rollNumber}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">{review.title}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={getTypeColor(review.type)}>
                          {review.type.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      {review.files.slice(0, 2).map((file, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-1 text-xs text-[#FF8C00] hover:text-[#cc7000] border border-[#FF8C00] rounded px-2 py-1"
                        >
                          <Download className="h-3 w-3" />
                          {file}
                        </button>
                      ))}
                      {review.files.length > 2 && (
                        <p className="text-xs text-gray-500">+{review.files.length - 2} more</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(review.submittedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={getStatusColor(review.status)}>
                      {review.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowViewModal(true);
                        }}
                        variant="outline"
                        className="border-[#FF8C00] text-[#FF8C00] text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      {review.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedReview(review);
                            setShowReviewModal(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="bg-[#FF8C00] text-white px-2 py-1 rounded text-xs text-center whitespace-nowrap">
                        {new Date(review.dueDate).toLocaleDateString()}
                      </div>
                      <div className="bg-cyan-500 text-white px-2 py-1 rounded text-xs text-center whitespace-nowrap">
                        {new Date(review.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedReview !== null}
        onClose={() => setShowViewModal(false)}
        title={selectedReview?.title || 'Review Details'}
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
                  <p className="text-gray-900 capitalize">{selectedReview.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <Badge className={getStatusColor(selectedReview.status)}>
                    {selectedReview.status}
                  </Badge>
                </div>
              </div>
            </div>

            {selectedReview.type === 'monthly-log' && (
              <>
                {selectedReview.workDone && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Work Completed</h4>
                    <ul className="space-y-2">
                      {selectedReview.workDone.map((work, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {work}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedReview.challenges && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Challenges Faced</h4>
                    <ul className="space-y-2">
                      {selectedReview.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedReview.nextMonthPlan && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Month's Plan</h4>
                    <ul className="space-y-2">
                      {selectedReview.nextMonthPlan.map((plan, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          {plan}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {selectedReview.feedback && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Your Feedback</h4>
                <p className="text-sm text-blue-800">{selectedReview.feedback}</p>
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
                  <p className="text-gray-900 capitalize">{selectedReview.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Submitted:</span>
                  <p className="text-gray-900">{new Date(selectedReview.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {selectedReview.type === 'monthly-log' && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800">
                After signing, this log will be submitted to the coordinator for record keeping.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback / Comments
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                rows={6}
                placeholder={selectedReview.type === 'monthly-log' 
                  ? "Add your comments on the student's progress..." 
                  : "Provide detailed feedback for the student..."}
              />
            </div>

            {selectedReview.type !== 'monthly-log' && (
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
            )}

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
                {selectedReview.type === 'monthly-log' ? 'Sign & Submit to Coordinator' : 'Approve'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
