import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { User, DollarSign, CreditCard, FileText, Edit, CheckCircle, AlertCircle, Search, Download } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'supervisor' | 'internal_evaluator' | 'external_evaluator';
  email: string;
  phone: string;
  accountNumber: string;
  bankName: string;
  ntnNumber: string;
  cnicNumber: string;
  defenseCount: number;
  ratePerDefense: number;
  totalAmount: number;
  paymentStatus: 'verified' | 'pending' | 'incomplete';
}

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'Dr. Hassan Ali',
    role: 'supervisor',
    email: 'hassan.ali@bahria.edu.pk',
    phone: '+92-300-1234567',
    accountNumber: 'PK12 HABB 0012 3456 7890 1234',
    bankName: 'Habib Bank Limited',
    ntnNumber: '1234567-8',
    cnicNumber: '42101-1234567-1',
    defenseCount: 5,
    ratePerDefense: 3000,
    totalAmount: 15000,
    paymentStatus: 'verified'
  },
  {
    id: '2',
    name: 'Dr. Sara Ahmed',
    role: 'internal_evaluator',
    email: 'sara.ahmed@bahria.edu.pk',
    phone: '+92-300-2345678',
    accountNumber: 'PK34 UNIL 0023 4567 8901 2345',
    bankName: 'United Bank Limited',
    ntnNumber: '2345678-9',
    cnicNumber: '42101-2345678-2',
    defenseCount: 8,
    ratePerDefense: 5000,
    totalAmount: 40000,
    paymentStatus: 'verified'
  },
  {
    id: '3',
    name: 'Mr. Kashif Ahmed',
    role: 'external_evaluator',
    email: 'kashif.ahmed@techcorp.com',
    phone: '+92-300-3456789',
    accountNumber: '',
    bankName: '',
    ntnNumber: '',
    cnicNumber: '42101-3456789-3',
    defenseCount: 3,
    ratePerDefense: 8000,
    totalAmount: 24000,
    paymentStatus: 'incomplete'
  },
  {
    id: '4',
    name: 'Dr. Imran Shah',
    role: 'internal_evaluator',
    email: 'imran.shah@bahria.edu.pk',
    phone: '+92-300-4567890',
    accountNumber: 'PK56 MEZN 0034 5678 9012 3456',
    bankName: 'Meezan Bank',
    ntnNumber: '3456789-0',
    cnicNumber: '42101-4567890-4',
    defenseCount: 6,
    ratePerDefense: 5000,
    totalAmount: 30000,
    paymentStatus: 'pending'
  }
];

export function ParticipantPaymentsPage() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleVerify = (id: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, paymentStatus: 'verified' as const } : p
    ));
  };

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ntnNumber.includes(searchQuery) ||
      p.cnicNumber.includes(searchQuery);
    
    const matchesRole = filterRole === 'all' || p.role === filterRole;
    const matchesStatus = filterStatus === 'all' || p.paymentStatus === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: participants.length,
    verified: participants.filter(p => p.paymentStatus === 'verified').length,
    pending: participants.filter(p => p.paymentStatus === 'pending').length,
    incomplete: participants.filter(p => p.paymentStatus === 'incomplete').length,
    totalAmount: participants.reduce((sum, p) => sum + p.totalAmount, 0)
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
          <p className="text-gray-600 mt-1">Manage payment details for supervisors and evaluators</p>
        </div>
        <Button
          onClick={() => alert('Export payment report to Excel...')}
          className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Payment Report
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
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
              <p className="text-sm text-gray-600">Incomplete</p>
              <p className="text-2xl font-bold text-red-600">{stats.incomplete}</p>
            </div>
            <FileText className="h-8 w-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-blue-600">Rs. {stats.totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-400" />
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
            <option value="verified">Verified</option>
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
                Payment
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="text-gray-900">{participant.defenseCount} × Rs. {participant.ratePerDefense.toLocaleString()}</div>
                  <div className="text-lg font-bold text-[#FF8C00]">Rs. {participant.totalAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={
                    participant.paymentStatus === 'verified' ? 'bg-green-500 text-white' :
                    participant.paymentStatus === 'pending' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }>
                    {participant.paymentStatus === 'verified' ? '✓ Verified' :
                     participant.paymentStatus === 'pending' ? '⏳ Pending' :
                     '⚠ Incomplete'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedParticipant(participant);
                        setShowEditModal(true);
                      }}
                      variant="outline"
                      className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:bg-opacity-10"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {participant.paymentStatus !== 'verified' && participant.accountNumber && participant.ntnNumber && (
                      <Button
                        onClick={() => handleVerify(participant.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal && selectedParticipant !== null}
        onClose={() => setShowEditModal(false)}
        title="Edit Payment Information"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedParticipant.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue={selectedParticipant.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNIC Number
              </label>
              <input
                type="text"
                defaultValue={selectedParticipant.cnicNumber}
                placeholder="42101-1234567-1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NTN Number (Tax Number)
              </label>
              <input
                type="text"
                defaultValue={selectedParticipant.ntnNumber}
                placeholder="1234567-8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                defaultValue={selectedParticipant.bankName}
                placeholder="e.g., Habib Bank Limited"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBAN / Account Number
              </label>
              <input
                type="text"
                defaultValue={selectedParticipant.accountNumber}
                placeholder="PK12 HABB 0012 3456 7890 1234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Defense Count
                </label>
                <input
                  type="number"
                  defaultValue={selectedParticipant.defenseCount}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate per Defense (Rs.)
                </label>
                <input
                  type="number"
                  defaultValue={selectedParticipant.ratePerDefense}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowEditModal(false)}
                className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Save Information
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
