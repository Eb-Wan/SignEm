import { useState } from "react";
import SignWindow from "../windows/SignWindow";

const DashBoard = () => {
  const [signForm, setSignFormState] = useState(false);

  const closeSignForm = () => setSignFormState(false);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <title>SignEm - Dashboard Administateur</title>
      { signForm ? <SignWindow onClose={ closeSignForm }/> : "" }
      <div className="row justifyBetween">
        <button className="buttonPrimary" onClick={ ()=>setSignFormState(true) }>Faire signer</button>
      </div>
    </>
  )
}

export default DashBoard