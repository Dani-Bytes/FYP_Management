import { Card } from '../../components/ui/Card';
import { Calendar, Users, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EvaluatorDashboardPage() {
  const stats = {
    assignedDefenses: 12,
    completedEvaluations: 8,
    pendingEvaluations: 4,
    averageScore: 78
  };

  const upcomingDefenses = [
    {
      id: '1',
      studentName: 'Ahmed Khan',
      projectTitle: 'AI-Powered Learning Management System',
      date: '2024-02-25',
      time: '10:00 AM',
      room: 'Defense Hall A'
    },
    {
      id: '2',
      studentName: 'Fatima Ali',
      projectTitle: 'Blockchain-Based Supply Chain Management',
      date: '2024-02-25',
      time: '11:30 AM',
      room: 'Defense Hall A'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evaluator Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your defense evaluations and schedule</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/evaluator/defense-schedule">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned Defenses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.assignedDefenses}</p>
                <p className="text-xs text-gray-500 mt-1">View schedule</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedEvaluations}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Link to="/evaluator/evaluations">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-[#FF8C00]">{stats.pendingEvaluations}</p>
                <p className="text-xs text-gray-500 mt-1">Submit evaluations</p>
              </div>
              <FileText className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </Link>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-blue-600">{stats.averageScore}%</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Upcoming Defenses */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Defenses</h2>
        <div className="space-y-3">
          {upcomingDefenses.map((defense) => (
            <div key={defense.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{defense.studentName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{defense.projectTitle}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(defense.date).toLocaleDateString()}
                    </span>
                    <span>{defense.time}</span>
                    <span>{defense.room}</span>
                  </div>
                </div>
                <Link to="/evaluator/evaluations">
                  <button className="px-4 py-2 text-sm border border-[#FF8C00] text-[#FF8C00] rounded hover:bg-orange-50 transition-colors">
                    Evaluate
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
