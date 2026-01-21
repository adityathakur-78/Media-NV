import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";

export default function TeacherPage() {
  return (
    <ProtectedRoute allowedRoles={[Roles.TEACHER]}>
      <h1>Teacher Dashboard</h1>
    </ProtectedRoute>
  );
}
