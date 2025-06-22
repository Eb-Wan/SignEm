import { useAppContext } from "./AppContext"
import Spinner from "../components/Spinner"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const AuthChecker = ({ children, accessRole }) => {
  const { isLoggedIn, authLoading, role } = useAppContext();
  const [component, setComponent] = useState("");
  useEffect(() => {
    if (authLoading) setComponent(<Spinner />);
    else if (isLoggedIn && role===accessRole) setComponent(children);
    else if (isLoggedIn && !accessRole) setComponent(children);
    else if (!authLoading && !isLoggedIn) setComponent(<Navigate to={ "/se-connecter?redirection="+window.location.pathname } />);
    else setComponent(<Navigate to="/" />);
  }, [isLoggedIn, authLoading]);

  return (
    <>{ component }</>
  );
}

export default AuthChecker