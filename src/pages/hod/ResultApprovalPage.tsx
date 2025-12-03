import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileSpreadsheet, CheckCircle, Award } from 'lucide-react';

type ResultStatus = 'compiled' | 'pending' | 'approved' | 'published';

interface ResultBatch {
  id: string;
  batchName: string;
  totalStudents: number;
  averageMarks: number;
  passRate: number;
  status: ResultStatus;
  submittedBy: string;
  submittedDate: string;
}

const mockBatches: ResultBatch[] = [
  {
    id: '1',
    batchName: 'FYP-II Final Results - Batch A',
    totalStudents: 45,
    averageMarks: 178,
    passRate: 96,
    status: 'pending',
    submittedBy: 'Dr. Sarah Ahmed',
    submittedDate: '2024-02-20'
  },
  {
    id: '2',
    batchName: 'FYP-II Mid Defense Results',
    totalStudents: 120,
    averageMarks: 42,
    passRate: 98,
    status: 'approved',
    submittedBy: 'Dr. Sarah Ahmed',
    submittedDate: '2024-02-15'
  }
];

export function ResultApprovalPage() {
  const getStatusColor = (status: ResultStatus) => {
    const colors = {
      compiled: 'bg-blue-500',
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      published: 'bg-purple-500'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Result Approval</h1>
        <p className="text-gray-600 mt-1">Review and approve compiled FYP results before publication</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockBatches.filter(b => b.status === 'pending').length}
              </p>
            </div>
            <FileSpreadsheet className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {mockBatches.filter(b => b.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-[#FF8C00]">
                {mockBatches.reduce((sum, b) => sum + b.totalStudents, 0)}
              </p>
            </div>
            <Award className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>
      </div>

      {/* Result Batches */}
      <div className="space-y-4">
        {mockBatches.map((batch) => (
          <Card key={batch.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{batch.batchName}</h3>
                  <Badge className={`${getStatusColor(batch.status)} text-white`}>
                    {batch.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{batch.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Average Marks</p>
                    <p className="text-2xl font-bold text-[#FF8C00]">{batch.averageMarks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pass Rate</p>
                    <p className="text-2xl font-bold text-green-600">{batch.passRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submitted Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(batch.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">Submitted by {batch.submittedBy}</p>
              </div>

              <div className="flex gap-2 ml-4">
                {batch.status === 'pending' && (
                  <>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      Request Revision
                    </Button>
                  </>
                )}
                <Button variant="outline" className="border-[#FF8C00] text-[#FF8C00]">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
