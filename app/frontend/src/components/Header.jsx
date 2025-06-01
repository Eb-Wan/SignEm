import { useState } from 'react'
import Menu from './Menu'

const Header = ({ headerTitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const openMenu = ()=> {
    setMenuOpen(!isMenuOpen)
    !isMenuOpen ? document.querySelector("main").classList.add("shiftMain") : document.querySelector("main").classList.remove("shiftMain")
  }
      
  return (
    <>
      <header>
        <button onClick={ openMenu } className="buttonPrimary lnr lnr-menu" title="Ouvrir/fermer le menu" aria-label="Ouvrir/fermer le menu"></button>
        <Menu isOpened={ isMenuOpen } title="Naviguer"></Menu>
        <div className="headerTitle">{ headerTitle || "Titre" }</div>
      </header>
      
    </>
  )
}

export default Header