import { createContext, useContext, useEffect, useState } from "react";
import API from "@/services/api";

const authChannel = new BroadcastChannel("auth_channel");

type AuthContextType = {
  user: any | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await API.USER.LOGGED_USER();
          setUser(userData);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      if (event.data === "TOKEN_CHANGED") {
        const token = localStorage.getItem("token");
        if (token) {
          API.USER.LOGGED_USER()
            .then(setUser)
            .catch(() => setUser(null));
        } else {
          setUser(null);
        }
      }
    };

    authChannel.addEventListener("message", handleEvent);

    return () => {
      authChannel.removeEventListener("message", handleEvent);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authChannel.postMessage("TOKEN_CHANGED");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
