import { Card } from '../../components/ui/Card';
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HODDashboardPage() {
  const stats = {
    totalProjects: 120,
    completedDefenses: 95,
    pendingApprovals: 8,
    publishedResults: 87
  };

  const recentActivities = [
    { id: '1', action: '12 results approved for publication', time: '2 hours ago', type: 'success' },
    { id: '2', action: 'New appeal submitted by student', time: '4 hours ago', type: 'warning' },
    { id: '3', action: 'Escalation resolved by coordinator', time: '1 day ago', type: 'info' },
    { id: '4', action: 'Supervisor workload report generated', time: '2 days ago', type: 'success' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HOD Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of FYP program management and key metrics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/hod/analytics">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                <p className="text-xs text-gray-500 mt-1">View analytics</p>
              </div>
              <FileText className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </Link>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Defenses</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedDefenses}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Link to="/hod/result-approval">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
                <p className="text-xs text-gray-500 mt-1">Review results</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </Card>
        </Link>

        <Link to="/hod/publish-results">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published Results</p>
                <p className="text-2xl font-bold text-blue-600">{stats.publishedResults}</p>
                <p className="text-xs text-gray-500 mt-1">Publish more</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activities */}
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
    </div>
  );
}
