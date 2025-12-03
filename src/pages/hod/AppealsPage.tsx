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
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

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

  const filteredAppeals = mockAppeals.filter(appeal => {
    const matchesType = filterType === 'all' || appeal.appealType === filterType;
    const matchesStatus = filterStatus === 'all' || appeal.status === filterStatus;
    return matchesType && matchesStatus;
  });

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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Types</option>
            <option value="grade">Grade</option>
            <option value="penalty">Penalty</option>
            <option value="deadline">Deadline</option>
            <option value="other">Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Appeals Table */}
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appeal Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordinator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppeals.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  No appeals found matching the selected filters
                </td>
              </tr>
            ) : (
              filteredAppeals.map((appeal, index) => (
                <tr key={appeal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appeal.studentName}</div>
                    <div className="text-sm text-gray-500">{appeal.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={appeal.subject}>
                      {appeal.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAppealTypeColor(appeal.appealType)}`}>
                      {appeal.appealType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appeal.coordinator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appeal.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(appeal.status)}>
                      {appeal.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {appeal.status === 'pending' && (
                        <>
                          <Button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                            <XCircle className="h-3 w-3 mr-1" />
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
                        className="border-[#FF8C00] text-[#FF8C00] text-xs px-2 py-1"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredAppeals.length} of {mockAppeals.length} appeals
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
