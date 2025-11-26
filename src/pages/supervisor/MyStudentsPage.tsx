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
  const [filter, setFilter] = useState<'all' | 'on-track' | 'at-risk' | 'delayed'>('all');

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

  const filteredStudents = filter === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your supervised students</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
            </div>
            <User className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Track</p>
              <p className="text-2xl font-bold text-green-600">
                {mockStudents.filter(s => s.status === 'on-track').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockStudents.filter(s => s.status === 'at-risk').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delayed</p>
              <p className="text-2xl font-bold text-red-600">
                {mockStudents.filter(s => s.status === 'delayed').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['all', 'on-track', 'at-risk', 'delayed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as typeof filter)}
            className={`px-4 py-2 font-medium transition-colors capitalize ${
              filter === status
                ? 'text-[#FF8C00] border-b-2 border-[#FF8C00]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {status.replace('-', ' ')} ({status === 'all' ? mockStudents.length : mockStudents.filter(s => s.status === status).length})
          </button>
        ))}
      </div>

      {/* Students List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.rollNumber}</p>
                  <Badge className={`${getStatusColor(student.status)} text-white mt-2`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(student.status)}
                      {student.status.replace('-', ' ')}
                    </span>
                  </Badge>
                </div>
              </div>
              <Button className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Project Title</h4>
              <p className="text-gray-600">{student.projectTitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-[#FF8C00]" />
                <a href={`mailto:${student.email}`} className="hover:text-[#FF8C00] truncate">
                  {student.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-[#FF8C00]" />
                {student.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-[#FF8C00]" />
                Last: {new Date(student.lastSubmission).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-semibold text-[#FF8C00]">{student.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#FF8C00] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Logs</span>
                <Badge className={student.monthlyLogsSubmitted === student.totalMonthlyLogs ? 'bg-green-500' : 'bg-yellow-500'}>
                  {student.monthlyLogsSubmitted}/{student.totalMonthlyLogs}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Deadline</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(student.nextDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
