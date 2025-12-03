import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const SubmissionsPage: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('7th Semester');
  const [selectedType, setSelectedType] = useState('Reports & Proposals');

  // Data for 7th Semester
  const semester7Data = [
    {
      id: 1,
      title: 'SRS Document',
      type: 'SRS Documents',
      semester: '7th Semester',
      assignmentFile: 'available',
      submissionFile: 'submitted',
      marksObtained: 'Not marked yet',
      comments: 'View comments available',
      deadline: '12 October 2025 - 11:55 pm',
      submissionDate: '10 October 2025-05:00 pm',
      status: 'exceeded',
    },
    {
      id: 2,
      title: 'Project Proposal',
      type: 'Reports & Proposals',
      semester: '7th Semester',
      assignmentFile: 'available',
      submissionFile: 'submitted',
      marksObtained: 'Not marked yet',
      comments: 'View comments available',
      deadline: '9 November 2025-11:55 pm',
      submissionDate: null,
      status: 'exceeded',
    },
    {
      id: 3,
      title: 'Monthly Log - November',
      type: 'Monthly Logs',
      semester: '7th Semester',
      assignmentFile: 'available',
      submissionFile: null,
      marksObtained: 'Not marked yet',
      comments: 'No comments',
      deadline: '28 November 2025-05:00 pm',
      submissionDate: null,
      status: 'exceeded',
    },
  ];

  // Data for 8th Semester
  const semester8Data = [
    {
      id: 1,
      title: 'Final Report',
      type: 'Reports & Proposals',
      semester: '8th Semester',
      assignmentFile: 'available',
      submissionFile: null,
      marksObtained: 'Not marked yet',
      comments: 'No comments',
      deadline: '9 December 2025-05:00 pm',
      submissionDate: null,
      status: 'open',
    },
    {
      id: 2,
      title: 'Monthly Log - December',
      type: 'Monthly Logs',
      semester: '8th Semester',
      assignmentFile: 'available',
      submissionFile: null,
      marksObtained: 'Not marked yet',
      comments: 'No comments',
      deadline: '15 December 2025-11:55 pm',
      submissionDate: null,
      status: 'open',
    },
    {
      id: 3,
      title: 'Final Defense Presentation',
      type: 'Presentations',
      semester: '8th Semester',
      assignmentFile: 'available',
      submissionFile: null,
      marksObtained: 'Not marked yet',
      comments: 'No comments',
      deadline: '20 December 2025-02:00 pm',
      submissionDate: null,
      status: 'open',
    },
  ];

  // Get data based on selected semester
  const submissionsData = selectedSemester === '7th Semester' ? semester7Data : semester8Data;

  // Get available types based on selected semester
  const availableTypes = selectedSemester === '7th Semester' 
    ? ['All Types', 'Reports & Proposals', 'Monthly Logs', 'SRS Documents', 'Presentations']
    : ['All Types', 'Reports & Proposals', 'Monthly Logs', 'Presentations'];

  // Filter data based on selected type
  const filteredData = selectedType === 'All Types' 
    ? submissionsData 
    : submissionsData.filter(item => item.type === selectedType);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Work & Progress</h1>
        <p className="text-gray-600 mt-1">Manage your submissions, reports, proposals, and monthly logs</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Submitted</p>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Graded</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </Card>
      </div>

      {/* Filters and Table */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">SUBMISSIONS</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-medium whitespace-nowrap">Semester:</label>
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              >
                <option>7th Semester</option>
                <option>8th Semester</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-medium whitespace-nowrap">Type:</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              >
                {availableTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assignment<br/>(Solution File)<br/>Remarks</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Added<br/>Submission</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marks Obtained</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Returned Submission<br/>(Comments)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Deadline</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{submission.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{submission.title}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <button className="flex items-center gap-1 bg-cyan-500 text-white px-3 py-1 rounded text-xs hover:bg-cyan-600">
                          <Download className="h-3 w-3" />
                          Assignment
                        </button>
                        <div className="text-xs text-gray-600">Not available.</div>
                        <button className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                          Hover To View
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {submission.submissionFile ? (
                        <button className="flex items-center gap-1 bg-cyan-500 text-white px-3 py-1 rounded text-xs hover:bg-cyan-600">
                          <Download className="h-3 w-3" />
                          Submission
                        </button>
                      ) : (
                        <span className="text-sm text-gray-600">No Submission</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{submission.marksObtained}</td>
                    <td className="px-4 py-4">
                      <div className="text-center text-xs text-gray-600">---</div>
                      <button className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 w-full mt-1">
                        Hover To View Comments
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      {submission.status === 'exceeded' ? (
                        <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold">
                          Deadline Exceeded
                        </span>
                      ) : (
                        <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                          <Upload className="h-4 w-4" />
                          Submit
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="bg-[#FF8C00] text-white px-2 py-1 rounded text-xs text-center whitespace-nowrap">
                          {submission.deadline.split('-')[0].trim()}
                        </div>
                        <div className="bg-cyan-500 text-white px-2 py-1 rounded text-xs text-center whitespace-nowrap">
                          {submission.deadline.split('-')[1].trim()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
