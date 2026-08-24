import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/AuthPages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
