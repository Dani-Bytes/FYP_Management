import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, Users, Save, Download, Upload, Search, RefreshCw } from 'lucide-react';

interface DefenseSchedule {
  id: string;
  groupNumber: string;
  students: string[]; // Multiple students per group
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
  },
  {
    id: '4',
    groupNumber: 'G-004',
    students: ['Ayesha Malik', 'Zainab Khan'],
    rollNumbers: ['01-131201-030', '01-131201-031'],
    projectTitle: 'Mobile Health Monitoring App',
    supervisor: 'Dr. Usman Khan',
    date: '',
    timeSlot: '',
    room: '',
    internalEvaluator: '',
    externalEvaluator: '',
    status: 'incomplete'
  }
];

// Available options for dropdowns
const availableTimeSlots = [
  '09:00 AM - 09:45 AM',
  '10:00 AM - 10:45 AM',
  '11:00 AM - 11:45 AM',
  '12:00 PM - 12:45 PM',
  '02:00 PM - 02:45 PM',
  '03:00 PM - 03:45 PM',
  '04:00 PM - 04:45 PM'
];

const availableRooms = [
  'Lab 301',
  'Lab 302',
  'Lab 303',
  'Room A-101',
  'Room A-102',
  'Conference Room'
];

const availableInternalEvaluators = [
  'Dr. Hassan Ali',
  'Dr. Sara Ahmed', 
  'Dr. Imran Shah',
  'Dr. Zainab Malik',
  'Dr. Usman Khan'
];

const availableExternalEvaluators = [
  'Mr. Kashif Ahmed (Industry Expert)',
  'Dr. Ayesha Farooq (External University)',
  'Eng. Bilal Hassan (Industry Professional)',
  'Dr. Maria Khan (External Faculty)'
];

export function DefenseSchedulePage() {
  const [schedules, setSchedules] = useState<DefenseSchedule[]>(mockSchedules);
  const [searchQuery, setSearchQuery] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleCellChange = (id: string, field: keyof DefenseSchedule, value: string) => {
    setSchedules(schedules.map(schedule => {
      if (schedule.id === id) {
        const updated = { ...schedule, [field]: value };
        // Auto-update status
        updated.status = (updated.date && updated.timeSlot && updated.room && 
                         updated.internalEvaluator && updated.externalEvaluator) 
                         ? 'complete' : 'incomplete';
        return updated;
      }
      return schedule;
    }));
    setUnsavedChanges(true);
  };

  const handleSaveAll = () => {
    // Save to backend
    alert('All changes saved successfully!');
    setUnsavedChanges(false);
  };

  const handleExportToExcel = () => {
    alert('Exporting schedule to Excel file...');
  };

  const handleImportFromExcel = () => {
    alert('Import Excel file with student/supervisor data...');
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.groupNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.students.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    schedule.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.supervisor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: schedules.length,
    complete: schedules.filter(s => s.status === 'complete').length,
    incomplete: schedules.filter(s => s.status === 'incomplete').length,
    needsEvaluators: schedules.filter(s => !s.internalEvaluator || !s.externalEvaluator).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Defense Schedule - Excel View</h1>
          <p className="text-gray-600 mt-1">Assign evaluators and time slots (Click cells to edit)</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleImportFromExcel}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Excel
          </Button>
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:bg-opacity-10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Button
            onClick={handleSaveAll}
            className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
            disabled={!unsavedChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            {unsavedChanges ? 'Save Changes' : 'All Saved'}
          </Button>
        </div>
      </div>

      {/* Statistics */}
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

      {/* Search Bar */}
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

      {/* Excel-like Grid */}
      <Card className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">
                  Group #
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">
                  Students (Roll #)
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">
                  Project Title
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">
                  Supervisor
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">
                  Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">
                  Time Slot
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-blue-100">
                  Room
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-yellow-100">
                  Internal Evaluator
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-yellow-100">
                  External Evaluator
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 border border-gray-300 bg-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  {/* Group Number - Read Only */}
                  <td className="px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 bg-gray-50">
                    {schedule.groupNumber}
                  </td>

                  {/* Students - Read Only */}
                  <td className="px-3 py-2 text-sm border border-gray-300 bg-gray-50">
                    {schedule.students.map((student, idx) => (
                      <div key={idx} className="text-gray-900">
                        {student}
                        <span className="text-gray-500 text-xs ml-1">({schedule.rollNumbers[idx]})</span>
                      </div>
                    ))}
                  </td>

                  {/* Project Title - Read Only */}
                  <td className="px-3 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 max-w-xs">
                    <div className="truncate" title={schedule.projectTitle}>{schedule.projectTitle}</div>
                  </td>

                  {/* Supervisor - Read Only */}
                  <td className="px-3 py-2 text-sm text-gray-700 border border-gray-300 bg-gray-50">
                    {schedule.supervisor}
                  </td>

                  {/* Date - Editable */}
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <input
                      type="date"
                      value={schedule.date}
                      onChange={(e) => handleCellChange(schedule.id, 'date', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    />
                  </td>

                  {/* Time Slot - Editable Dropdown */}
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <select
                      value={schedule.timeSlot}
                      onChange={(e) => handleCellChange(schedule.id, 'timeSlot', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select slot...</option>
                      {availableTimeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </td>

                  {/* Room - Editable Dropdown */}
                  <td className="px-0 py-0 border border-gray-300 bg-blue-50">
                    <select
                      value={schedule.room}
                      onChange={(e) => handleCellChange(schedule.id, 'room', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select room...</option>
                      {availableRooms.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </td>

                  {/* Internal Evaluator - Editable Dropdown */}
                  <td className="px-0 py-0 border border-gray-300 bg-yellow-50">
                    <select
                      value={schedule.internalEvaluator}
                      onChange={(e) => handleCellChange(schedule.id, 'internalEvaluator', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select evaluator...</option>
                      {availableInternalEvaluators.map(evaluator => (
                        <option key={evaluator} value={evaluator}>{evaluator}</option>
                      ))}
                    </select>
                  </td>

                  {/* External Evaluator - Editable Dropdown */}
                  <td className="px-0 py-0 border border-gray-300 bg-yellow-50">
                    <select
                      value={schedule.externalEvaluator}
                      onChange={(e) => handleCellChange(schedule.id, 'externalEvaluator', e.target.value)}
                      className="w-full h-full px-3 py-2 text-sm border-0 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:ring-inset"
                    >
                      <option value="">Select evaluator...</option>
                      {availableExternalEvaluators.map(evaluator => (
                        <option key={evaluator} value={evaluator}>{evaluator}</option>
                      ))}
                    </select>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2 border border-gray-300 text-center">
                    <Badge className={schedule.status === 'complete' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                    }>
                      {schedule.status === 'complete' ? '✓ Complete' : '⚠ Incomplete'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Legend */}
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
          <Button
            onClick={handleSaveAll}
            className="bg-[#FF8C00] hover:bg-[#cc7000] text-white ml-4"
          >
            Save Now
          </Button>
        </div>
      )}
    </div>
  );
}
