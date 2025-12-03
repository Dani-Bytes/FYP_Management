import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { AlertTriangle, User, Calendar, FileText, Send } from 'lucide-react';

interface Escalation {
  id: string;
  studentName: string;
  rollNumber: string;
  issueType: 'academic' | 'behavioral' | 'attendance' | 'technical';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved';
  reportedDate: string;
  lastUpdated: string;
}

const mockEscalations: Escalation[] = [
  {
    id: '1',
    studentName: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    issueType: 'academic',
    title: 'Consistently Missing Deadlines',
    description: 'Student has missed 3 consecutive monthly log submissions and has not responded to multiple reminder emails.',
    severity: 'high',
    status: 'open',
    reportedDate: '2024-02-15',
    lastUpdated: '2024-02-15'
  },
  {
    id: '2',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    issueType: 'attendance',
    title: 'Poor Meeting Attendance',
    description: 'Student has attended only 2 out of 6 scheduled supervision meetings without prior notice.',
    severity: 'medium',
    status: 'in-progress',
    reportedDate: '2024-02-10',
    lastUpdated: '2024-02-18'
  }
];

export function EscalationsPage() {
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const getSeverityColor = (severity: Escalation['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: Escalation['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'open':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getIssueTypeColor = (type: Escalation['issueType']) => {
    switch (type) {
      case 'academic':
        return 'bg-purple-100 text-purple-700';
      case 'behavioral':
        return 'bg-red-100 text-red-700';
      case 'attendance':
        return 'bg-yellow-100 text-yellow-700';
      case 'technical':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escalations</h1>
          <p className="text-gray-600 mt-1">Report and track student issues escalated to coordination</p>
        </div>
        <Button
          onClick={() => setShowEscalateModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          New Escalation
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{mockEscalations.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-2xl font-bold text-red-600">
                {mockEscalations.filter(e => e.status === 'open').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockEscalations.filter(e => e.status === 'in-progress').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {mockEscalations.filter(e => e.status === 'resolved').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Escalations List */}
      <div className="space-y-4">
        {mockEscalations.map((escalation) => (
          <Card key={escalation.id} className="p-6 border-l-4 border-red-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{escalation.title}</h3>
                  <Badge className={`${getSeverityColor(escalation.severity)} text-white`}>
                    {escalation.severity} severity
                  </Badge>
                  <Badge className={`${getStatusColor(escalation.status)} text-white`}>
                    {escalation.status}
                  </Badge>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getIssueTypeColor(escalation.issueType)}`}>
                    {escalation.issueType}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {escalation.studentName} ({escalation.rollNumber})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Reported: {new Date(escalation.reportedDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated: {new Date(escalation.lastUpdated).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-600">{escalation.description}</p>
              </div>

              <Button
                onClick={() => {
                  setSelectedEscalation(escalation);
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

      {/* New Escalation Modal */}
      <Modal
        isOpen={showEscalateModal}
        onClose={() => setShowEscalateModal(false)}
        title="Report New Escalation"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
                <option>Academic</option>
                <option>Behavioral</option>
                <option>Attendance</option>
                <option>Technical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              placeholder="Brief title for the issue..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              rows={6}
              placeholder="Provide detailed description of the issue, steps taken, and recommended action..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowEscalateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setShowEscalateModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Escalation
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedEscalation !== null}
        onClose={() => setShowViewModal(false)}
        title={selectedEscalation ? selectedEscalation.title : 'Escalation Details'}
      >
        {selectedEscalation && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Student:</span>
                  <p className="text-gray-900">{selectedEscalation.studentName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Roll Number:</span>
                  <p className="text-gray-900">{selectedEscalation.rollNumber}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Issue Type:</span>
                  <p className="text-gray-900 capitalize">{selectedEscalation.issueType}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Severity:</span>
                  <Badge className={`${getSeverityColor(selectedEscalation.severity)} text-white mt-1`}>
                    {selectedEscalation.severity}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <Badge className={`${getStatusColor(selectedEscalation.status)} text-white mt-1`}>
                    {selectedEscalation.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Reported:</span>
                  <p className="text-gray-900">{new Date(selectedEscalation.reportedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600">{selectedEscalation.description}</p>
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
