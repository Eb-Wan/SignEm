// import { useState } from "react"
const Menu = ({ isOpened }) => {
  return (
    <>
      {isOpened ?
        (
          <nav className="menu left active">
            <ul className="windowMenu">
              <li className="menuItem active"><a href="#">Aujourd'hui</a></li>
              <li className="menuItem"><a href="#">Émargements</a></li>
              <li className="menuItem"><a href="#">Se déconnecter</a></li>
            </ul>
          </nav>
        ) : ""
      }
    </>
  )
}

export default Menu