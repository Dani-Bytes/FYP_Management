import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Calendar, MapPin, Clock, User, Users, Save, Download, Upload, Search, RefreshCw } from 'lucide-react';
import { mockDefenses } from '../../utils/mockData';

interface DefenseSchedule {
  id: string;
  groupNumber: string;
  students: string[];
  rollNumbers: string[];
  projectTitle: string;
  supervisor: string;
  date: string;
  timeSlot: string;
  room: string;
  internalEvaluator: string;
  externalEvaluator: string;
  status: 'complete' | 'incomplete';
}

const mockSchedules: DefenseSchedule[] = [
  {
    id: '1',
    groupNumber: 'G-001',
    students: ['Ahmed Khan', 'Ali Raza'],
    rollNumbers: ['01-131201-003', '01-131201-004'],
    projectTitle: 'AI-Powered Learning Management System',
    supervisor: 'Dr. Hassan Ali',
    date: '2024-02-25',
    timeSlot: '',
    room: '',
    internalEvaluator: '',
    externalEvaluator: '',
    status: 'incomplete'
  },
  {
    id: '2',
    groupNumber: 'G-002',
    students: ['Fatima Ali', 'Sara Ahmed'],
    rollNumbers: ['01-131201-012', '01-131201-013'],
    projectTitle: 'Blockchain-Based Supply Chain Management',
    supervisor: 'Dr. Hassan Ali',
    date: '2024-02-25',
    timeSlot: '10:00 AM - 10:45 AM',
    room: 'Lab 301',
    internalEvaluator: 'Dr. Imran Shah',
    externalEvaluator: '',
    status: 'incomplete'
  },
  {
    id: '3',
    groupNumber: 'G-003',
    students: ['Hassan Raza'],
    rollNumbers: ['01-131201-024'],
    projectTitle: 'IoT-Based Smart Home System',
    supervisor: 'Dr. Sara Ahmed',
    date: '2024-02-26',
    timeSlot: '11:00 AM - 11:45 AM',
    room: 'Lab 302',
    internalEvaluator: 'Dr. Zainab Malik',
    externalEvaluator: 'Mr. Kashif Ahmed',
    status: 'complete'
  }
];

const availableTimeSlots = ['09:00 AM - 09:45 AM', '10:00 AM - 10:45 AM', '11:00 AM - 11:45 AM', '12:00 PM - 12:45 PM', '02:00 PM - 02:45 PM', '03:00 PM - 03:45 PM', '04:00 PM - 04:45 PM'];
const availableRooms = ['Lab 301', 'Lab 302', 'Lab 303', 'Room A-101', 'Room A-102', 'Conference Room'];
const availableInternalEvaluators = ['Dr. Hassan Ali', 'Dr. Sara Ahmed', 'Dr. Imran Shah', 'Dr. Zainab Malik', 'Dr. Usman Khan'];
const availableExternalEvaluators = ['Mr. Kashif Ahmed (Industry Expert)', 'Dr. Ayesha Farooq (External University)', 'Eng. Bilal Hassan (Industry Professional)', 'Dr. Maria Khan (External Faculty)'];

export const DefenseSchedulePage: React.FC = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<DefenseSchedule[]>(mockSchedules);
  const [searchQuery, setSearchQuery] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleCellChange = (id: string, field: keyof DefenseSchedule, value: string) => {
    setSchedules(schedules.map(schedule => {
      if (schedule.id === id) {
        const updated = { ...schedule, [field]: value };
        updated.status = (updated.date && updated.timeSlot && updated.room && updated.internalEvaluator && updated.externalEvaluator) ? 'complete' : 'incomplete';
        return updated;
      }
      return schedule;
    }));
    setUnsavedChanges(true);
  };

  const handleSaveAll = () => {
    alert('All changes saved successfully!');
    setUnsavedChanges(false);
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.groupNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.students.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    schedule.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Student View - Read-only defense schedule
  if (user?.role === 'student') {
    const upcomingDefenses = mockDefenses.filter(d => d.status === 'scheduled');
    const completedDefenses = mockDefenses.filter(d => d.status === 'completed');

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Defense Schedule</h1>
          <p className="text-gray-600 mt-1">View your scheduled defenses and results</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Upcoming Defenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDefenses.length > 0 ? (
              <div className="space-y-4">
                {upcomingDefenses.map((defense) => (
                  <div key={defense.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-800 text-base">{defense.projectTitle}</h4>
                          <Badge variant={defense.type === 'proposal' ? 'info' : defense.type === 'interim' ? 'warning' : 'success'} className="text-xs">
                            {defense.type} Defense
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="text-blue-600 shrink-0" size={16} />
                            <span><strong>Date:</strong> {defense.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="text-blue-600 shrink-0" size={16} />
                            <span><strong>Time:</strong> {defense.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="text-blue-600 shrink-0" size={16} />
                            <span><strong>Venue:</strong> {defense.room}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="text-blue-600 shrink-0" size={16} />
                            <span><strong>Evaluators:</strong> {defense.evaluatorNames.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="primary">Download Schedule</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto mb-3 text-gray-400" size={48} />
                <p>No upcoming defenses scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>

        {completedDefenses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                <span>Completed Defenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedDefenses.map((defense) => (
                  <div key={defense.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-800">{defense.projectTitle}</h4>
                          <Badge variant="neutral" className="text-xs">{defense.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Date: {defense.date.toLocaleDateString()} • {defense.time} • {defense.room}
                        </p>
                        {defense.score && (
                          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                            <p className="text-sm font-medium text-green-900">Score: {defense.score}/100</p>
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="outline">View Evaluation</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Defense Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <p>Arrive at least 15 minutes before your scheduled time</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <p>Prepare a 15-20 minute presentation covering your project objectives, methodology, and results</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <p>Be ready for Q&A session following your presentation</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <p>Bring all required documentation (printed proposal/report, project demo if applicable)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">5.</span>
                <p>Dress formally - business attire is required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Evaluator View - View and submit evaluations
  if (user?.role === 'evaluator') {
    const stats = {
      scheduled: mockSchedules.filter(s => s.status === 'complete').length,
      completed: 0,
      total: mockSchedules.length
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Defense Schedule</h1>
          <p className="text-gray-600 mt-1">Your assigned defense evaluations schedule</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assigned</p>
                <p className="text-2xl font-bold text-[#FF8C00]">{stats.total}</p>
              </div>
              <User className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {mockSchedules.filter(s => s.status === 'complete').map((defense) => (
            <Card key={defense.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{defense.students.join(', ')}</h3>
                    <Badge className="bg-blue-500 text-white">scheduled</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{defense.rollNumbers.join(', ')}</p>
                  <p className="text-base font-medium text-gray-900 mb-4">{defense.projectTitle}</p>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Date
                      </p>
                      <p className="text-sm font-medium text-gray-900">{new Date(defense.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time
                      </p>
                      <p className="text-sm font-medium text-gray-900">{defense.timeSlot}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Room
                      </p>
                      <p className="text-sm font-medium text-gray-900">{defense.room}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Supervisor
                      </p>
                      <p className="text-sm font-medium text-gray-900">{defense.supervisor}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="border-[#FF8C00] text-[#FF8C00] ml-4">
                  Submit Evaluation
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Coordinator View - Excel-like grid for scheduling
  const stats = {
    total: schedules.length,
    complete: schedules.filter(s => s.status === 'complete').length,
    incomplete: schedules.filter(s => s.status === 'incomplete').length,
    needsEvaluators: schedules.filter(s => !s.internalEvaluator || !s.externalEvaluator).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Defense Schedule - Excel View</h1>
          <p className="text-gray-600 mt-1">Assign evaluators and time slots (Click cells to edit)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Import Excel
          </Button>
          <Button variant="outline" className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:bg-opacity-10">
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Button onClick={handleSaveAll} className="bg-[#FF8C00] hover:bg-[#cc7000] text-white" disabled={!unsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            {unsavedChanges ? 'Save Changes' : 'All Saved'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fully Scheduled</p>
              <p className="text-2xl font-bold text-green-600">{stats.complete}</p>
            </div>
            <Clock className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Incomplete</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.incomplete}</p>
            </div>
            <RefreshCw className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Evaluators</p>
              <p className="text-2xl font-bold text-red-600">{stats.needsEvaluators}</p>
            </div>
            <Users className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by group number, student name, project, or supervisor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          />
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">Group #</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">Students (Roll #)</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">Project Title</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">Supervisor</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">Date</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">Time Slot</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">Room</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-yellow-100">Internal Evaluator</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-yellow-100">External Evaluator</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 bg-gray-50">{schedule.groupNumber}</td>
                  <td className="px-3 py-2 text-sm border border-gray-300 bg-gray-50">
                    {schedule.students.map((student, idx) => (
                      <div key={idx} className="text-gray-900">
                        {student}
                        <span className="text-gray-500 text-xs ml-1">({schedule.rollNumbers[idx]})</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 max-w-xs">
                    <div className="truncate" title={schedule.projectTitle}>{schedule.projectTitle}</div>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-700 border border-gray-300 bg-gray-50">{schedule.supervisor}</td>
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <input
                      type="date"
                      value={schedule.date}
                      onChange={(e) => handleCellChange(schedule.id, 'date', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    />
                  </td>
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <select
                      value={schedule.timeSlot}
                      onChange={(e) => handleCellChange(schedule.id, 'timeSlot', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select slot...</option>
                      {availableTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                  </td>
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <select
                      value={schedule.room}
                      onChange={(e) => handleCellChange(schedule.id, 'room', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select room...</option>
                      {availableRooms.map(room => <option key={room} value={room}>{room}</option>)}
                    </select>
                  </td>
                  <td className="px-0 py-0 border border-gray-300 bg-yellow-50">
                    <select
                      value={schedule.internalEvaluator}
                      onChange={(e) => handleCellChange(schedule.id, 'internalEvaluator', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select evaluator...</option>
                      {availableInternalEvaluators.map(evaluator => <option key={evaluator} value={evaluator}>{evaluator}</option>)}
                    </select>
                  </td>
                  <td className="px-0 py-0 border border-gray-300 bg-yellow-50">
                    <select
                      value={schedule.externalEvaluator}
                      onChange={(e) => handleCellChange(schedule.id, 'externalEvaluator', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select evaluator...</option>
                      {availableExternalEvaluators.map(evaluator => <option key={evaluator} value={evaluator}>{evaluator}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2 border border-gray-300 text-center">
                    <Badge className={schedule.status === 'complete' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
                      {schedule.status === 'complete' ? '✓ Complete' : '⚠ Incomplete'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300"></div>
            <span>Read-only (Auto-filled)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-gray-300"></div>
            <span>Editable - Schedule Details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-gray-300"></div>
            <span>Editable - Assign Evaluators</span>
          </div>
        </div>
        <p className="font-medium">Showing {filteredSchedules.length} of {schedules.length} groups</p>
      </div>

      {unsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-yellow-100 border-2 border-yellow-500 text-yellow-900 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <RefreshCw className="h-5 w-5" />
          <span className="font-medium">You have unsaved changes</span>
          <Button onClick={handleSaveAll} className="bg-[#FF8C00] hover:bg-[#cc7000] text-white ml-4">
            Save Now
          </Button>
        </div>
      )}
    </div>
  );
};
