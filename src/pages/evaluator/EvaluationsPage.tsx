import { useState } from 'react';
import { Card } from '../../components/ui/Card';
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
}

const mockEvaluations: PendingEvaluation[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    projectTitle: 'AI-Powered Learning Management System',
    defenseDate: '2024-02-25',
    supervisor: 'Dr. Hassan Ali',
    evaluatorType: 'internal'
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    projectTitle: 'Blockchain-Based Supply Chain Management',
    defenseDate: '2024-02-25',
    supervisor: 'Dr. Hassan Ali',
    evaluatorType: 'internal'
  }
];

export function EvaluationsPage() {
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<PendingEvaluation | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Evaluations</h1>
        <p className="text-gray-600 mt-1">Submit evaluations for completed defense presentations</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{mockEvaluations.length}</p>
            </div>
            <FileText className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Internal</p>
              <p className="text-2xl font-bold text-purple-600">
                {mockEvaluations.filter(e => e.evaluatorType === 'internal').length}
              </p>
            </div>
            <User className="h-8 w-8 text-purple-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">External</p>
              <p className="text-2xl font-bold text-green-600">
                {mockEvaluations.filter(e => e.evaluatorType === 'external').length}
              </p>
            </div>
            <User className="h-8 w-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        {mockEvaluations.map((evaluation) => (
          <Card key={evaluation.id} className="p-6 border-l-4 border-[#FF8C00]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{evaluation.studentName}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    evaluation.evaluatorType === 'internal' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {evaluation.evaluatorType}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{evaluation.rollNumber}</p>
                <p className="text-base font-medium text-gray-900 mb-3">{evaluation.projectTitle}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Defense: {new Date(evaluation.defenseDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Supervisor: {evaluation.supervisor}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedEvaluation(evaluation);
                  setShowEvaluationModal(true);
                }}
                className="bg-[#FF8C00] hover:bg-[#cc7000] text-white ml-4"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Evaluation
              </Button>
            </div>
          </Card>
        ))}
      </div>

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
