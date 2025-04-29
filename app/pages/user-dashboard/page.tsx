import UserDashboard from "@/app/components/user-dashboard/UserDashboard"
import ProtectedRoute from "@/app/utils/ProtectedRoute"

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    </div>
  );
}

export default page
