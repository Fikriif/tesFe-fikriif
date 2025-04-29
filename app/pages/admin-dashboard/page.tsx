import AdminDashboard from '@/app/components/admin-dashboard/AdminDashboard';
import ProtectedRoute from '@/app/utils/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    </div>
  );
}

export default page
