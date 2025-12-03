import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart3, TrendingUp, Users, Award, Calendar, FileText, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');

  const stats = {
    totalProjects: 120,
    passRate: 95,
    averageGrade: 'B+',
    completionRate: 98,
    totalSupervisors: 15,
    totalEvaluators: 8,
    avgProjectsPerSupervisor: 8,
    lateSubmissions: 9
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

  const supervisorPerformance = [
    { name: 'Dr. Hassan Ali', students: 12, avgGrade: 'A', passRate: 100 },
    { name: 'Dr. Sara Ahmed', students: 10, avgGrade: 'A-', passRate: 100 },
    { name: 'Dr. Imran Shah', students: 8, avgGrade: 'B+', passRate: 95 },
    { name: 'Dr. Ali Raza', students: 9, avgGrade: 'B', passRate: 89 },
    { name: 'Dr. Ayesha Khan', students: 7, avgGrade: 'A', passRate: 100 }
  ];

  const monthlySubmissions = [
    { month: 'Jan', proposals: 45, midDefense: 0, final: 0 },
    { month: 'Feb', proposals: 38, midDefense: 42, final: 0 },
    { month: 'Mar', proposals: 12, midDefense: 38, final: 35 },
    { month: 'Apr', proposals: 0, midDefense: 15, final: 40 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive analytics and insights for FYP program</p>
        </div>
        <Button className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="2024">Academic Year 2024</option>
            <option value="2023">Academic Year 2023</option>
            <option value="2022">Academic Year 2022</option>
          </select>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Semesters</option>
            <option value="fall">Fall Semester</option>
            <option value="spring">Spring Semester</option>
          </select>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last year</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-green-600">{stats.passRate}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 3% from last year</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{stats.averageGrade}</p>
              <p className="text-xs text-gray-500 mt-1">Avg: 78.5/100</p>
            </div>
            <Award className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
              <p className="text-xs text-blue-600 mt-1">118 of 120 completed</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Supervisors</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSupervisors}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Evaluators</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.totalEvaluators}</p>
            </div>
            <FileText className="h-8 w-8 text-indigo-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Load/Supervisor</p>
              <p className="text-2xl font-bold text-blue-600">{stats.avgProjectsPerSupervisor}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late Submissions</p>
              <p className="text-2xl font-bold text-red-600">{stats.lateSubmissions}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
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
