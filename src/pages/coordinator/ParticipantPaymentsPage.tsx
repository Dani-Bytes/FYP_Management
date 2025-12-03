import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { User, FileText, Search, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  facultyId: string;
  role: 'supervisor' | 'internal_evaluator' | 'external_evaluator';
  email: string;
  phone: string;
  accountNumber: string;
  accountTitle: string;
  bankName: string;
  ntnNumber: string;
  cnicNumber: string;
  informationStatus: 'complete' | 'pending' | 'incomplete';
}

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'Dr. Hassan Ali',
    facultyId: 'FAC-2024-001',
    role: 'supervisor',
    email: 'hassan.ali@bahria.edu.pk',
    phone: '+92-300-1234567',
    accountNumber: 'PK12 HABB 0012 3456 7890 1234',
    accountTitle: 'Dr. Hassan Ali',
    bankName: 'Habib Bank Limited',
    ntnNumber: '1234567-8',
    cnicNumber: '42101-1234567-1',
    informationStatus: 'complete'
  },
  {
    id: '2',
    name: 'Dr. Sara Ahmed',
    facultyId: 'FAC-2024-002',
    role: 'internal_evaluator',
    email: 'sara.ahmed@bahria.edu.pk',
    phone: '+92-300-2345678',
    accountNumber: 'PK34 UNIL 0023 4567 8901 2345',
    accountTitle: 'Dr. Sara Ahmed',
    bankName: 'United Bank Limited',
    ntnNumber: '2345678-9',
    cnicNumber: '42101-2345678-2',
    informationStatus: 'complete'
  },
  {
    id: '3',
    name: 'Mr. Kashif Ahmed',
    facultyId: 'EXT-2024-001',
    role: 'external_evaluator',
    email: 'kashif.ahmed@techcorp.com',
    phone: '+92-300-3456789',
    accountNumber: '',
    accountTitle: '',
    bankName: '',
    ntnNumber: '',
    cnicNumber: '42101-3456789-3',
    informationStatus: 'incomplete'
  },
  {
    id: '4',
    name: 'Dr. Imran Shah',
    facultyId: 'FAC-2024-003',
    role: 'internal_evaluator',
    email: 'imran.shah@bahria.edu.pk',
    phone: '+92-300-4567890',
    accountNumber: 'PK56 MEZN 0034 5678 9012 3456',
    accountTitle: 'Dr. Imran Shah',
    bankName: 'Meezan Bank',
    ntnNumber: '3456789-0',
    cnicNumber: '42101-4567890-4',
    informationStatus: 'pending'
  }
];

export function ParticipantPaymentsPage() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.facultyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ntnNumber.includes(searchQuery) ||
      p.cnicNumber.includes(searchQuery);
    
    const matchesRole = filterRole === 'all' || p.role === filterRole;
    const matchesStatus = filterStatus === 'all' || p.informationStatus === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: participants.length,
    complete: participants.filter(p => p.informationStatus === 'complete').length,
    pending: participants.filter(p => p.informationStatus === 'pending').length,
    incomplete: participants.filter(p => p.informationStatus === 'incomplete').length
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'supervisor': return 'Supervisor';
      case 'internal_evaluator': return 'Internal Evaluator';
      case 'external_evaluator': return 'External Evaluator';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Participant Payment Information</h1>
          <p className="text-gray-600 mt-1">Collect and export payment details for supervisors and evaluators</p>
        </div>
        <Button
          onClick={() => alert('Exporting participant information to Excel...')}
          className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-[#FF8C00]">{stats.total}</p>
            </div>
            <User className="h-8 w-8 text-[#FF8C00] opacity-60" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Complete Info</p>
              <p className="text-2xl font-bold text-green-600">{stats.complete}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Incomplete Info</p>
              <p className="text-2xl font-bold text-red-600">{stats.incomplete}</p>
            </div>
            <FileText className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, CNIC, or NTN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Roles</option>
            <option value="supervisor">Supervisors</option>
            <option value="internal_evaluator">Internal Evaluators</option>
            <option value="external_evaluator">External Evaluators</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
          >
            <option value="all">All Status</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </Card>

      {/* Participants Table */}
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Faculty ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banking Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredParticipants.map((participant) => (
              <tr key={participant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-[#FF8C00] rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                      <div className="text-sm text-gray-500">{participant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {participant.facultyId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={
                    participant.role === 'supervisor' ? 'bg-blue-500 text-white' :
                    participant.role === 'internal_evaluator' ? 'bg-purple-500 text-white' :
                    'bg-green-500 text-white'
                  }>
                    {getRoleLabel(participant.role)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{participant.phone}</div>
                  <div className="text-gray-500">CNIC: {participant.cnicNumber}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {participant.accountNumber ? (
                    <>
                      <div className="font-mono text-xs">{participant.accountNumber}</div>
                      <div className="text-gray-500">{participant.bankName}</div>
                    </>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {participant.ntnNumber ? (
                    <div className="font-mono">{participant.ntnNumber}</div>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={
                    participant.informationStatus === 'complete' ? 'bg-green-500 text-white' :
                    participant.informationStatus === 'pending' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }>
                    {participant.informationStatus === 'complete' ? '✓ Complete' :
                     participant.informationStatus === 'pending' ? '⏳ Pending' :
                     '⚠ Incomplete'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    onClick={() => {
                      setSelectedParticipant(participant);
                      setShowViewModal(true);
                    }}
                    variant="outline"
                    className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:bg-opacity-10"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal && selectedParticipant !== null}
        onClose={() => setShowViewModal(false)}
        title="Participant Payment Information"
        size="lg"
      >
        {selectedParticipant && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">{selectedParticipant.name}</h3>
              <p className="text-sm text-gray-600">{getRoleLabel(selectedParticipant.role)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Faculty ID</p>
                <p className="text-sm font-medium">{selectedParticipant.facultyId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium">{selectedParticipant.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-medium">{selectedParticipant.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CNIC</p>
                <p className="text-sm font-medium">{selectedParticipant.cnicNumber}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Banking Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Title</p>
                  <p className="text-sm font-medium">
                    {selectedParticipant.accountTitle || <span className="text-red-500">Not provided</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number / IBAN</p>
                  <p className="text-sm font-mono">
                    {selectedParticipant.accountNumber || <span className="text-red-500">Not provided</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                  <p className="text-sm font-medium">
                    {selectedParticipant.bankName || <span className="text-red-500">Not provided</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">NTN (Tax Number)</p>
                  <p className="text-sm font-medium">
                    {selectedParticipant.ntnNumber || <span className="text-red-500">Not provided</span>}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-1">Information Status</p>
              <Badge className={
                selectedParticipant.informationStatus === 'complete' ? 'bg-green-500 text-white' :
                selectedParticipant.informationStatus === 'pending' ? 'bg-yellow-500 text-white' :
                'bg-red-500 text-white'
              }>
                {selectedParticipant.informationStatus === 'complete' ? '✓ Complete' :
                 selectedParticipant.informationStatus === 'pending' ? '⏳ Pending Review' :
                 '⚠ Incomplete Information'}
              </Badge>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
