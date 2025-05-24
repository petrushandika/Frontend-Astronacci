import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import API from "@/services/api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const authChannel = new BroadcastChannel("auth_channel");
      authChannel.postMessage("TOKEN_CHANGED");

      API.USER.LOGGED_USER()
        .then((userData) => {
          setUser(userData);
          navigate("/dashboard");
        })
        .catch(() => {
          navigate("/auth/login");
        });
    } else {
      navigate("/auth/login");
    }
  }, [navigate, setUser]);

  return <div>Processing...</div>;
};

export default AuthCallback;
