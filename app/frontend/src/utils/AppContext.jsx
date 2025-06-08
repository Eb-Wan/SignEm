import apiClient from "../AxiosConfig.js";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const Context = ({ children }) => {
  const location = useLocation();

  const [authLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/compte/auth", { withCredentials: true })
    .then(response => {
      setLoading(false);
      setLoggedIn(true);
      setRole(response.data.role);
      setNom(response.data.nom);
      setPrenom(response.data.prenom);
    })
    .catch(error => {
      setLoading(false);
      setLoggedIn(false);
      setRole("");
    });
  }, [location]);
  return (
    <>
      <AppContext.Provider value={{ authLoading, isLoggedIn, role, nom, prenom }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export default Context