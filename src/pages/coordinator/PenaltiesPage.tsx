import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { AlertTriangle, Calendar, FileText } from 'lucide-react';

interface Penalty {
  id: string;
  studentName: string;
  rollNumber: string;
  supervisor: string;
  penaltyType: 'late-submission' | 'plagiarism' | 'attendance' | 'misconduct';
  description: string;
  marksDeducted: number;
  date: string;
  status: 'pending' | 'applied' | 'appealed';
}

const mockPenalties: Penalty[] = [
  {
    id: '1',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    supervisor: 'Dr. Hassan Ali',
    penaltyType: 'late-submission',
    description: 'Proposal submitted 3 days after deadline without prior approval',
    marksDeducted: 10,
    date: '2024-02-18',
    status: 'applied'
  },
  {
    id: '2',
    studentName: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    supervisor: 'Dr. Hassan Ali',
    penaltyType: 'attendance',
    description: 'Missed 4 consecutive supervision meetings without notification',
    marksDeducted: 15,
    date: '2024-02-15',
    status: 'pending'
  }
];

export function PenaltiesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getPenaltyTypeColor = (type: Penalty['penaltyType']) => {
    switch (type) {
      case 'plagiarism':
        return 'bg-red-100 text-red-700';
      case 'late-submission':
        return 'bg-yellow-100 text-yellow-700';
      case 'attendance':
        return 'bg-blue-100 text-blue-700';
      case 'misconduct':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: Penalty['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'appealed':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredPenalties = mockPenalties.filter(penalty => {
    const matchesType = filterType === 'all' || penalty.penaltyType === filterType;
    const matchesStatus = filterStatus === 'all' || penalty.status === filterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penalties Management</h1>
          <p className="text-gray-600 mt-1">Track and manage penalties for policy violations</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Add Penalty
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Penalties</p>
              <p className="text-2xl font-bold text-gray-900">{mockPenalties.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockPenalties.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Applied</p>
              <p className="text-2xl font-bold text-green-600">
                {mockPenalties.filter(p => p.status === 'applied').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Deducted</p>
              <p className="text-2xl font-bold text-red-600">
                {mockPenalties.reduce((sum, p) => sum + p.marksDeducted, 0)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
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
            <option value="late-submission">Late Submission</option>
            <option value="plagiarism">Plagiarism</option>
            <option value="attendance">Attendance</option>
            <option value="misconduct">Misconduct</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
            <option value="appealed">Appealed</option>
          </select>
        </div>
      </Card>

      {/* Penalties Table */}
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
                Supervisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penalty Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marks Deducted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPenalties.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                  No penalties found matching the selected filters
                </td>
              </tr>
            ) : (
              filteredPenalties.map((penalty, index) => (
                <tr key={penalty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{penalty.studentName}</div>
                    <div className="text-sm text-gray-500">{penalty.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {penalty.supervisor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPenaltyTypeColor(penalty.penaltyType)}`}>
                      {penalty.penaltyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={penalty.description}>
                      {penalty.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-red-600">
                      -{penalty.marksDeducted}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(penalty.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(penalty.status)}>
                      {penalty.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      onClick={() => {
                        setSelectedPenalty(penalty);
                        setShowViewModal(true);
                      }}
                      variant="outline"
                      className="border-[#FF8C00] text-[#FF8C00]"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredPenalties.length} of {mockPenalties.length} penalties
      </div>

      {/* Add Penalty Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Penalty"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
              <option>Select student...</option>
              <option>Ahmed Khan (01-131201-003)</option>
              <option>Fatima Ali (01-131201-012)</option>
              <option>Hassan Raza (01-131201-024)</option>
              <option>Ayesha Malik (01-131201-035)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penalty Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
              <option>Late Submission</option>
              <option>Plagiarism</option>
              <option>Attendance</option>
              <option>Misconduct</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marks to Deduct
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              placeholder="Enter marks..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              rows={4}
              placeholder="Detailed description of the violation..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Apply Penalty
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedPenalty !== null}
        onClose={() => setShowViewModal(false)}
        title="Penalty Details"
      >
        {selectedPenalty && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedPenalty.studentName}</h3>
              <p className="text-sm text-gray-600">{selectedPenalty.rollNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Penalty Type</p>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPenaltyTypeColor(selectedPenalty.penaltyType)}`}>
                  {selectedPenalty.penaltyType}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge className={getStatusColor(selectedPenalty.status)}>
                  {selectedPenalty.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Marks Deducted</p>
                <p className="text-sm font-bold text-red-600">-{selectedPenalty.marksDeducted}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="text-sm font-medium">{new Date(selectedPenalty.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Supervisor</p>
              <p className="text-sm font-medium">{selectedPenalty.supervisor}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedPenalty.description}</p>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
