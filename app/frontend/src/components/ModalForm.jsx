import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";
import Spinner from "./Spinner";

const ModalForm = ({ name, title, headers, message, buttonLabel, onClose, method, action, fields, redirection }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const { register, handleSubmit } = useForm();
  const [isWaiting, setWaiting] = useState(false);
  
  name = name+"ModalForm";

  const onSubmit = async (data) => {
    
    if (data.image){
      if (method === "post" && data.image.length === 0) return setInfo("Veuillez ajouter une image d'illustration");
      if (data.image.length > 1) return setInfo("Vous ne pouvez téléverser qu'une seule image.");
      if (data.image.length !== 0){
        const file = data.image[0];    
        if (file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/bmp" && file.type != "image/webp") {
          return setInfo("PNG, JPEG, GIF, BMP et WEBP sonts les seuls formats acceptées.");
        }
        data.image = file;
      }
    }
    
    try {
      setWaiting(true);
      if (method === "post") await apiClient.post(action, data, { withCredentials: true, headers: { headers }});
      else if (method === "put") await apiClient.put(action, data, { withCredentials: true, headers: { headers }});
      else if (method === "delete") await apiClient.delete(action, { withCredentials: true });
      else throw new Error("Méthode invalide");
      onClose();
      navigate(redirection);
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : error.message;
      console.error(error);
      setInfo(errorMessage);
    }
    finally {
      setWaiting(false);
    }
  }

  return (
    <div className="modal" id={name}>
      <form className="modalWindow" onSubmit={handleSubmit(onSubmit)}>
        <div className="windowTitle">{ title }</div>
        { (onClose) ? <button onClick={onClose} type="button" className="windowClose lnr lnr-cross" aria-label="Fermer"></button> : "" }
        <div class="w100 textCentered">{message}</div>
        { fields.map((field) => {
          if (field.type === "text") {
            return(
              <><div key={ field.name + "Div" } className="formFieldLabel">
                <label key={ field.name + "Label" } htmlFor={ field.name + "Input" } className="formFieldLabel">{ field.label }</label>
                <input key={ field.name + "Input" } {...register(field.name, { value: field.value })} type={ field.type } className="formFieldInput FormFieldSection" id={ field.name + "Input" } />
              </div></>
            );
          } else if (field.type === "hidden") {
            return(<><input key={ field.name + "Input" } {...register(field.name, { value: field.value })} type={ field.type } id={ field.name + "Input" } /></>);
          }
        })
      }
      {info ? <p className="errorMessage">{info}</p> : ""}
      <div className="modalBottomButtons">
        {
          isWaiting ? <Spinner /> :
          <>
            { (onClose) ? <button onClick={onClose} className="buttonSecondary" type="button">Annuler</button> : "" }
            <button className="buttonPrimary" type="submit">{ buttonLabel }</button>;
          </>
        }
        </div>
      </form>
    </div>
  )
}

export default ModalForm;