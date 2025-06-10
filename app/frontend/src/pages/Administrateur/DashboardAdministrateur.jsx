import { Link } from "react-router-dom";
import Table from "../../components/Table";

const DashBoard = () => {
  return (
    <>
      <title>SignEm - Console d'administration</title>
      <h1>Bienvenue sur la console d'administration</h1>
      <ul>
        <li><Link className="buttonLink" to="/administrateur/comptes">Gerer les comptes</Link></li>
        <li><Link className="buttonLink" to="/administrateur/formations">Gerer les formations</Link></li>
        <li><Link className="buttonLink" to="/administrateur/sessions">Gerer les sessions</Link></li>
      </ul>
    </>
  )
}

export default DashBoard;