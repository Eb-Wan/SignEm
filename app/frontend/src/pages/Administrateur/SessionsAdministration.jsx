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
  const [sessions, setSessions] = useState([]);
  const { nom, prenom } = useAppContext();

  const addFormFields = [
    { label: "Nom :", name: "nom", type:"text", required:true },
    { label: "Formation", name: "formationId", type:"select", options: formations.map(formation => ({ label: formation.nom, value: formation._id })) }
  ];

  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const tableHead = ["Nom", "Formation", "Actions"];
  const tableRows = [];

  const refreshSessions = () => {
    apiClient.get("/api/session/", { withCredentials: true })
    .then(response => setSessions(response.data.sessions))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    });
  }
  useEffect(() => {
    refreshSessions();
    apiClient.get("/api/formation/", { withCredentials: true })
    .then(response => setFormations(response.data.formations))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setErrorMessage(message);
    });
  }, []);

  const closeAddForm = (success) => {
    openAddForm(false);
    if (success) setInfoMessage("Session ajoutée"); refreshSessions();
  };
  const closeEditForm = (success) => {
    openEditForm("");
    if (success) setInfoMessage("Session modifiée"); refreshSessions();
  }
  const closeDeleteForm = (success) => {
    openDeleteForm("");
    if (success) setInfoMessage("Session supprimée"); refreshSessions();
  }

  return (
    <>
      <title>SignEm - Sessions Administration</title>
      { addForm ? <FormWindow action="/api/session/admin" method="post" title="Ajouter une session" width="800px" fields={ addFormFields } onClose={ closeAddForm }/> : "" }

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

      <button className="buttonPrimary" onClick={ ()=>openAddForm(true) }>Ajouter une session</button>
      { infoMessage ? <p className="successMessage">{ infoMessage }</p> : "" }
      { errorMessage ? <p className="errorMessage">{ errorMessage }</p> : "" }
      
      { sessions.length>0 ? <>

        { sessions.map((session) => {
          const formation = formations.filter(e => e._id == session.formationId)[0];
          tableRows.push([
            (session.nom),
            (formation ? formation.nom : ""),
            (<><button title="Supprimer" aria-label="Supprimer cette session" onClick={ () => openDeleteForm(session._id) } className="textLarge modalButton textRed lnr lnr-trash"></button>
            <button title="Modifier" aria-label="Modifier cette session" onClick={ () => openEditForm(session._id) } className="textLarge modalButton textBlue lnr lnr-pencil"></button></>)
          ]);
          const editFormFields = [
            { label: "Nom :", name: "nom", type:"text", value: session.nom, required:true },
            { label: "Formation", name: "formationId", type:"select", value: session.formationId, options: formations.map(formation => ({ label: formation.nom, value: formation._id })) }
          ];
          return (<React.Fragment key={ session._id }>
          { editForm==session._id ?
            <FormWindow
              action={ "/api/session/admin/"+session._id }
              method="put" title="Modifier une session" width="800px"
              fields={ editFormFields } onClose={ closeEditForm }
            /> : "" }
          { deleteForm==session._id ?
            <FormWindow
              action={ "/api/session/admin/"+session._id }
              method="delete" title="Modifier une session" width="800px"
              message={ <span class="errorMessage">Voulez-vous vraiment supprimer la session { session.nom } ?</span> }
              onClose={ closeDeleteForm }
            /> : "" }
          </React.Fragment>)
        })}
      </> : <p className="infoMessage">Aucune session trouvée</p>}
      <Table head={ tableHead } rows={ tableRows }/>
    </>
  )
}

export default DashBoard