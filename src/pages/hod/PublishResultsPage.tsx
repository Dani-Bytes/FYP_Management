import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Upload, CheckCircle, FileText } from 'lucide-react';

type ResultStatus = 'approved' | 'published';

interface PublishableResult {
  id: string;
  batchName: string;
  totalStudents: number;
  approvedDate: string;
  status: ResultStatus;
}

const mockResults: PublishableResult[] = [
  {
    id: '1',
    batchName: 'FYP-II Mid Defense Results',
    totalStudents: 120,
    approvedDate: '2024-02-15',
    status: 'published'
  }
];

export function PublishResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Publish Results</h1>
        <p className="text-gray-600 mt-1">Publish approved results to student LMS portals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready to Publish</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockResults.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {mockResults.filter(r => r.status === 'published').length}
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
                {mockResults.reduce((sum, r) => sum + r.totalStudents, 0)}
              </p>
            </div>
            <Upload className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>
      </div>

      {/* Publishable Results */}
      <div className="space-y-4">
        {mockResults.map((result) => (
          <Card key={result.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{result.batchName}</h3>
                  <Badge className={result.status === 'published' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}>
                    {result.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{result.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Approved Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(result.approvedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                {result.status === 'approved' ? (
                  <Button className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Publish to LMS
                  </Button>
                ) : (
                  <Button variant="outline" className="border-green-500 text-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Published
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Publishing Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Publishing Instructions</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Ensure all results have been approved before publishing</li>
          <li>Publishing will make results visible to students in their LMS portals</li>
          <li>Published results cannot be modified - ensure accuracy before publishing</li>
          <li>Students will receive email notifications upon result publication</li>
        </ul>
      </Card>
    </div>
  );
}
