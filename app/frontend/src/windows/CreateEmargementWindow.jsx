import Signature from '@uiw/react-signature';
import { useState, useRef } from 'react';
import apiClient from '../AxiosConfig';

const SignWindow = ({ width, stagiaires, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const signatureRef = useRef(null);

  const handleClear = () => signatureRef.current.clear();

  const submit = async (event) => {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const stagiaires = formData.getAll("stagiaire");
        const signature = document.createElement("svg");
        signature.className="signature";
        signature.innerHTML = document.getElementById("signature").innerHTML;
        await apiClient.post("/api/emargement/", {stagiaires, signature: signature.outerHTML}, { withCredentials: true });
        onClose(true);
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : error.message;
      console.error(error);
      setErrorMessage(errorMessage || "Il y a eu une erreur");
      setTimeout(
        () =>document.getElementById("errorMessage").scrollIntoView({ top: 50,  behavior: "smooth" }),
        100
      );      
    }
  }
  
  return (
    <div className="modal">
      <form onSubmit={ submit } style={{ width }} className="modalWindow">
          <div>
            <span className="windowTitle">Faire signer</span>
            <span className="modalButtonsList gm">
              <button type="button" onClick={ () => onClose() } title="Annuler" aria-label="Annuler" className="modalButton textRed lnr lnr-cross"></button>
              <button type="submit" title="Valider" aria-label="Valider" className="modalButton textGreen lnr lnr-chevron-down"></button>
            </span>
            { stagiaires ? <>
              <span className="infoMessage">Veuillez sélectionner les stagiaires présents</span>
              <div className="window myl ps">

                { stagiaires.map( stagiaire => {
                  return (
                    <div className="formField">
                      <input id={ stagiaire._id } type="checkbox" name="stagiaire" className="" value={ stagiaire._id }></input>
                      <label htmlFor={ stagiaire._id }><span className="uppercase">{ stagiaire.nom }</span>&nbsp;<span>{ stagiaire.prenom }</span></label>
                    </div>
                  )
                }) }
              </div>
            </> : <p className="infoMessage">Aucun stagiaire pour le moment</p> }
            <div className="wfc centered mym">
              <span className="mm formFieldLabel">Signature :</span>
              <button type="button" className="buttonPrimary" onClick={ handleClear }>Réinitialiser</button>
            </div>
            <Signature style={{ width:"300px", height:"300px" }} className="window element centered" id="signature" ref={signatureRef} />
            { errorMessage ? <p id="errorMessage" className="errorMessage">{ errorMessage }</p> : "" }
          </div>
      </form>
    </div>
  )
}

export default SignWindow