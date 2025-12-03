import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { 
  Calendar, 
  Clock, 
  AlertCircle,
  Bell,
  FileText
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function StudentDashboardPage() {
  // Mock student data
  const studentStats = {
    totalSubmissions: 8,
    pendingSubmissions: 2,
    completedSubmissions: 6,
    upcomingDefenses: 1,
    monthlyLogsSubmitted: 2,
    unreadAnnouncements: 2,
    overallProgress: 65
  };

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'System Design Document',
      dueDate: '2024-03-15',
      type: 'assignment',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Monthly Log - February',
      dueDate: '2024-02-29',
      type: 'log',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Final Defense',
      dueDate: '2024-03-25',
      type: 'defense',
      priority: 'urgent'
    }
  ];

  const recentAnnouncements = [
    {
      id: '1',
      title: 'Final Defense Schedule Released',
      date: '2024-02-20',
      type: 'urgent'
    },
    {
      id: '2',
      title: 'Documentation Submission Reminder',
      date: '2024-02-18',
      type: 'warning'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your FYP progress overview</p>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall FYP Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-[#FF8C00] h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
            style={{ width: `${studentStats.overallProgress}%` }}
          >
            <span className="text-white text-sm font-semibold">{studentStats.overallProgress}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          You're making great progress! Keep up the good work.
        </p>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/student/submissions">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">{studentStats.pendingSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">Click to submit work</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </Card>
        </Link>

        <Link to="/student/defense-schedule">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Defenses</p>
                <p className="text-2xl font-bold text-[#FF8C00]">{studentStats.upcomingDefenses}</p>
                <p className="text-xs text-gray-500 mt-1">View schedule</p>
              </div>
              <Calendar className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </Link>

        <Link to="/student/announcements">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Announcements</p>
                <p className="text-2xl font-bold text-red-600">{studentStats.unreadAnnouncements}</p>
                <p className="text-xs text-gray-500 mt-1">Read updates</p>
              </div>
              <Bell className="h-8 w-8 text-red-400" />
            </div>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Link to="/student/submissions" className="text-sm text-[#FF8C00] hover:text-[#cc7000]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                    <Badge className={`${getPriorityColor(deadline.priority)} text-white text-xs`}>
                      {deadline.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-3">
                  {deadline.type === 'assignment' && <FileText className="h-5 w-5 text-blue-500" />}
                  {deadline.type === 'log' && <Clock className="h-5 w-5 text-yellow-500" />}
                  {deadline.type === 'defense' && <Calendar className="h-5 w-5 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
            <Link to="/student/announcements" className="text-sm text-[#FF8C00] hover:text-[#cc7000]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-orange-50 border-l-4 border-[#FF8C00] rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-[#FF8C00] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
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
