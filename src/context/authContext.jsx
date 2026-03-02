import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

useEffect(() => {
  const initializeAuth = async () => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (!access || !refresh) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(access);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        setUser(decoded);
      } else {
        // Try refresh instead of logout
        const response = await API.post("/auth/refresh/", {
          refresh,
        });

        const { access: newAccess, refresh: newRefresh } =
          response.data;

        localStorage.setItem("access_token", newAccess);
        localStorage.setItem("refresh_token", newRefresh);

        const newDecoded = jwtDecode(newAccess);
        setUser(newDecoded);
      }
    } catch (error) {
      localStorage.clear();
      setUser(null);
    }

    setLoading(false);
  };

  initializeAuth();
}, []);

const login = async (username, password) => {
  try {
    const response = await API.post("/auth/login/", {
      username,
      password,
    });

    const { access, refresh } = response.data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    const decoded = jwtDecode(access);
    setUser(decoded);

    // ROLE REDIRECT
    if (decoded.is_buyer) {
      navigate("/buyer/products");
    } else if (decoded.is_artisan) {
      navigate("/artisan/products");
    }

    return { success: true, user: decoded };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        "Login failed. Please try again.",
    };
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isBuyer: user?.is_buyer || false,
        isArtisan: user?.is_artisan || false,
        isAdmin: user?.is_admin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};