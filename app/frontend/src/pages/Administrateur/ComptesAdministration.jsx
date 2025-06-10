import React, { useEffect, useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import FormWindow from "../../windows/FormWindow";
import apiClient from "../../AxiosConfig";
import Table from "../../components/Table";

const DashBoard = () => {
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addUser, openAddUser] = useState(false);
  const [editUser, openEditUser] = useState("");
  const [deleteUser, openDeleteUser] = useState("");
  const [comptes, setComptes] = useState([]);
  const { nom, prenom } = useAppContext();

  const addUserFormFields = [
    { label: "Nom :", name: "nom", type:"text", required:true },
    { label: "Prénom :", name: "prenom", type:"text", required:true },
    { label: "Numéro de téléphone :", name: "tel", type:"text", required:true },
    { label: "Adresse e-mail :", name: "email", type:"email", required:true },
    { label: "Mot de passe :", name: "mdp", type:"password", required:true },
    { label: "Comfirmer mot de passe :", name: "mdpCheck", type:"password", required:true },
    { label: "Role :", name: "role", type:"select", options: [
      { label:"Aucun droits d'accès", value:"SansDroits" },
      { label:"Stagiaire", value:"Stagiaire" },
      { label:"Formateur", value:"Formateur" },
      { label:"Administrateur", value:"Administrateur" }
    ] }
  ];

  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const compteTableHead = ["Nom", "Prénom", "E-Mail", "Téléphone", "Rôle", "Actions"];
  const compteTableRows = [];

  const refreshUsers = () => {
    apiClient.get("/api/compte/admin/list", { withCredentials: true })
    .then(response => setComptes(response.data.comptes))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    });
  }
  useEffect(() => refreshUsers(), []);

  const closeAddUser = (success) => {
    openAddUser(false);
    if (success) setInfoMessage("Utilisateur ajouté"); refreshUsers();
  };
  const closeEditUser = (success) => {
    openEditUser("");
    if (success) setInfoMessage("Utilisateur modifié"); refreshUsers();
  }
  const closeDeleteUser = (success) => {
    openDeleteUser("");
    if (success) setInfoMessage("Utilisateur supprimé"); refreshUsers();
  }

  return (
    <>
      <title>SignEm - Comptes Administration</title>
      { addUser ? <FormWindow action="/api/compte/admin" method="post" title="Ajouter un utilisateur" width="800px" fields={ addUserFormFields } onClose={ closeAddUser }/> : "" }

      <div className="title w100 row justifyBetween mobileColumn">
          <span className="row alignCenter">
            <span title="Compte" className="lnr lnr-user mm"></span>
            <span className="uppercase">{ nom }</span>&nbsp;<span>{ prenom }</span>
          </span>
          <span className="row alignCenter">
            <span title="Aujourd'hui" className="lnr lnr-calendar-full mm"></span>
            <span className="capitalize">{ new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions) }</span>
          </span>
      </div>
      <button className="buttonPrimary" onClick={ ()=>openAddUser(true) }>Ajouter un compte</button>
      { infoMessage ? <p className="successMessage">{ infoMessage }</p> : "" }
      { errorMessage ? <p className="errorMessage">{ errorMessage }</p> : "" }
      
      { comptes.map((compte) => {
        compteTableRows.push([
          (<span className="uppercase">{ compte.nom }</span>),
          (<span>{ compte.prenom }</span>),
          (<span>{ compte.email }</span>),
          (<span>{ compte.tel }</span>),
          (<span>{ compte.role }</span>),
          (<><button title="Supprimer" aria-label="Supprimer cet utilisateur" onClick={ () => openDeleteUser(compte._id) } className="textLarge modalButton textRed lnr lnr-trash"></button>
          <button title="Modifier" aria-label="Modifier cet utilisateur" onClick={ () => openEditUser(compte._id) } className="textLarge modalButton textBlue lnr lnr-pencil"></button></>)
        ]);
        const editUserFormFields = [...[
          { label: "Nom :", name: "nom", type:"text", value: compte.nom, required:true },
          { label: "Prénom :", name: "prenom", type:"text", value: compte.prenom, required:true },
          { label: "Numéro de téléphone :", name: "tel", type:"text", value: compte.tel, required:true },
          { label: "Adresse e-mail :", name: "email", type:"email", value: compte.email, required:true },
          { label: "Role :", name: "role", type:"select", value: compte.role, options: [
            { label:"Aucun droits d'accès", value:"SansDroits" },
            { label:"Stagiaire", value:"Stagiaire" },
            { label:"Formateur", value:"Formateur" },
            { label:"Administrateur", value:"Administrateur" }
          ] }
        ]];
        return (<React.Fragment key={ compte._id }>
         { editUser==compte._id ?
          <FormWindow
            action={ "/api/compte/admin/"+compte._id }
            method="put" title="Modifier un utilisateur" width="800px"
            fields={ editUserFormFields } onClose={ closeEditUser }
          /> : "" }
         { deleteUser==compte._id ?
          <FormWindow
            action={ "/api/compte/admin/"+compte._id }
            method="delete" title="Modifier un utilisateur" width="800px"
            message={ <span class="errorMessage">Voulez-vous vraiment supprimer le compte de <span className="uppercase">{compte.nom}</span>&nbsp;{compte.prenom} ?</span> }
            onClose={ closeDeleteUser }
          /> : "" }
        </React.Fragment>)
      })}
      <Table head={ compteTableHead } rows={ compteTableRows }/>
    </>
  )
}

export default DashBoard