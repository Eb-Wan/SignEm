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
  const [sessionId, setSession] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const refreshState = () => {
    if (!authLoading || !isLoggedIn) {
      setLoading(true);
      apiClient.get("/api/compte/auth", { withCredentials: true })
      .then(response => {
        if (response.data.isLoggedIn) {
          setLoggedIn(true);
          setRole(response.data.role);
          setNom(response.data.nom);
          setPrenom(response.data.prenom);
          setSession(response.data.session);
          setLoading(false);
        } else {
          setLoading(false);
          setLoggedIn(false);
          setRole("");  
        }
      })
      .catch(error => {
        setLoading(false);
        setLoggedIn(false);
        setRole("");  
      });
      setTimeout(() => {
        setLoading(false);
        refreshState();
      } ,5000);
    }
  }
  useEffect(refreshState, [location]);
  return (
    <>
      <AppContext.Provider value={{ authLoading, isLoggedIn, role, nom, prenom, sessionId }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export default Context