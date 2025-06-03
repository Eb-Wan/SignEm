import { useAuth } from "./AuthProvider"
import Spinner from "../components/Spinner"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const AuthChecker = ({ children, role, reverse }) => {
  const { isLoggedIn, authLoading, userRole } = useAuth()
  const [component, setComponent] = useState("")
  useEffect(() => {
    if (authLoading) setComponent(<Spinner />)
    else if (!isLoggedIn && reverse == false) setComponent(<Navigate to="/login" />)
    else if (isLoggedIn) {
      if (reverse == true) setComponent(<Navigate to="/login" />)
      else if (!role) setComponent(children)
      else if (role === userRole) setComponent(children)
      else setComponent(<Navigate to="/unauthorized" />)
    }
  }, [isLoggedIn, authLoading]);

  return (
    <>{ component }</>
  );
}

export default AuthChecker