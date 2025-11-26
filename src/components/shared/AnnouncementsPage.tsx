import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, AlertCircle, Info, CheckCircle, Calendar, User, Megaphone, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  postedBy: string;
  postedDate: string;
  isRead: boolean;
  attachments?: string[];
  targetAudience: 'all' | 'students' | 'supervisors' | 'evaluators';
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Final Defense Schedule Released',
    message: 'The final defense schedule for Spring 2024 has been released. Please check the Defense Schedule page for your assigned slot. Make sure to prepare your presentation and working demo.',
    type: 'urgent',
    postedBy: 'Dr. Sarah Ahmed (Coordinator)',
    postedDate: '2024-02-20',
    isRead: false,
    attachments: ['defense_schedule.pdf'],
    targetAudience: 'all'
  },
  {
    id: '2',
    title: 'Documentation Submission Reminder',
    message: 'Reminder: All final documentation including SRS, SDS, and Final Report must be submitted by March 1st, 2024. Late submissions will result in penalty.',
    type: 'warning',
    postedBy: 'Dr. Sarah Ahmed (Coordinator)',
    postedDate: '2024-02-18',
    isRead: false,
    targetAudience: 'students'
  },
  {
    id: '3',
    title: 'Monthly Log Template Updated',
    message: 'A new monthly log template has been uploaded. Please use the updated template for your February submissions. The new template includes additional sections for technical challenges and solutions.',
    type: 'info',
    postedBy: 'FYP Administration',
    postedDate: '2024-02-15',
    isRead: true,
    attachments: ['monthly_log_template_v2.docx'],
    targetAudience: 'students'
  },
  {
    id: '4',
    title: 'Interim Evaluations Completed Successfully',
    message: 'Congratulations! All interim evaluations have been completed successfully. Results will be published by the end of this week. Students who need to reappear will be notified separately.',
    type: 'success',
    postedBy: 'Dr. Sarah Ahmed (Coordinator)',
    postedDate: '2024-02-10',
    isRead: true,
    targetAudience: 'all'
  }
];

export const AnnouncementsPage: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'warning' | 'info' | 'success'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const isCoordinator = user?.role === 'coordinator';

  const getTypeIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: Announcement['type']) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeBorderColor = (type: Announcement['type']) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'success':
        return 'border-l-green-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, isRead: true } : ann
    ));
  };

  const markAllAsRead = () => {
    setAnnouncements(announcements.map(ann => ({ ...ann, isRead: true })));
  };

  const getFilteredAnnouncements = () => {
    let filtered = announcements;
    
    if (filter === 'unread') {
      filtered = filtered.filter(a => !a.isRead);
    } else if (filter !== 'all') {
      filtered = filtered.filter(a => a.type === filter);
    }
    
    return filtered;
  };

  const filteredAnnouncements = getFilteredAnnouncements();
  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">
            {isCoordinator 
              ? 'Post and manage announcements for students and faculty'
              : 'Stay updated with important FYP notifications'}
          </p>
        </div>
        {isCoordinator ? (
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        ) : (
          unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#FF8C00] hover:text-[#cc7000] font-medium"
            >
              Mark all as read
            </button>
          )
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
            </div>
            {isCoordinator ? <Megaphone className="h-8 w-8 text-gray-400" /> : <Bell className="h-8 w-8 text-gray-400" />}
          </div>
        </Card>

        {!isCoordinator && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-[#FF8C00]">{unreadCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-[#FF8C00] opacity-60" />
            </div>
          </Card>
        )}

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">
                {announcements.filter(a => a.type === 'urgent').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-600">
                {announcements.filter(a => a.type === 'warning').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Info</p>
              <p className="text-2xl font-bold text-blue-600">
                {announcements.filter(a => a.type === 'info').length}
              </p>
            </div>
            <Info className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#FF8C00] hover:bg-[#cc7000] text-white' : ''}
          >
            All ({announcements.length})
          </Button>
          {!isCoordinator && (
            <Button
              variant="outline"
              onClick={() => setFilter('unread')}
              className={filter === 'unread' ? 'bg-[#FF8C00] hover:bg-[#cc7000] text-white' : ''}
            >
              Unread ({unreadCount})
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setFilter('urgent')}
            className={filter === 'urgent' ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''}
          >
            Urgent
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilter('warning')}
            className={filter === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500' : ''}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilter('info')}
            className={filter === 'info' ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' : ''}
          >
            Info
          </Button>
        </div>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No announcements to display</p>
          </Card>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-6 border-l-4 ${getTypeBorderColor(announcement.type)} ${
                !isCoordinator && !announcement.isRead ? 'bg-orange-50' : ''
              }`}
              onClick={() => !isCoordinator && !announcement.isRead && markAsRead(announcement.id)}
            >
              <div className="flex items-start gap-4">
                {isCoordinator ? (
                  <div className={`p-3 rounded-lg ${getTypeColor(announcement.type)} text-white`}>
                    {announcement.type === 'urgent' || announcement.type === 'warning' ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Megaphone className="h-5 w-5" />
                    )}
                  </div>
                ) : (
                  <div className="shrink-0 mt-1">
                    {getTypeIcon(announcement.type)}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <Badge className={`${getTypeColor(announcement.type)} text-white`}>
                        {announcement.type}
                      </Badge>
                      {isCoordinator && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          {announcement.targetAudience}
                        </span>
                      )}
                      {!isCoordinator && !announcement.isRead && (
                        <Badge className="bg-[#FF8C00] text-white">New</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{announcement.message}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {announcement.postedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-1 text-sm text-[#FF8C00] hover:text-[#cc7000] border border-[#FF8C00] rounded px-3 py-1 transition-colors"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            {file}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isCoordinator && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#FF8C00] text-[#FF8C00]">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Announcement Modal - Coordinator Only */}
      {isCoordinator && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create Announcement"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                placeholder="Enter announcement title..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
                  <option>urgent</option>
                  <option>warning</option>
                  <option>info</option>
                  <option>success</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]">
                  <option>all</option>
                  <option>students</option>
                  <option>supervisors</option>
                  <option>evaluators</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                rows={6}
                placeholder="Enter announcement message..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddModal(false)}
                className="bg-[#FF8C00] hover:bg-[#cc7000] text-white"
              >
                Post Announcement
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
