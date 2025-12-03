import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { CreditCard, User, FileText, Building2, Hash, CheckCircle } from 'lucide-react';

export const PaymentInfoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    facultyId: '',
    cnic: '',
    ntn: '',
    accountNumber: '',
    accountTitle: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock existing data - in real app, fetch from API
  const existingData = {
    facultyId: 'FAC-2024-001',
    cnic: '12345-6789012-3',
    ntn: 'NTN-123456',
    accountNumber: '1234567890123456',
    accountTitle: 'Dr. Ahmed Khan',
  };

  const [hasExistingData] = useState(false); // Set to true to simulate existing data

  React.useEffect(() => {
    if (hasExistingData) {
      setFormData(existingData);
      setIsSubmitted(true);
    }
  }, [hasExistingData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCNIC = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Format as 12345-6789012-3
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  };

  const handleCNICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value);
    setFormData(prev => ({ ...prev, cnic: formatted }));
    if (errors.cnic) {
      setErrors(prev => ({ ...prev, cnic: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.facultyId.trim()) {
      newErrors.facultyId = 'Faculty ID is required';
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = 'CNIC is required';
    } else if (formData.cnic.replace(/\D/g, '').length !== 13) {
      newErrors.cnic = 'CNIC must be 13 digits';
    }

    if (!formData.ntn.trim()) {
      newErrors.ntn = 'NTN is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    } else if (formData.accountNumber.length < 10) {
      newErrors.accountNumber = 'Account Number must be at least 10 digits';
    }

    if (!formData.accountTitle.trim()) {
      newErrors.accountTitle = 'Account Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In real app, send to API
      console.log('Payment Info Submitted:', formData);
      setIsSubmitted(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Information</h1>
        <p className="text-gray-600 mt-1">
          {isSubmitted 
            ? 'Your payment information has been saved. You can edit it if needed.' 
            : 'Please fill in your payment details for receiving compensation.'}
        </p>
      </div>

      {showSuccess && (
        <Alert
          type="success"
          message="Payment information saved successfully!"
          className="mb-6"
        />
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Faculty ID */}
          <div>
            <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-orange-500" />
                Faculty ID
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="facultyId"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleInputChange}
              disabled={isSubmitted}
              placeholder="e.g., FAC-2024-001"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.facultyId ? 'border-red-500' : 'border-gray-300'
              } ${isSubmitted ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {errors.facultyId && (
              <p className="text-red-500 text-sm mt-1">{errors.facultyId}</p>
            )}
          </div>

          {/* CNIC */}
          <div>
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-500" />
                CNIC (National Identity Card)
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleCNICChange}
              disabled={isSubmitted}
              placeholder="12345-6789012-3"
              maxLength={15}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.cnic ? 'border-red-500' : 'border-gray-300'
              } ${isSubmitted ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {errors.cnic && (
              <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>
            )}
          </div>

          {/* NTN */}
          <div>
            <label htmlFor="ntn" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                NTN (National Tax Number)
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="ntn"
              name="ntn"
              value={formData.ntn}
              onChange={handleInputChange}
              disabled={isSubmitted}
              placeholder="e.g., NTN-123456"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.ntn ? 'border-red-500' : 'border-gray-300'
              } ${isSubmitted ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {errors.ntn && (
              <p className="text-red-500 text-sm mt-1">{errors.ntn}</p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" />
                Bank Account Number
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              disabled={isSubmitted}
              placeholder="Enter your bank account number"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              } ${isSubmitted ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
            )}
          </div>

          {/* Account Title */}
          <div>
            <label htmlFor="accountTitle" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-500" />
                Account Title
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="accountTitle"
              name="accountTitle"
              value={formData.accountTitle}
              onChange={handleInputChange}
              disabled={isSubmitted}
              placeholder="Enter account holder name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.accountTitle ? 'border-red-500' : 'border-gray-300'
              } ${isSubmitted ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {errors.accountTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.accountTitle}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {!isSubmitted ? (
              <>
                <Button type="submit" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Save Payment Information
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={handleEdit} variant="outline">
                Edit Information
              </Button>
            )}
          </div>

          {isSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Information Saved</p>
                <p className="text-green-700 text-sm mt-1">
                  Your payment information has been successfully saved. The coordinator will use these details for processing your compensation.
                </p>
              </div>
            </div>
          )}
        </form>
      </Card>

      {/* Info Card */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <div className="text-blue-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure all information is accurate to avoid payment delays</li>
              <li>• CNIC should be in format: 12345-6789012-3</li>
              <li>• Account details must match your official bank records</li>
              <li>• You can update this information anytime if needed</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
