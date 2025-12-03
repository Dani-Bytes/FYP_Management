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
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

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

  const filteredEscalations = mockEscalations.filter(escalation => {
    const matchesType = filterType === 'all' || escalation.issueType === filterType;
    const matchesStatus = filterStatus === 'all' || escalation.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || escalation.severity === filterSeverity;
    return matchesType && matchesStatus && matchesSeverity;
  });

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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Types</option>
            <option value="academic">Academic</option>
            <option value="behavioral">Behavioral</option>
            <option value="attendance">Attendance</option>
            <option value="technical">Technical</option>
          </select>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </Card>

      {/* Escalations Table */}
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supervisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Escalated Date
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
            {filteredEscalations.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                  No escalations found matching the selected filters
                </td>
              </tr>
            ) : (
              filteredEscalations.map((escalation, index) => (
                <tr key={escalation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{escalation.studentName}</div>
                    <div className="text-sm text-gray-500">{escalation.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={escalation.title}>
                      {escalation.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-blue-100 text-blue-700">
                      {escalation.issueType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`${getSeverityColor(escalation.severity)} text-white`}>
                      {escalation.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {escalation.supervisor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(escalation.escalatedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`${getStatusColor(escalation.status)} text-white`}>
                      {escalation.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {escalation.status !== 'resolved' && (
                        <Button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          setSelectedEscalation(escalation);
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
        Showing {filteredEscalations.length} of {mockEscalations.length} escalations
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
