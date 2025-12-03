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

      {/* Penalties List */}
      <div className="space-y-4">
        {mockPenalties.map((penalty) => (
          <Card key={penalty.id} className="p-6 border-l-4 border-red-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{penalty.studentName}</h3>
                  <Badge className={getStatusColor(penalty.status)}>
                    {penalty.status}
                  </Badge>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPenaltyTypeColor(penalty.penaltyType)}`}>
                    {penalty.penaltyType}
                  </span>
                  <span className="text-sm font-bold text-red-600">
                    -{penalty.marksDeducted} marks
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {penalty.rollNumber} • Supervisor: {penalty.supervisor}
                </p>

                <p className="text-gray-700 mb-3">{penalty.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(penalty.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedPenalty(penalty);
                  setShowViewModal(true);
                }}
                variant="outline"
                className="border-[#FF8C00] text-[#FF8C00] ml-4"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
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
