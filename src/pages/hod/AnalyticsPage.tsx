import { Card } from '../../components/ui/Card';
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';

export function AnalyticsPage() {
  const stats = {
    totalProjects: 120,
    passRate: 95,
    averageGrade: 'B+',
    completionRate: 98
  };

  const gradeDistribution = [
    { grade: 'A+', count: 25, percentage: 21 },
    { grade: 'A', count: 35, percentage: 29 },
    { grade: 'B', count: 40, percentage: 33 },
    { grade: 'C', count: 18, percentage: 15 },
    { grade: 'F', count: 2, percentage: 2 }
  ];

  const domainDistribution = [
    { domain: 'AI & Machine Learning', count: 35, percentage: 29 },
    { domain: 'Web Development', count: 30, percentage: 25 },
    { domain: 'Mobile Apps', count: 25, percentage: 21 },
    { domain: 'Blockchain', count: 15, percentage: 13 },
    { domain: 'IoT', count: 15, percentage: 13 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Program Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive analytics and insights for FYP program</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-green-600">{stats.passRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{stats.averageGrade}</p>
            </div>
            <Award className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
        <div className="space-y-3">
          {gradeDistribution.map((item) => (
            <div key={item.grade}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Grade {item.grade}</span>
                <span className="text-sm text-gray-600">{item.count} students ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#FF8C00] h-3 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Domain Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Domain Distribution</h2>
        <div className="space-y-3">
          {domainDistribution.map((item) => (
            <div key={item.domain}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{item.domain}</span>
                <span className="text-sm text-gray-600">{item.count} projects ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Pass Rate Improvement</span>
              <span className="text-sm font-bold text-green-600">+3%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Average Marks Increase</span>
              <span className="text-sm font-bold text-blue-600">+5 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-700">On-Time Submission Rate</span>
              <span className="text-sm font-bold text-[#FF8C00]">92%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quality Indicators</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Plagiarism-Free Projects</span>
              <span className="text-sm font-bold text-purple-600">98%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Defense Pass Rate</span>
              <span className="text-sm font-bold text-green-600">96%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Supervisor Satisfaction</span>
              <span className="text-sm font-bold text-blue-600">4.2/5</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
