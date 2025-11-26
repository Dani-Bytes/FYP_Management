import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Users, FileText, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CoordinatorDashboardPage() {
  const stats = {
    totalStudents: 120,
    activeProjects: 115,
    upcomingDefenses: 12,
    pendingApprovals: 8
  };

  const recentActivities = [
    { id: '1', action: 'Defense schedule created for 12 students', time: '2 hours ago', type: 'success' },
    { id: '2', action: 'Room booking confirmed for Defense Hall A', time: '4 hours ago', type: 'info' },
    { id: '3', action: 'New announcement posted about submission deadline', time: '1 day ago', type: 'warning' },
    { id: '4', action: 'Results compiled for 45 students', time: '2 days ago', type: 'success' }
  ];

  const upcomingTasks = [
    { id: '1', task: 'Review defense schedule submissions', deadline: '2024-02-25', priority: 'high' },
    { id: '2', task: 'Approve room booking requests', deadline: '2024-02-26', priority: 'medium' },
    { id: '3', task: 'Compile final year results', deadline: '2024-02-28', priority: 'critical' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FYP Coordinator Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of coordination activities and pending tasks</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Link to="/coordinator/defense-schedule">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Defenses</p>
                <p className="text-2xl font-bold text-blue-600">{stats.upcomingDefenses}</p>
                <p className="text-xs text-gray-500 mt-1">Manage schedule</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
        </Link>

        <Link to="/coordinator/announcements">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeProjects}</p>
                <p className="text-xs text-gray-500 mt-1">Post updates</p>
              </div>
              <FileText className="h-8 w-8 text-green-400" />
            </div>
          </Card>
        </Link>

        <Link to="/coordinator/penalties">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Actions</p>
                <p className="text-2xl font-bold text-[#FF8C00]">{stats.pendingApprovals}</p>
                <p className="text-xs text-gray-500 mt-1">Review compliance</p>
              </div>
              <AlertCircle className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activities and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={
                    task.priority === 'critical' ? 'bg-red-500 text-white' :
                    task.priority === 'high' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{task.task}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
