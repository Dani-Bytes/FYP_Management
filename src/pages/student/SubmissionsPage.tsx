import React, { useState } from 'react';
import { Upload, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const SubmissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'assignments' | 'logs'>('submissions');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Work & Progress</h1>
        <p className="text-gray-600 mt-1">Manage your submissions, assignments, and monthly logs</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        {['submissions', 'assignments', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-[#FF8C00] border-b-2 border-[#FF8C00]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
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

      {/* Content based on active tab */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 capitalize">{activeTab}</h3>
        <div className="space-y-3">
          {activeTab === 'logs' ? (
            // Monthly Logs - 4 auto-created slots per month
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800 mb-4">
                <strong>Note:</strong> 4 slots are automatically created each month. Fill and submit them weekly for supervisor signature.
              </div>
              {['February - Slot 1', 'February - Slot 2', 'February - Slot 3', 'February - Slot 4'].map((slot, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{slot} (Week {i + 1})</h4>
                      <p className="text-sm text-gray-600 mt-1">Due: Feb {(i + 1) * 7}, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {i === 0 ? (
                        <>
                          <Badge className="bg-yellow-500 text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            Awaiting Supervisor Signature
                          </Badge>
                        </>
                      ) : i === 1 ? (
                        <>
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Signed by Supervisor
                          </Badge>
                        </>
                      ) : i === 2 ? (
                        <>
                          <Badge className="bg-blue-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Submitted
                          </Badge>
                        </>
                      ) : (
                        <Button size="sm" className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                          <Upload className="h-4 w-4 mr-1" />
                          Fill Log
                        </Button>
                      )}
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 text-sm text-yellow-800">
                      Your supervisor needs to review and sign this log.
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Submissions and Assignments tabs
            [1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {activeTab === 'submissions' && `Submission Slot ${i}`}
                    {activeTab === 'assignments' && `Assignment ${i}`}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Due: March {i + 10}, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  {i === 1 ? (
                    <Badge className="bg-yellow-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Submitted
                    </Badge>
                  )}
                  {i === 1 && (
                    <Button size="sm" className="bg-[#FF8C00] hover:bg-[#cc7000] text-white">
                      <Upload className="h-4 w-4 mr-1" />
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
