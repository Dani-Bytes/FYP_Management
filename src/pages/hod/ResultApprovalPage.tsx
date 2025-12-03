import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileSpreadsheet, CheckCircle, Award, XCircle } from 'lucide-react';

type ResultStatus = 'pending' | 'published';

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
    status: 'pending',
    submittedBy: 'Dr. Sarah Ahmed',
    submittedDate: '2024-02-15'
  },
  {
    id: '3',
    batchName: 'FYP-I Proposal Results',
    totalStudents: 150,
    averageMarks: 17,
    passRate: 94,
    status: 'published',
    submittedBy: 'Dr. Sarah Ahmed',
    submittedDate: '2024-02-10'
  }
];

export function ResultApprovalPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: ResultStatus) => {
    const colors = {
      pending: 'bg-yellow-500',
      published: 'bg-green-500'
    };
    return colors[status];
  };

  const filteredBatches = mockBatches.filter(batch => {
    return filterStatus === 'all' || batch.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
        <p className="text-gray-600 mt-1">Review and publish compiled FYP results to student LMS portals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
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
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {mockBatches.filter(b => b.status === 'published').length}
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

      {/* Filter */}
      <Card className="p-4">
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="published">Published</option>
          </select>
        </div>
      </Card>

      {/* Result Batches */}
      <div className="space-y-4">
        {filteredBatches.map((batch) => (
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
                {batch.status === 'pending' ? (
                  <>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Publish
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      <XCircle className="h-4 w-4 mr-2" />
                      Request Revision
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="border-green-500 text-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Published to LMS
                  </Button>
                )}
                <Button variant="outline" className="border-[#FF8C00] text-[#FF8C00]">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredBatches.length} of {mockBatches.length} result batches
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Instructions</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Review all results carefully before approving</li>
          <li>Clicking "Approve & Publish" will immediately publish results to student LMS portals</li>
          <li>Students will be able to view their results in their LMS accounts</li>
          <li>Published results cannot be modified - ensure accuracy before publishing</li>
          <li>Students will receive email notifications upon result publication</li>
        </ul>
      </Card>
    </div>
  );
}
