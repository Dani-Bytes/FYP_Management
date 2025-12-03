import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileText, User, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Appeal {
  id: string;
  studentName: string;
  rollNumber: string;
  appealType: 'grade' | 'penalty' | 'deadline' | 'other';
  subject: string;
  description: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  coordinator: string;
}

const mockAppeals: Appeal[] = [
  {
    id: '1',
    studentName: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    appealType: 'grade',
    subject: 'Appeal for Final Defense Grade Review',
    description: 'Request for review of final defense marks. Believe technical implementation deserves higher evaluation.',
    submittedDate: '2024-02-20',
    status: 'pending',
    coordinator: 'Dr. Sarah Ahmed'
  },
  {
    id: '2',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    appealType: 'penalty',
    subject: 'Appeal Against Late Submission Penalty',
    description: 'Requesting reconsideration of penalty due to documented medical emergency during submission period.',
    submittedDate: '2024-02-18',
    status: 'pending',
    coordinator: 'Dr. Sarah Ahmed'
  }
];

export function AppealsPage() {
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const getAppealTypeColor = (type: Appeal['appealType']) => {
    switch (type) {
      case 'grade':
        return 'bg-purple-100 text-purple-700';
      case 'penalty':
        return 'bg-red-100 text-red-700';
      case 'deadline':
        return 'bg-yellow-100 text-yellow-700';
      case 'other':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: Appeal['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Appeals</h1>
        <p className="text-gray-600 mt-1">Review and process student appeals for grades, penalties, and deadlines</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Appeals</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockAppeals.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {mockAppeals.filter(a => a.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {mockAppeals.filter(a => a.status === 'rejected').length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Appeals List */}
      <div className="space-y-4">
        {mockAppeals.map((appeal) => (
          <Card key={appeal.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{appeal.subject}</h3>
                  <Badge className={getStatusColor(appeal.status)}>
                    {appeal.status}
                  </Badge>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAppealTypeColor(appeal.appealType)}`}>
                    {appeal.appealType}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {appeal.studentName} ({appeal.rollNumber})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(appeal.submittedDate).toLocaleDateString()}
                  </span>
                  <span>Coordinator: {appeal.coordinator}</span>
                </div>

                <p className="text-gray-600">{appeal.description}</p>
              </div>

              <div className="flex gap-2 ml-4">
                {appeal.status === 'pending' && (
                  <>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    setSelectedAppeal(appeal);
                    setShowViewModal(true);
                  }}
                  variant="outline"
                  className="border-[#FF8C00] text-[#FF8C00]"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedAppeal !== null}
        onClose={() => setShowViewModal(false)}
        title="Appeal Details"
      >
        {selectedAppeal && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedAppeal.studentName}</h3>
              <p className="text-sm text-gray-600">{selectedAppeal.rollNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Appeal Type</p>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAppealTypeColor(selectedAppeal.appealType)}`}>
                  {selectedAppeal.appealType}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge className={getStatusColor(selectedAppeal.status)}>
                  {selectedAppeal.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Submitted Date</p>
                <p className="text-sm font-medium">{new Date(selectedAppeal.submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Coordinator</p>
                <p className="text-sm font-medium">{selectedAppeal.coordinator}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Subject</h4>
              <p className="text-sm font-medium text-gray-900">{selectedAppeal.subject}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedAppeal.description}</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
              {selectedAppeal.status === 'pending' && (
                <>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Approve
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
