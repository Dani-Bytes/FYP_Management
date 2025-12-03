import React, { type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LogOut, 
  Bell, 
  GraduationCap,
  User,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Calendar,
  CheckCircle,
  Upload,
  Megaphone,
  HelpCircle,
  Settings,
  Users,
  ClipboardList,
  Award,
  BarChart3,
  Shield,
  CreditCard
} from 'lucide-react';

interface SidebarLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'student': return 'Student';
      case 'supervisor': return 'Supervisor';
      case 'coordinator': return 'Coordinator';
      case 'hod': return 'Head of Department';
      case 'evaluator': return user?.evaluatorType === 'external' ? 'External Evaluator' : 'Internal Evaluator';
      default: return role;
    }
  };

  const getMenuItems = (): MenuItem[] => {
    const role = user?.role;
    
    switch (role) {
      case 'student':
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/student/dashboard' },
          { label: 'Work & Progress', icon: <Upload size={18} />, path: '/student/submissions' },
          { label: 'Defense Schedule', icon: <Calendar size={18} />, path: '/student/defense-schedule' },
          { label: 'Announcements', icon: <Megaphone size={18} />, path: '/student/announcements' },
          { label: 'Guidelines', icon: <HelpCircle size={18} />, path: '/student/guidelines' },
        ];
      
      case 'supervisor':
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/supervisor/dashboard' },
          { label: 'My Students', icon: <Users size={18} />, path: '/supervisor/my-students' },
          { label: 'Reviews & Approvals', icon: <CheckCircle size={18} />, path: '/supervisor/reviews' },
          { label: 'Escalations', icon: <Shield size={18} />, path: '/supervisor/escalations' },
          { label: 'Payment Information', icon: <CreditCard size={18} />, path: '/supervisor/payment-info' },
          { label: 'Guidelines', icon: <HelpCircle size={18} />, path: '/supervisor/guidelines' },
        ];
      
      case 'coordinator':
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/coordinator/dashboard' },
          { label: 'Defense Schedule', icon: <Calendar size={18} />, path: '/coordinator/defense-schedule' },
          { label: 'Monthly Logs', icon: <FileText size={18} />, path: '/coordinator/monthly-logs' },
          { label: 'Participant Payments', icon: <Users size={18} />, path: '/coordinator/participant-payments' },
          { label: 'Penalties', icon: <Award size={18} />, path: '/coordinator/penalties' },
          { label: 'Compile Results', icon: <BarChart3 size={18} />, path: '/coordinator/compile-results' },
          { label: 'Announcements', icon: <Megaphone size={18} />, path: '/coordinator/announcements' },
          { label: 'Guidelines', icon: <HelpCircle size={18} />, path: '/coordinator/guidelines' },
        ];
      
      case 'hod':
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/hod/dashboard' },
          { label: 'Appeals', icon: <FileText size={18} />, path: '/hod/appeals' },
          { label: 'Escalations', icon: <Shield size={18} />, path: '/hod/escalations' },
          { label: 'Results Management', icon: <CheckCircle size={18} />, path: '/hod/result-approval' },
          { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/hod/analytics' },
          { label: 'Guidelines', icon: <HelpCircle size={18} />, path: '/hod/guidelines' },
        ];
      
      case 'evaluator':
        const isExternal = user?.evaluatorType === 'external';
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/evaluator/dashboard' },
          { label: isExternal ? 'Final Defenses' : 'Defense Schedule', icon: <Calendar size={18} />, path: '/evaluator/defense-schedule' },
          { label: 'Evaluations', icon: <CheckCircle size={18} />, path: '/evaluator/evaluations' },
          { label: 'Payment Information', icon: <CreditCard size={18} />, path: '/evaluator/payment-info' },
          { label: 'Guidelines', icon: <HelpCircle size={18} />, path: '/evaluator/guidelines' },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-orange-500">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg">
              <GraduationCap className="text-orange-500" size={20} />
            </div>
            <div className="text-white">
              <h1 className="text-sm font-bold">Bahria University</h1>
              <p className="text-xs opacity-90">FYP System</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-orange-600 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
              <User className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user && getRoleName(user.role)}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.path && item.path !== '#') {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  } else if (item.onClick) {
                    item.onClick();
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                  ${window.location.pathname === item.path
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => navigate('#')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mb-2"
          >
            <Settings size={18} className="shrink-0" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-orange-500 border-b border-orange-600 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white hover:bg-orange-600 p-2 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-white text-lg font-semibold">Learning Management System</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-white text-sm font-medium bg-orange-600 px-3 py-1.5 rounded-lg">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </div>
            <button className="relative text-white hover:bg-orange-600 p-2 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4 lg:px-6 shrink-0">
          <div className="text-center text-xs text-gray-500">
            <p>Copyright © 2025 <span className="text-orange-500 font-medium">Bahria University</span>. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
