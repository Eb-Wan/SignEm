import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../utils/AppContext"
import Signature from '@uiw/react-signature';
import apiClient from "../../AxiosConfig";
import Login from "../Login";

const SignatureStagiaire = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const { isLoggedIn, nom, prenom } = useAppContext();
  const signatureRef = useRef(null);


  const params = new URL(window.location.href).searchParams;
  const token = params.get("token");

  useEffect(()=> {
    if (!token) setErrorMessage("Aucun jeton de signature n'a été récupéré.");
  }, []);

  const handleClear = () => signatureRef.current.clear();
  const submit = async (event) => {
    event.preventDefault();
    setErrorMessage(false);
    try {
      const signature = document.createElement("svg");
      signature.className="signature";
      signature.innerHTML = document.getElementById("signature").innerHTML;

      await apiClient.post("/api/emargement/"+token, { signature: signature.outerHTML }, { withCredentials: true });
      setInfoMessage("La fiche a bien été signée. Merci !");
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : error.message;
      console.error(error);
      setErrorMessage(errorMessage || "Il y a eu une erreur");
      setTimeout(
        () => document.getElementById("errorMessage").scrollIntoView({ top: 50,  behavior: "smooth" }),
        100
      );
    }
  };

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <title>SignEm - Signature Stagiaire</title>
      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter"><span title="Compte" className="lnr lnr-user mm"></span><span className="uppercase">{ nom }</span> &nbsp; { prenom }</span>
          <span className="row alignCenter"><span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span><span className="capitalize">{ new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions) }</span></span>
      </div>
      { infoMessage ? <p className="successMessage">{ infoMessage }</p> : "" }
      { errorMessage ? <p className="errorMessage" id="errorMessage">{ errorMessage }</p> : "" }
      { !token ? "" : <>
        { isLoggedIn ? <>
          { !infoMessage ? <>
            <form onSubmit={ submit }>
              <div className="wfc centered mym">
                <span className="mm formFieldLabel">Signature :</span>
                <button type="button" className="buttonPrimary" onClick={ handleClear }>Réinitialiser</button>
              </div>
              <Signature style={{ width:"300px", height:"300px" }} className="window element centered" id="signature" ref={signatureRef} />
              <button type="submit" title="Valider" aria-label="Valider" className="buttonPrimary centered myl">Valider</button>
            </form>
          
          </> : ""
          }
          
        </>: <Login/>}
      </>}
    </>
  )
}
export default SignatureStagiaire;