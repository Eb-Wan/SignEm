import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext"
import SignWindow from "../windows/SignWindow";
import apiClient from "../AxiosConfig";
import Table from "../components/Table";

const DashBoard = () => {
  const { nom, prenom } = useAppContext();
  const [signForm, setSignFormState] = useState(false);
  const [stagiaires, setStagiaires] = useState([]);

  const refreshStagiaires = () => {
    apiClient.get("/api/compte/formateur/list", { withCredentials: true })
    .then(response => setStagiaires(response.data.comptes))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    });
  }
  useEffect(() => refreshStagiaires(), []);

  const compteTableHead = ["Nom", "Prénom", "E-Mail", "Signature Matin", "Signature Après-midi"];
  const compteTableRows = [];

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <title>SignEm - Dashboard Formateur</title>
      { signForm ? <SignWindow onClose={ ()=>setSignFormState(false) } width={ 800 } stagiaires={ stagiaires } /> : "" }
      { stagiaires.map((compte) => {
        compteTableRows.push([
          (<span className="uppercase">{ compte.nom }</span>),
          (<span>{ compte.prenom }</span>),
          (<span>{ compte.email }</span>),
          (<span></span>),
          (<span></span>)
        ]);
      })}
      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter"><span title="Compte" className="lnr lnr-user mm"></span><span className="uppercase">{ nom }</span> &nbsp; { prenom }</span>
          <span className="row alignCenter"><span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span><span className="capitalize">{ new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions) }</span></span>
      </div>
      <div className="row justifyBetween">
        <button className="buttonPrimary" onClick={ ()=>setSignFormState(true) }>Faire signer</button>
      </div>
      <Table head={ compteTableHead } rows={ compteTableRows }/>
    </>
  )
}

export default DashBoard