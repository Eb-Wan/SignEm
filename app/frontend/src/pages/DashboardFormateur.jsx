import React, { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext"
import SignWindow from "../windows/CreateEmargementWindow";
import apiClient from "../AxiosConfig";
import Table from "../components/Table";
import parse from "html-react-parser";

const DashBoard = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const { nom, prenom, sessionId } = useAppContext();
  const [signForm, setSignFormState] = useState(false);
  const [stagiaires, setStagiaires] = useState([]);

  const [emargementsMatin, setEmargementsMatin] = useState([]);
  const [emargementsAprem, setEmargementsAprem] = useState([]);

  const refreshPage = async () => {
    try {
      const comptes = await apiClient.get("/api/compte/formateur/list/?sessionId="+sessionId, { withCredentials: true })
      const matin = await apiClient.get("/api/emargement/matin/"+sessionId, { withCredentials: true })
      const aprem = await apiClient.get("/api/emargement/aprem/"+sessionId, { withCredentials: true })
      setStagiaires(comptes.data.comptes);
      setEmargementsMatin(matin.data.emargements);
      setEmargementsAprem(aprem.data.emargements);
    } catch (error) {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    }
  }
  useEffect(() =>{
    refreshPage()
  }, []);

  const onSignWindowClose = (success) => {
    setSignFormState(false)
    if (success) setInfoMessage("Les e-mails pour signer les fiches sont bien partis");
  }

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
      { signForm ? <SignWindow onClose={ onSignWindowClose } width={ 800 } stagiaires={ stagiaires } /> : "" }
      { stagiaires.length>0 ? <>
         { stagiaires.map((compte) => {

          const matin = emargementsMatin.find(e => e.stagiaireId == compte._id);
          const aprem = emargementsAprem.find(e => e.stagiaireId == compte._id) || "<span></span>";

          compteTableRows.push([
            (<span className="uppercase">{ compte.nom }</span>),
            (<span>{ compte.prenom }</span>),
            (<span>{ compte.email }</span>),
            (<>{ parse(matin.stagiaireSignature || "<span></span>")}</>),
            (<>{ parse(aprem.stagiaireSignature || "<span></span>")}</>),
          ]);
        })}
      </> : <p className="infoMessage">Aucun stagiaire trouvé</p>
      }
      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter"><span title="Compte" className="lnr lnr-user mm"></span><span className="uppercase">{ nom }</span> &nbsp; { prenom }</span>
          <span className="row alignCenter"><span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span><span className="capitalize">{ new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions) }</span></span>
      </div>
      <div className="row justifyBetween">
        <button className="buttonPrimary" onClick={ ()=>setSignFormState(true) }>Faire signer</button>
      </div>
      { infoMessage ? <p className="successMessage">{ infoMessage }</p> : "" }
      { errorMessage ? <p className="errorMessage">{ errorMessage }</p> : "" }
      <Table head={ compteTableHead } rows={ compteTableRows }/>
    </>
  )
}

export default DashBoard