import React, { useEffect, useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import FormWindow from "../../windows/FormWindow";
import apiClient from "../../AxiosConfig";
import Table from "../../components/Table";

const DashBoard = () => {
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addForm, openAddForm] = useState(false);
  const [editForm, openEditForm] = useState("");
  const [deleteForm, openDeleteForm] = useState("");
  const [formations, setFormations] = useState([]);
  const { nom, prenom } = useAppContext();

  const addFormFields = [
    { label: "Nom :", name: "nom", type:"text", required:true },
    { label: "Ouverte", name: "ouverte", type:"select", options: [
      { label:"Non", value:"false" },
      { label:"Oui", value:"true" }
    ]}
  ];

  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const tableHead = ["Nom", "Ouverte", "Actions"];
  const tableRows = [];

  const refreshFormations = () => {
    apiClient.get("/api/formation/", { withCredentials: true })
    .then(response => setFormations(response.data.formations))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    });
  }
  useEffect(() => refreshFormations(), []);

  const closeAddForm = (success) => {
    openAddForm(false);
    if (success) setInfoMessage("Formation ajoutée"); refreshFormations();
  };
  const closeEditForm = (success) => {
    openEditForm("");
    if (success) setInfoMessage("Formation modifiée"); refreshFormations();
  }
  const closeDeleteForm = (success) => {
    openDeleteForm("");
    if (success) setInfoMessage("Formation supprimée"); refreshFormations();
  }

  return (
    <>
      <title>SignEm - Formations Administration</title>
      { addForm ? <FormWindow action="/api/formation/admin" method="post" title="Ajouter une formation" width="800px" fields={ addFormFields } onClose={ closeAddForm }/> : "" }

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

      <button className="buttonPrimary" onClick={ ()=>openAddForm(true) }>Ajouter une formation</button>
      { infoMessage ? <p className="successMessage">{ infoMessage }</p> : "" }
      { errorMessage ? <p className="errorMessage">{ errorMessage }</p> : "" }
      
      { formations.length>0 ? <>

        { formations.map((formation) => {
          const formationOuverte = formation.ouverte === true ? 
          <><span className="textGreen textLarge lnr lnr-chevron-down"></span>Oui</> :
          <><span className="textRed textLarge lnr lnr-cross"></span>Non</>;
          tableRows.push([
            (formation.nom),
            formationOuverte,
            (<><button title="Supprimer" aria-label="Supprimer cette formation" onClick={ () => openDeleteForm(formation._id) } className="textLarge modalButton textRed lnr lnr-trash"></button>
            <button title="Modifier" aria-label="Modifier cette formation" onClick={ () => openEditForm(formation._id) } className="textLarge modalButton textBlue lnr lnr-pencil"></button></>)
          ]);
          const editFormFields = [...[
            { label: "Nom :", name: "nom", type:"text", value: formation.nom , required:true },
            { label: "Ouverte", name: "ouverte", type:"select", value: `${formation.ouverte}`, options: [
              { label:"Non", value:"false" },
              { label:"Oui", value:"true" }
            ]}
          ]];
          return (<React.Fragment key={ formation._id }>
          { editForm==formation._id ?
            <FormWindow
              action={ "/api/formation/admin/"+formation._id }
              method="put" title="Modifier un utilisateur" width="800px"
              fields={ editFormFields } onClose={ closeEditForm }
            /> : "" }
          { deleteForm==formation._id ?
            <FormWindow
              action={ "/api/formation/admin/"+formation._id }
              method="delete" title="Modifier un utilisateur" width="800px"
              message={ <span class="errorMessage">Voulez-vous vraiment supprimer la formation { formation.nom } ?</span> }
              onClose={ closeDeleteForm }
            /> : "" }
          </React.Fragment>)
        })}
      </> : <p className="infoMessage">Aucune formation trouvée</p>}
      <Table head={ tableHead } rows={ tableRows }/>
    </>
  )
}

export default DashBoard