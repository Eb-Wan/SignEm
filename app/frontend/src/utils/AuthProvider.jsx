import apiClient from "../AxiosConfig.js";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/compte/role", { withCredentials: true })
    .then(response => {
      setLoading(false);
      setLoggedIn(true);
      setRole(response.data.role);
    })
    .catch(error => {
      setLoading(false);
      setLoggedIn(false);
      setRole("");
    });
  }, [location]);
  return (
    <>
      <AuthContext.Provider value={{ authLoading, isLoggedIn, userRole }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthProvider