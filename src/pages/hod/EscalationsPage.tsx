import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { AlertTriangle, User, Calendar, CheckCircle } from 'lucide-react';

interface Escalation {
  id: string;
  title: string;
  studentName: string;
  rollNumber: string;
  supervisor: string;
  issueType: 'academic' | 'behavioral' | 'attendance' | 'technical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  escalatedDate: string;
  status: 'open' | 'in-progress' | 'resolved';
}

const mockEscalations: Escalation[] = [
  {
    id: '1',
    title: 'Repeated Deadline Violations',
    studentName: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    supervisor: 'Dr. Hassan Ali',
    issueType: 'academic',
    severity: 'high',
    description: 'Student has violated 3 consecutive deadlines despite supervisor warnings.',
    escalatedDate: '2024-02-18',
    status: 'open'
  }
];

export function EscalationsPage() {
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const getSeverityColor = (severity: Escalation['severity']) => {
    const colors = {
      critical: 'bg-red-600',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[severity];
  };

  const getStatusColor = (status: Escalation['status']) => {
    const colors = {
      resolved: 'bg-green-500',
      'in-progress': 'bg-blue-500',
      open: 'bg-red-500'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Escalations</h1>
        <p className="text-gray-600 mt-1">Review and resolve escalated student issues from coordinators</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CheckCircle className="h-8 w-8 text-blue-400" />
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
            <CheckCircle className="h-8 w-8 text-green-400" />
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
                    {escalation.severity}
                  </Badge>
                  <Badge className={`${getStatusColor(escalation.status)} text-white`}>
                    {escalation.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {escalation.studentName} ({escalation.rollNumber})
                  </span>
                  <span>Supervisor: {escalation.supervisor}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(escalation.escalatedDate).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-600">{escalation.description}</p>
              </div>

              <div className="flex gap-2 ml-4">
                {escalation.status !== 'resolved' && (
                  <>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    setSelectedEscalation(escalation);
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
        isOpen={showViewModal && selectedEscalation !== null}
        onClose={() => setShowViewModal(false)}
        title="Escalation Details"
      >
        {selectedEscalation && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedEscalation.title}</h3>
              <p className="text-sm text-gray-600">{selectedEscalation.studentName} ({selectedEscalation.rollNumber})</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Severity</p>
                <Badge className={`${getSeverityColor(selectedEscalation.severity)} text-white`}>
                  {selectedEscalation.severity}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge className={`${getStatusColor(selectedEscalation.status)} text-white`}>
                  {selectedEscalation.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Escalated Date</p>
                <p className="text-sm font-medium">{new Date(selectedEscalation.escalatedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Supervisor</p>
                <p className="text-sm font-medium">{selectedEscalation.supervisor}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedEscalation.description}</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
              {selectedEscalation.status !== 'resolved' && (
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Mark as Resolved
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
