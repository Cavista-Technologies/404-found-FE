import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { resolveRedirect } from "@/lib/resolveRedirect";

interface Props {
  children: React.ReactNode;
  requiredRoles?: string;
}

export function ProtectedRoute({ children, requiredRoles }: Props) {
  const { token, role } = useSelector((state: RootState) => state.auth);

  // Not logged in → go to login
  if (!token) return <Navigate to="/login" replace />;

  // Role check only if requiredRoles is provided
  
  if (requiredRoles && requiredRoles.length > 0) {
    <Navigate to={resolveRedirect(role ?? "")} replace />
  }

  return <>{children}</>;
}
