# Coordinator Features - Quick Guide

## 🎯 Key Improvements for Reduced Workload

### 1. **Defense Schedule - Excel-Like Grid View**
**Location:** Coordinator → Defense Schedule

**Features:**
- ✅ **Pre-filled Data**: Students, roll numbers, project titles, and supervisors are automatically populated
- ✅ **Direct Cell Editing**: Click any cell to edit - just like Excel
- ✅ **Quick Dropdown Selection**: Select evaluators, time slots, and rooms from dropdowns
- ✅ **Auto-Status Updates**: Status automatically changes to "Complete" when all fields are filled
- ✅ **Real-time Save Tracking**: See unsaved changes indicator at bottom right
- ✅ **Bulk Save**: Save all changes with one click
- ✅ **Excel Import/Export**: Import student data and export final schedule

**Editable Fields (Highlighted in Blue/Yellow):**
- Date
- Time Slot
- Room
- Internal Evaluator
- External Evaluator

**Read-Only Fields (Highlighted in Gray):**
- Group Number
- Students & Roll Numbers
- Project Title
- Supervisor

**How to Use:**
1. Open Defense Schedule page
2. All student groups are pre-populated
3. Click on any blue/yellow cell to edit
4. Select from dropdowns (evaluators, rooms, time slots)
5. Status updates automatically
6. Click "Save Changes" when done
7. Export to Excel for records

---

### 2. **Participant Payment Information**
**Location:** Coordinator → Participant Payments

**Purpose:** Collect payment details for university payment processing

**Information Collected:**
- ✅ **Personal Details**: Name, Email, Phone, CNIC
- ✅ **Tax Information**: NTN Number (for tax compliance)
- ✅ **Banking Details**: IBAN/Account Number, Bank Name
- ✅ **Payment Calculation**: Defense count × Rate = Total Amount

**Participant Types:**
- Supervisors (Rs. 3,000/defense)
- Internal Evaluators (Rs. 5,000/defense)
- External Evaluators (Rs. 8,000/defense)

**Status Tracking:**
- 🟢 **Verified**: All information complete and verified
- 🟡 **Pending**: Information complete, awaiting verification
- 🔴 **Incomplete**: Missing required information

**How to Use:**
1. View all participants in table format
2. Filter by role (Supervisor/Internal/External Evaluator)
3. Filter by payment status
4. Click "Edit" to update participant information
5. Click "Verify" to mark information as verified
6. Export payment report to Excel for finance department

**Required Fields:**
- CNIC Number (Identity verification)
- NTN Number (Tax compliance)
- IBAN/Account Number (Payment processing)
- Bank Name (Payment routing)

---

## 📊 Benefits

### Time Savings
- **Before**: Manual form filling, individual student entries
- **Now**: Pre-filled grid, click to edit, bulk save

### Error Reduction
- **Before**: Manual data entry errors, missing information
- **Now**: Dropdowns prevent typos, auto-validation, status indicators

### Payment Processing
- **Before**: Collecting payment info through emails/forms
- **Now**: Centralized payment management, one-click export for finance

### Visibility
- **Before**: Unclear which groups need assignment
- **Now**: Clear status indicators, real-time statistics

---

## 🎨 Color Coding

### Defense Schedule Grid
- **Gray**: Read-only (Auto-filled from student data)
- **Blue**: Editable schedule fields (Date, Time, Room)
- **Yellow**: Editable evaluator assignment fields

### Status Badges
- **Green**: Complete/Verified
- **Yellow**: Incomplete/Pending
- **Red**: Needs attention

---

## 💡 Tips for Efficient Use

1. **Use Search**: Filter by group number, student name, or project to find specific entries quickly
2. **Batch Editing**: Edit multiple rows, then save all at once
3. **Excel Export**: Keep backup copies and share with stakeholders
4. **Status Monitoring**: Check statistics cards to see completion progress
5. **Verify Early**: Verify payment information as participants provide it to avoid last-minute issues

---

## 📝 Workflow Example

### Scheduling Defenses
1. System automatically creates grid rows for all student groups
2. You only fill: Date → Time Slot → Room → Internal Evaluator → External Evaluator
3. Status changes to "Complete" automatically
4. Save all changes
5. Export to Excel for records

### Managing Payments
1. View all supervisors and evaluators
2. Check for incomplete information (red badges)
3. Contact participants with missing info
4. Update their records via Edit button
5. Verify complete information
6. Export payment report to Excel
7. Send to finance department for processing

---

## 🔄 Data Flow

```
Student Registration
     ↓
System Auto-populates Defense Grid
     ↓
Coordinator Assigns: Evaluators + Schedule
     ↓
System Tracks Payment Information
     ↓
Coordinator Verifies Payment Info
     ↓
Export Reports for Finance & Records
```

---

## 📞 Support

For any issues or questions:
- Check status indicators for missing information
- Use search/filter to find specific entries
- Export current state for offline review
- Contact system admin for technical issues
