import { useAuth } from "../utils/AuthProvider"
import Spinner from "../components/Spinner"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const Redirect = ({ children, role }) => {
  const { isLoggedIn, authLoading, userRole } = useAuth()
  const [component, setComponent] = useState("")
  useEffect(() => {
    if (authLoading) setComponent(<Spinner />)
    else if (!isLoggedIn) setComponent(<Navigate to="/login" />)
    else {
      if (userRole === "Administrateur") setComponent(<Navigate to="/administrateur" />)
      else if (userRole === "Formateur") setComponent(<Navigate to="/formateur" />)
      else if (userRole === "Stagiaire") setComponent(<Navigate to="/stagiaire" />)
      else setComponent(<Navigate to="/unauthorized" />)
    }
  }, [isLoggedIn, authLoading]);
  return (
    <>{ component }</>
  );
}

export default Redirect