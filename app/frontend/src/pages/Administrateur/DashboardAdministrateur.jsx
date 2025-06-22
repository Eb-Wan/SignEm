import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useAppContext } from "../../utils/AppContext";

const DashBoard = () => {
  const { nom, prenom, sessionId } = useAppContext();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <title>SignEm - Console d'administration</title>
      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter"><span title="Compte" className="lnr lnr-user mm"></span><span className="uppercase">{ nom }</span> &nbsp; { prenom }</span>
          <span className="row alignCenter"><span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span><span className="capitalize">{ new Date().toLocaleDateString("fr-FR", dateOptions) }</span></span>
      </div>
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