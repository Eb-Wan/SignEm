import { useEffect, useState } from 'react'
import Menu from './Menu'
import { useAppContext } from '../utils/AppContext';

const Header = () => {
  const { isLoggegIn, role } = useAppContext();
  let menuContents = [
    { label:"Paramètres", href: "#" },
  ];
  const menuOptions = {
    desktop: { autoOpen: true },
    mobile: {}
  };

  if (role === "Administrateur") {
    const menu = [
      { label:"Comptes", href: "/administrateur" },
      { label:"Paramètres", href: "/settings" },
      { label:"Se déconnecter", href: "/logout" }
    ];
    menuContents=[...menu]
  } else if (role === "Formateur") {
    const menu = [
      { label:"Émargements", href: "/formateur" },
      { label:"Paramètres", href: "/settings" },
      { label:"Se déconnecter", href: "/logout" }
    ];
    menu.forEach(e => menuContents.unshift(e));
  }

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [headerTitle, setTitle] = useState("Titre");
 

  useEffect(() => {
    setTimeout(() => setTitle(document.title.replace("SignEm - ", "")), 100);
  });

  const openMenu = ()=> {
    setMenuOpen(!isMenuOpen);
    !isMenuOpen ? document.querySelector("main").classList.add("shiftMain") : document.querySelector("main").classList.remove("shiftMain");
  }
  
  return (
    <>
      <header className="container">
        <button onClick={ openMenu } className="buttonPrimary lnr lnr-menu" title="Ouvrir/fermer le menu" aria-label="Ouvrir/fermer le menu"></button>
        <Menu id="headerMenu" isOpened={ isMenuOpen } contents={ menuContents } options={ menuOptions } title="Naviguer"></Menu>
        <div className="headerTitle">{ headerTitle }</div>
      </header>
    </>
  )
}

export default Header