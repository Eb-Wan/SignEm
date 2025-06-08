import { useState } from "react";
import { useAppContext } from "../utils/AppContext"
import SignWindow from "../windows/SignWindow";

const DashBoard = () => {
  const { nom, prenom } = useAppContext();
  const [signForm, setSignFormState] = useState(false);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <title>SignEm - Dashboard Formateur</title>
      { signForm ? <SignWindow/> : "" }
      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter"><span title="Compte" className="lnr lnr-user mm"></span><span className="uppercase">{ nom }</span> &nbsp; { prenom }</span>
          <span className="row alignCenter"><span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span><span className="capitalize">{ new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions) }</span></span>
      </div>
      <div className="row justifyBetween">
        <button className="buttonPrimary" onClick={ ()=>setSignFormState(true) }>Faire signer</button>
      </div>
    </>
  )
}

export default DashBoard