import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { CreditCard, User, FileText, Building2, Hash } from 'lucide-react';

interface PaymentInfo {
  facultyId: string;
  cnic: string;
  ntn: string;
  accountNumber: string;
  accountTitle: string;
  bankName: string;
}

export function PaymentInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    facultyId: 'EVAL-2024-001',
    cnic: '12345-6789012-3',
    ntn: 'NTN-123456',
    accountNumber: '1234567890123456',
    accountTitle: 'Dr. Muhammad Hassan',
    bankName: 'Allied Bank Limited',
  });

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };

  const formatCNIC = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 12) return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 12)}-${numbers.slice(12, 13)}`;
  };

  const handleCNICChange = (value: string) => {
    const formatted = formatCNIC(value);
    handleInputChange('cnic', formatted);
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Information</h1>
        <p className="text-gray-600 mt-1">Manage your payment and banking details</p>
      </div>

      {showSuccess && (
        <Alert variant="success">
          Payment information updated successfully!
        </Alert>
      )}

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF8C00] bg-opacity-10 rounded-lg">
              <CreditCard className="h-6 w-6 text-[#FF8C00]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Banking Details</h2>
              <p className="text-sm text-gray-600">Your financial information for compensation</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Information
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Hash className="h-4 w-4 text-gray-400" />
              Faculty ID
            </label>
            <input
              type="text"
              value={paymentInfo.facultyId}
              onChange={(e) => handleInputChange('facultyId', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 text-gray-400" />
              CNIC
            </label>
            <input
              type="text"
              value={paymentInfo.cnic}
              onChange={(e) => handleCNICChange(e.target.value)}
              disabled={!isEditing}
              placeholder="12345-6789012-3"
              maxLength={15}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 text-gray-400" />
              NTN (National Tax Number)
            </label>
            <input
              type="text"
              value={paymentInfo.ntn}
              onChange={(e) => handleInputChange('ntn', e.target.value)}
              disabled={!isEditing}
              placeholder="NTN-123456"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              Account Number
            </label>
            <input
              type="text"
              value={paymentInfo.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              disabled={!isEditing}
              placeholder="1234567890123456"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 text-gray-400" />
              Account Title
            </label>
            <input
              type="text"
              value={paymentInfo.accountTitle}
              onChange={(e) => handleInputChange('accountTitle', e.target.value)}
              disabled={!isEditing}
              placeholder="Account holder name"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              Bank Name
            </label>
            <input
              type="text"
              value={paymentInfo.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              disabled={!isEditing}
              placeholder="Bank name"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? 'focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Important Information</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Ensure all banking details are accurate to avoid payment delays</li>
              <li>CNIC format: 12345-6789012-3 (13 digits)</li>
              <li>Payment will be processed after defense evaluation completion</li>
              <li>Contact the coordinator for any payment-related queries</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
