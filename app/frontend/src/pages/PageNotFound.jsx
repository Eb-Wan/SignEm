import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <>
      <h1>Cette page n'existe pas</h1>
      <Link className="buttonPrimary centered" to="/">Revenir à l'accueil</Link>
    </>
  )
}

export default PageNotFound