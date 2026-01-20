import RoleGuard from "@/components/roleGuard";
import { Roles } from "@/enums/role";

export default function AdminDashboard() {
  return (
    // <RoleGuard allowedRoles={[Roles.ADMIN]}>
    <h1>Admin Dashboard</h1>
    // </RoleGuard>
  );
}
