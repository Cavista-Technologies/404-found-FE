import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { CheckEmail } from "./pages/AuthPages/CheckEmail";
import { AuthenticatedLayout } from "./components/layouts/AuthLayout";
import { AdminDashboard } from "./pages/AdminPages/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        
        {/* NESTED Routes from Dashboard */}

        <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
            <Route path="admin" index element={<AdminDashboard />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
