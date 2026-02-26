import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        logout();
      }
    }
    setLoading(false);
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

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.detail || "Login failed. Try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isBuyer: user?.is_buyer,
        isArtisan: user?.is_artisan,
        isAdmin: user?.is_admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};