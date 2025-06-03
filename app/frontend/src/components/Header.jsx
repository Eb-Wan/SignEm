import { useState } from 'react'
import Menu from './Menu'

const Header = ({ headerTitle }) => {
  const menuContents = [
    { label:"Paramètres", href: "#" },
    { label:"Se déconnecter", href: "#" }
  ];
  const menuOptions = {
    desktop: { autoOpen: true },
    mobile: {}
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const openMenu = ()=> {
    setMenuOpen(!isMenuOpen)
    !isMenuOpen ? document.querySelector("main").classList.add("shiftMain") : document.querySelector("main").classList.remove("shiftMain")
  }
      
  return (
    <>
      <header className="container">
        <button onClick={ openMenu } className="buttonPrimary lnr lnr-menu" title="Ouvrir/fermer le menu" aria-label="Ouvrir/fermer le menu"></button>
        <Menu isOpened={ isMenuOpen } contents={ menuContents } options={ menuOptions } title="Naviguer"></Menu>
        <div className="headerTitle">{ headerTitle || "Titre" }</div>
      </header>
    </>
  )
}

export default Header