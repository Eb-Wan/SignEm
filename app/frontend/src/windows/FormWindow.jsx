import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiClient from '../AxiosConfig';


const FormWindow = ({ title, width, method, action, message, fields, redirection, onClose }) => {
  const [infoMessage, setInfoMessage] = useState("");
  const submit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      if (method=="post")await apiClient.post(action, formData, { withCredentials: true });
      else if (method=="put")await apiClient.put(action, formData, { withCredentials: true });
      else if (method=="delete")await apiClient.delete(action, { withCredentials: true });
      else throw new Error("Méthode invalide");
      onClose(true);
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : error.message;
      console.error(error);
      setInfoMessage(errorMessage || "Il y a eu une erreur");
      setTimeout(
        () =>document.getElementById("infoMessage").scrollIntoView({ top: 50,  behavior: "smooth" }),
        100
      );
    }
  }

  return (
    <div className="modal">
      <form onSubmit={ submit } style={{ width }} className="modalWindow">
        <div>
          <p className="textMedium">{ message }</p>
          <span className="windowTitle">{ title }</span>
          <span className="modalButtonsList gm">
            <button type="button" onClick={ () => onClose() } title="Annuler" aria-label="Annuler" className="modalButton textRed lnr lnr-cross"></button>
            <button type="submit" title="Valider" aria-label="Valider" className="modalButton textGreen lnr lnr-chevron-down"></button>
          </span>
          { fields ? fields.map((field, index) => {
            const label = field.label || "Libellé non défini";
            const name = field.name || "undefined";
            const type = field.type || "text";
            const value = field.value || "";
            const isRequired = field.isRequired || false;
            const options = field.options || [{ label: "Aucun", value:"none" }];
            return (<>{
              (type=="text" || type=="email" || type=="password" || type=="date") ?
                (<div key={ name+index } className="formField">
                  <label className="formFieldLabel">{ label }</label>
                  <input defaultValue={ value } className="formFieldSection formFieldInput"
                    name={ name }
                    type={ type }
                    required={ isRequired }
                  />
                </div>) : ""
              }
              {
                (type=="select") ?
                  (<div key={ name+index } className="formField">
                    <label className="formFieldLabel">{ label }</label>
                    <select className="formFieldSection formFieldInput" name={ name }>
                      { options.map((option, optionIndex) => {
                        const optionLabel = option.label || "Libellé non défini";
                        const optionValue = option.value || "none";
                        return (<option key={ name+value+optionIndex } selected={ value==optionValue } value={ optionValue }>{ optionLabel }</option>);
                      })}
                    </select>
                  </div>) : ""
              }
              </>
            );}):""
            }
          
          { infoMessage ? <p id="infoMessage" className="errorMessage">{ infoMessage }</p> : "" }
        </div>
      </form>
    </div>
  )
}

export default FormWindow