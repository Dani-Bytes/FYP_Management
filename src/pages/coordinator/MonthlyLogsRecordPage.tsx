import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, User, Download, Search, FileText, CheckCircle } from 'lucide-react';

interface MonthlyLogRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  supervisorName: string;
  month: string;
  slotNumber: number; // 1-4 (4 slots per month)
  year: number;
  submittedDate: string;
  signedDate: string;
  supervisorComments?: string;
}

const mockLogRecords: MonthlyLogRecord[] = [
  {
    id: '1',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    supervisorName: 'Dr. Hassan Ali',
    month: 'February',
    slotNumber: 1,
    year: 2024,
    submittedDate: '2024-02-05',
    signedDate: '2024-02-06',
    supervisorComments: 'Good progress on literature review.'
  },
  {
    id: '2',
    studentName: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    supervisorName: 'Dr. Hassan Ali',
    month: 'February',
    slotNumber: 2,
    year: 2024,
    submittedDate: '2024-02-12',
    signedDate: '2024-02-13',
    supervisorComments: 'Keep up the good work.'
  },
  {
    id: '3',
    studentName: 'Fatima Ali',
    rollNumber: '01-131201-012',
    supervisorName: 'Dr. Hassan Ali',
    month: 'February',
    slotNumber: 1,
    year: 2024,
    submittedDate: '2024-02-04',
    signedDate: '2024-02-05',
    supervisorComments: 'Excellent documentation.'
  },
  {
    id: '4',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    supervisorName: 'Dr. Sara Ahmed',
    month: 'January',
    slotNumber: 3,
    year: 2024,
    submittedDate: '2024-01-18',
    signedDate: '2024-01-20',
  },
  {
    id: '5',
    studentName: 'Hassan Raza',
    rollNumber: '01-131201-024',
    supervisorName: 'Dr. Sara Ahmed',
    month: 'January',
    slotNumber: 4,
    year: 2024,
    submittedDate: '2024-01-25',
    signedDate: '2024-01-26',
    supervisorComments: 'Need to improve time management.'
  }
];

export function MonthlyLogsRecordPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');

  const filteredLogs = mockLogRecords.filter(log => {
    const matchesSearch = 
      log.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.supervisorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMonth = filterMonth === 'all' || log.month === filterMonth;
    
    return matchesSearch && matchesMonth;
  });

  const uniqueMonths = [...new Set(mockLogRecords.map(log => log.month))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monthly Logs - Record Keeping</h1>
        <p className="text-gray-600 mt-1">View all supervisor-signed monthly logs (4 slots per month)</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Signed Logs</p>
              <p className="text-2xl font-bold text-gray-900">{mockLogRecords.length}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-[#FF8C00]">
                {mockLogRecords.filter(l => l.month === 'February').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unique Students</p>
              <p className="text-2xl font-bold text-green-600">
                {new Set(mockLogRecords.map(l => l.rollNumber)).size}
              </p>
            </div>
            <User className="h-8 w-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or supervisor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <div>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option value="all">All Semesters</option>
              <option value="7th">7th Semester</option>
              <option value="8th">8th Semester</option>
            </select>
          </div>
          <div>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option value="all">All Months</option>
              {uniqueMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supervisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                  No signed logs found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.studentName}</div>
                    <div className="text-sm text-gray-500">{log.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.supervisorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.month} {log.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-blue-500 text-white">
                      Slot {log.slotNumber}/4
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(log.submittedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {new Date(log.signedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-600 truncate">
                      {log.supervisorComments || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Signed
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#FF8C00] hover:text-[#cc7000] flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredLogs.length} of {mockLogRecords.length} signed logs
      </div>
    </div>
  );
}
