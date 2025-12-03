import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FileText, User, Calendar, Send } from 'lucide-react';

interface PendingEvaluation {
  id: string;
  studentName: string;
  rollNumber: string;
  projectTitle: string;
  defenseDate: string;
  supervisor: string;
  evaluatorType: 'internal' | 'external';
  status: 'pending' | 'submitted';
}

const mockEvaluations: PendingEvaluation[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    projectTitle: 'AI-Powered Learning Management System',
    defenseDate: '2024-02-25',
    supervisor: 'Dr. Hassan Ali',
    evaluatorType: 'internal',
    status: 'pending',
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    projectTitle: 'Blockchain-Based Supply Chain Management',
    defenseDate: '2024-02-25',
    supervisor: 'Dr. Hassan Ali',
    evaluatorType: 'internal',
    status: 'pending',
  },
  {
    id: '3',
    studentName: 'Usman Tariq',
    rollNumber: '01-131201-025',
    projectTitle: 'Smart City Traffic Optimization',
    defenseDate: '2024-02-26',
    supervisor: 'Dr. Maria Ali',
    evaluatorType: 'external',
    status: 'submitted',
  },
  {
    id: '4',
    studentName: 'Sara Raza',
    rollNumber: '01-131201-033',
    projectTitle: 'E-Learning Platform with Adaptive Content',
    defenseDate: '2024-02-26',
    supervisor: 'Dr. Bilal Qureshi',
    evaluatorType: 'external',
    status: 'submitted',
  },
];

export function EvaluationsPage() {
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<PendingEvaluation | null>(null);
  const [evaluatorTypeFilter, setEvaluatorTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEvaluations = mockEvaluations.filter((evaluation) => {
    const matchesType = evaluatorTypeFilter === 'all' || evaluation.evaluatorType === evaluatorTypeFilter;
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const pendingCount = mockEvaluations.filter(e => e.status === 'pending').length;
  const submittedCount = mockEvaluations.filter(e => e.status === 'submitted').length;
  const internalCount = mockEvaluations.filter(e => e.evaluatorType === 'internal').length;
  const externalCount = mockEvaluations.filter(e => e.evaluatorType === 'external').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evaluations</h1>
        <p className="text-gray-600 mt-1">Submit evaluations for completed defense presentations</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{pendingCount}</p>
            </div>
            <FileText className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-green-600">{submittedCount}</p>
            </div>
            <Send className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Internal</p>
              <p className="text-2xl font-bold text-purple-600">{internalCount}</p>
            </div>
            <User className="h-8 w-8 text-purple-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">External</p>
              <p className="text-2xl font-bold text-blue-600">{externalCount}</p>
            </div>
            <User className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evaluator Type
            </label>
            <select
              value={evaluatorTypeFilter}
              onChange={(e) => setEvaluatorTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Evaluations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Defense Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supervisor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
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
              {filteredEvaluations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No evaluations found matching the selected filters
                  </td>
                </tr>
              ) : (
                filteredEvaluations.map((evaluation, index) => (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{evaluation.studentName}</div>
                        <div className="text-sm text-gray-500">{evaluation.rollNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {evaluation.projectTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(evaluation.defenseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {evaluation.supervisor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={evaluation.evaluatorType === 'internal' ? 'warning' : 'info'}
                        className="capitalize"
                      >
                        {evaluation.evaluatorType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={evaluation.status === 'pending' ? 'default' : 'success'}
                        className="capitalize"
                      >
                        {evaluation.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {evaluation.status === 'pending' ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedEvaluation(evaluation);
                            setShowEvaluationModal(true);
                          }}
                        >
                          Submit Evaluation
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEvaluation(evaluation);
                            setShowEvaluationModal(true);
                          }}
                        >
                          View Evaluation
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Evaluation Form Modal */}
      <Modal
        isOpen={showEvaluationModal && selectedEvaluation !== null}
        onClose={() => setShowEvaluationModal(false)}
        title="Submit Evaluation"
        size="lg"
      >
        {selectedEvaluation && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">{selectedEvaluation.studentName}</h3>
              <p className="text-sm text-gray-600">{selectedEvaluation.projectTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presentation (0-20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Implementation (0-30)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Q&A Session (0-25)
                </label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documentation Quality (0-15)
                </label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback & Comments
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                rows={6}
                placeholder="Provide detailed feedback on the project..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEvaluationModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowEvaluationModal(false)}
                className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Evaluation
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
