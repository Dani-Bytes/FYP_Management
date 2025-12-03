import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { User, Mail, Phone, Calendar, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  projectTitle: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  progress: number;
  lastSubmission: string;
  nextDeadline: string;
  monthlyLogsSubmitted: number;
  totalMonthlyLogs: number;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    rollNumber: '01-131201-003',
    email: 'ahmed.khan@student.bahria.edu.pk',
    phone: '+92-300-1234567',
    projectTitle: 'AI-Powered Student Performance Prediction System',
    status: 'on-track',
    progress: 75,
    lastSubmission: '2024-02-18',
    nextDeadline: '2024-03-01',
    monthlyLogsSubmitted: 3,
    totalMonthlyLogs: 3
  },
  {
    id: '2',
    name: 'Fatima Ali',
    rollNumber: '01-131201-012',
    email: 'fatima.ali@student.bahria.edu.pk',
    phone: '+92-301-2345678',
    projectTitle: 'E-Commerce Platform with Recommendation Engine',
    status: 'on-track',
    progress: 80,
    lastSubmission: '2024-02-20',
    nextDeadline: '2024-02-28',
    monthlyLogsSubmitted: 3,
    totalMonthlyLogs: 3
  },
  {
    id: '3',
    name: 'Hassan Raza',
    rollNumber: '01-131201-024',
    email: 'hassan.raza@student.bahria.edu.pk',
    phone: '+92-302-3456789',
    projectTitle: 'IoT-Based Smart Home Automation System',
    status: 'at-risk',
    progress: 55,
    lastSubmission: '2024-02-10',
    nextDeadline: '2024-02-25',
    monthlyLogsSubmitted: 2,
    totalMonthlyLogs: 3
  },
  {
    id: '4',
    name: 'Ayesha Malik',
    rollNumber: '01-131201-035',
    email: 'ayesha.malik@student.bahria.edu.pk',
    phone: '+92-303-4567890',
    projectTitle: 'Blockchain-Based Voting System',
    status: 'delayed',
    progress: 40,
    lastSubmission: '2024-01-28',
    nextDeadline: '2024-02-22',
    monthlyLogsSubmitted: 1,
    totalMonthlyLogs: 3
  }
];

export function MyStudentsPage() {
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'at-risk':
        return 'bg-yellow-500';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="h-4 w-4" />;
      case 'at-risk':
        return <Clock className="h-4 w-4" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredStudents = (() => {
    let filtered = mockStudents;
    
    if (selectedStatus === 'On Track') {
      filtered = filtered.filter(s => s.status === 'on-track');
    } else if (selectedStatus === 'At Risk') {
      filtered = filtered.filter(s => s.status === 'at-risk');
    } else if (selectedStatus === 'Delayed') {
      filtered = filtered.filter(s => s.status === 'delayed');
    }
    
    return filtered;
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your supervised students</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">On Track</p>
          <p className="text-2xl font-bold text-green-600">
            {mockStudents.filter(s => s.status === 'on-track').length}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">At Risk</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockStudents.filter(s => s.status === 'at-risk').length}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-600">Delayed</p>
          <p className="text-2xl font-bold text-red-600">
            {mockStudents.filter(s => s.status === 'delayed').length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">MY STUDENTS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Semester:</label>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option>All Semesters</option>
              <option>7th Semester</option>
              <option>8th Semester</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Status:</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            >
              <option>All Status</option>
              <option>On Track</option>
              <option>At Risk</option>
              <option>Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Info</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Monthly Logs</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF8C00] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-900">{student.projectTitle}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-[#FF8C00]" />
                        <a href={`mailto:${student.email}`} className="hover:text-[#FF8C00] truncate">
                          {student.email.split('@')[0]}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Phone className="h-3 w-3 text-[#FF8C00]" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">Progress</span>
                        <span className="text-xs font-semibold text-[#FF8C00]">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#FF8C00] h-2 rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        Last: {new Date(student.lastSubmission).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Badge className={student.monthlyLogsSubmitted === student.totalMonthlyLogs ? 'bg-green-500 text-white border-green-500' : 'bg-yellow-500 text-white border-yellow-500'}>
                      {student.monthlyLogsSubmitted}/{student.totalMonthlyLogs}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">Submitted</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={`${getStatusColor(student.status)} text-white`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(student.status)}
                        {student.status.replace('-', ' ')}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Button size="sm" className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
