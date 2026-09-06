import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { CheckEmail } from "./pages/AuthPages/CheckEmail";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthenticatedLayout } from "./components/layouts/AuthLayout";
import { AdminDashboard } from "./pages/AdminPages/AdminDashboard";
import { CreateRolePage } from "./pages/AdminPages/CreateRole";
import { AdminRolesPage } from "./pages/AdminPages/Roles";
import { RoleDetailPage } from "./pages/AdminPages/AdminRoleDetail";
import { ApplicationFormBuilderPage } from "./pages/AdminPages/ApplicationFormBuilder";
import { CandidateApplicationForm } from "./pages/PublicPages/ApplicationForm";
import { AnalyticsAndInsights } from "./pages/AdminPages/Analytics";
import { RecruiterDashboard } from "./pages/RecruiterPages/RecruiterDashboard";
import { RecruiterRoles } from "./pages/RecruiterPages/RecruiterRoles";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/job/:slug" element={<CandidateApplicationForm />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          {/* ADMIN ROUTES*/}
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

            <Route
              path="roles"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <AdminRolesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="roles/:id"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <RoleDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="roles/:id/create-form"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <ApplicationFormBuilderPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="analytics"
              element={
                <ProtectedRoute requiredRoles="SuperAdmin">
                  <AnalyticsAndInsights />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* RECRUITER ROUTES */}
          <Route path="recruiter">
            <Route
              index
              element={
                <ProtectedRoute requiredRoles="Recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-roles"
              element={
                <ProtectedRoute requiredRoles="Recruiter">
                  <RecruiterRoles />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* NESTED Routes from Dashboard */}
      </Routes>
    </div>
  );
}

export default App;
