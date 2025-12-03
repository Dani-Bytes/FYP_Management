import { Link } from 'react-router-dom';

export function AssignmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Assignments</h1>
      <p className="text-gray-600">
        This page has been merged with Submissions. 
        <Link to="/student/submissions" className="text-[#FF8C00] hover:underline ml-1">
          Go to Work & Progress →
        </Link>
      </p>
    </div>
  );
}
