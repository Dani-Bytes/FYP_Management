import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Bell
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function SupervisorDashboardPage() {
  const stats = {
    totalStudents: 8,
    onTrack: 5,
    atRisk: 2,
    delayed: 1,
    pendingReviews: 4,
    upcomingDefenses: 2,
    monthlyLogsToReview: 3,
    escalatedIssues: 0
  };

  const recentSubmissions = [
    {
      id: '1',
      studentName: 'Ahmed Khan',
      title: 'February Progress Log',
      submittedDate: '2024-02-20',
      type: 'monthly-log',
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'Fatima Ali',
      title: 'System Design Document',
      submittedDate: '2024-02-19',
      type: 'document',
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'Hassan Raza',
      title: 'Literature Review',
      submittedDate: '2024-02-18',
      type: 'assignment',
      status: 'pending'
    }
  ];

  const upcomingDefenses = [
    {
      id: '1',
      studentName: 'Ahmed Khan',
      type: 'Final Defense',
      date: '2024-03-25',
      time: '10:00 AM'
    },
    {
      id: '2',
      studentName: 'Fatima Ali',
      type: 'Interim Defense',
      date: '2024-03-15',
      time: '2:00 PM'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your supervised students and pending tasks</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/supervisor/my-students">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </Link>

        <Link to="/supervisor/pending-reviews">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </Card>
        </Link>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Track</p>
              <p className="text-2xl font-bold text-green-600">{stats.onTrack}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Need Attention</p>
              <p className="text-2xl font-bold text-red-600">{stats.atRisk + stats.delayed}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
            <Link to="/supervisor/pending-reviews" className="text-sm text-[#FF8C00] hover:text-[#cc7000]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{submission.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {submission.studentName} • {new Date(submission.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge className="bg-orange-500 text-white ml-2">
                  {submission.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Defenses */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Defenses</h3>
            <Bell className="h-5 w-5 text-[#FF8C00]" />
          </div>
          <div className="space-y-3">
            {upcomingDefenses.map((defense) => (
              <div key={defense.id} className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{defense.studentName}</h4>
                    <p className="text-xs text-gray-600 mt-1">{defense.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(defense.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600">{defense.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
