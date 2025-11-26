import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileSpreadsheet, Download, CheckCircle, User, Award } from 'lucide-react';

type ResultStatus = 'compiled' | 'pending' | 'approved' | 'published';

interface ResultData {
  id: string;
  studentName: string;
  rollNumber: string;
  supervisor: string;
  proposalMarks: number;
  midDefenseMarks: number;
  finalDefenseMarks: number;
  documentationMarks: number;
  totalMarks: number;
  grade: string;
  status: ResultStatus;
}

const mockResults: ResultData[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    supervisor: 'Dr. Hassan Ali',
    proposalMarks: 18,
    midDefenseMarks: 42,
    finalDefenseMarks: 85,
    documentationMarks: 38,
    totalMarks: 183,
    grade: 'A',
    status: 'compiled'
  },
  {
    id: '2',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    supervisor: 'Dr. Hassan Ali',
    proposalMarks: 19,
    midDefenseMarks: 45,
    finalDefenseMarks: 88,
    documentationMarks: 40,
    totalMarks: 192,
    grade: 'A+',
    status: 'compiled'
  }
];

export function CompileResultsPage() {
  const [results] = useState<ResultData[]>(mockResults);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-600 text-white';
      case 'A':
        return 'bg-green-500 text-white';
      case 'B':
        return 'bg-blue-500 text-white';
      case 'C':
        return 'bg-yellow-500 text-white';
      case 'F':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: ResultStatus) => {
    switch (status) {
      case 'compiled':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'approved':
        return 'bg-blue-500 text-white';
      case 'published':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compile Results</h1>
          <p className="text-gray-600 mt-1">Aggregate and compile final FYP results</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-[#FF8C00] text-[#FF8C00]"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Compile All Results
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{results.length}</p>
            </div>
            <User className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compiled</p>
              <p className="text-2xl font-bold text-green-600">
                {results.filter(r => r.status === 'compiled').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Marks</p>
              <p className="text-2xl font-bold text-[#FF8C00]">
                {Math.round(results.reduce((sum, r) => sum + r.totalMarks, 0) / results.length)}
              </p>
            </div>
            <Award className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round((results.filter(r => r.grade !== 'F').length / results.length) * 100)}%
              </p>
            </div>
            <Award className="h-8 w-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Roll Number</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Proposal</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Mid Defense</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Final Defense</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Documentation</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{result.studentName}</p>
                      <p className="text-xs text-gray-500">{result.supervisor}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{result.rollNumber}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900">{result.proposalMarks}/20</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900">{result.midDefenseMarks}/50</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900">{result.finalDefenseMarks}/90</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900">{result.documentationMarks}/40</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-base font-bold text-[#FF8C00]">{result.totalMarks}/200</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge className={getGradeColor(result.grade)}>
                      {result.grade}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grade Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
        <div className="grid grid-cols-5 gap-4">
          {['A+', 'A', 'B', 'C', 'F'].map((grade) => {
            const count = results.filter(r => r.grade === grade).length;
            const percentage = (count / results.length) * 100;
            return (
              <div key={grade} className="text-center">
                <div className="mb-2">
                  <Badge className={getGradeColor(grade) + ' text-lg px-4 py-2'}>
                    {grade}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500">{percentage.toFixed(0)}%</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
