import { Route, Routes, Navigate } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";

function App() {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Navigate to="/auth/register" replace />} />

          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
