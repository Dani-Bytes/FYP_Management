import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BookOpen, FileText, Calendar, Shield, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const allGuidelines = {
  student: [
    {
      id: '1',
      title: 'Project Proposal Guidelines',
      category: 'Documentation',
      content: 'Complete guidelines for preparing and submitting your FYP proposal...',
      icon: <FileText />
    },
    {
      id: '2',
      title: 'Defense Preparation',
      category: 'Defense',
      content: 'Tips and requirements for preparing your project defense presentation...',
      icon: <Award />
    },
    {
      id: '3',
      title: 'Submission Deadlines',
      category: 'Deadlines',
      content: 'Important dates and deadlines for all FYP submissions...',
      icon: <Calendar />
    }
  ],
  supervisor: [
    {
      id: '1',
      title: 'Student Supervision Best Practices',
      category: 'Supervision',
      content: 'Guidelines for effective student mentoring and project supervision...',
      icon: <Shield />
    },
    {
      id: '2',
      title: 'Evaluation Criteria',
      category: 'Evaluation',
      content: 'Detailed rubric and criteria for evaluating student work...',
      icon: <Award />
    }
  ],
  coordinator: [
    {
      id: '1',
      title: 'Defense Schedule Management',
      category: 'Coordination',
      content: 'Best practices for scheduling and managing defense sessions...',
      icon: <Calendar />
    },
    {
      id: '2',
      title: 'Compliance Monitoring',
      category: 'Compliance',
      content: 'Guidelines for tracking student compliance with FYP requirements...',
      icon: <Shield />
    }
  ],
  hod: [
    {
      id: '1',
      title: 'Result Approval Process',
      category: 'Results',
      content: 'Procedures for reviewing and approving final FYP results...',
      icon: <Award />
    },
    {
      id: '2',
      title: 'Appeal Handling',
      category: 'Appeals',
      content: 'Guidelines for processing student appeals and grievances...',
      icon: <Shield />
    }
  ],
  evaluator: [
    {
      id: '1',
      title: 'Evaluation Standards',
      category: 'Evaluation',
      content: 'Standard criteria and rubrics for evaluating FYP defenses...',
      icon: <Award />
    },
    {
      id: '2',
      title: 'Feedback Guidelines',
      category: 'Feedback',
      content: 'Best practices for providing constructive feedback to students...',
      icon: <FileText />
    }
  ]
};

export function GuidelinesPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const role = user?.role || 'student';
  const guidelines = allGuidelines[role as keyof typeof allGuidelines] || allGuidelines.student;

  const categories = ['all', ...Array.from(new Set(guidelines.map(g => g.category)))];
  const filteredGuidelines = selectedCategory === 'all' 
    ? guidelines 
    : guidelines.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Guidelines & Resources</h1>
        <p className="text-gray-600 mt-1">
          Essential guidelines and resources for {role === 'hod' ? 'HOD' : role}s
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-[#FF8C00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category} ({category === 'all' ? guidelines.length : guidelines.filter(g => g.category === category).length})
          </button>
        ))}
      </div>

      {/* Guidelines List */}
      <div className="space-y-4">
        {filteredGuidelines.map((guideline) => (
          <Card key={guideline.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FF8C00] bg-opacity-10 rounded-lg text-[#FF8C00]">
                {guideline.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{guideline.title}</h3>
                  <Badge className="bg-gray-200 text-gray-700">{guideline.category}</Badge>
                </div>
                <p className="text-gray-600">{guideline.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredGuidelines.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No guidelines found in this category</p>
        </Card>
      )}
    </div>
  );
}
