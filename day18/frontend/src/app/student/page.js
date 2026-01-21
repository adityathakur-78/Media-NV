import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";

export default function StudentPage() {
  return (
    <ProtectedRoute allowedRoles={[Roles.STUDENT]}>
      <h1>Student Dashboard</h1>
    </ProtectedRoute>
  );
}
