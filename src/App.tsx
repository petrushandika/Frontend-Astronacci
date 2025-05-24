import type { JSX } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import MembershipPage from "./pages/Membership/MembershipPage";
import Dashboard from "./pages/Dashboard";
import MembershipPayment from "./pages/Membership/MembershipPayment";
import ArticleList from "./pages/Articles/ArticleList";
import ArticleDetail from "./pages/Articles/ArticleDetail";
import ContentList from "./pages/Content/ContentList";
import ContentDetail from "./pages/Content/ContentDetail";
import AuthCallback from "./context/AuthCallback";

const useAuth = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  return !auth ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Navigate to="/auth/login" replace />} />

          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/auth/callback"
            element={
              <PublicRoute>
                <AuthCallback />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/article"
            element={
              <PrivateRoute>
                <ArticleList />
              </PrivateRoute>
            }
          />
          <Route
            path="/article/:id"
            element={
              <PrivateRoute>
                <ArticleDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/video"
            element={
              <PrivateRoute>
                <ContentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/video/:id"
            element={
              <PrivateRoute>
                <ContentDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/membership"
            element={
              <PrivateRoute>
                <MembershipPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/membership/payment"
            element={
              <PrivateRoute>
                <MembershipPayment />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
