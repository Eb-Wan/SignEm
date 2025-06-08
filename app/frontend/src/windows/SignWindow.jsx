const SignWindow = (onClose) => {

  //Récuperer les stagiaires
  //Afficher un form pour selectionner les stagiaires
  //Afficher le carré pour signer
  // const stagiaires = 

  return (
    <div className="modal">
      <form className="modalWindow">
        <span className="windowTitle">Faire Signer</span>
        <span className="modalButtonsList gm">
          <button onClick={ onClose } title="Annuler" aria-label="Annuler" className="modalButton textRed lnr lnr-cross"></button>
          <button title="Valdier" aria-label="Valider" className="modalButton textGreen lnr lnr-chevron-down"></button>
        </span>
        <div className="formField">

        </div>

      </form>
    </div>
  )
}

export default SignWindow