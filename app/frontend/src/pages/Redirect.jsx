import Spinner from "../components/Spinner"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAppContext } from "../utils/AppContext"

const Redirect = () => {
  const { isLoggedIn, authLoading, role } = useAppContext()
  const [component, setComponent] = useState("")
  useEffect(() => {
    if (authLoading) setComponent(<Spinner />)
    else if (!isLoggedIn) setComponent(<Navigate to="/login" />)
    else {
      if (role === "Administrateur") setComponent(<Navigate to="/administrateur" />)
      else if (role === "Formateur") setComponent(<Navigate to="/formateur" />)
      else if (role === "Stagiaire") setComponent(<Navigate to="/stagiaire" />)
      else setComponent(<Navigate to="/unauthorized" />)
    }
  }, [isLoggedIn, authLoading]);
  return (
    <>{ component }</>
  );
}

export default Redirect