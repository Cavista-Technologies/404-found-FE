import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { CheckEmail } from "./pages/AuthPages/CheckEmail";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthenticatedLayout } from "./components/layouts/AuthLayout";
import { AdminDashboard } from "./pages/AdminPages/AdminDashboard";
import { CreateRolePage } from "./pages/AdminPages/CreateRole";
// import { AdminRolesPage } from "./pages/AdminPages/Roles";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin Routes */}
          <Route path="admin">
            <Route
              index
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-role"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <CreateRolePage />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="roles"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <AdminRolesPage />
                </ProtectedRoute>
              }
            /> */}
          </Route>
        </Route>

        {/* NESTED Routes from Dashboard */}
      </Routes>
    </div>
  );
}

export default App;
