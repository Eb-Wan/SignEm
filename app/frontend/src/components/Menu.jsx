import { Link, useLocation } from "react-router-dom"

const Menu = ({ isOpened, contents, options, className, id }) => {
  const location = useLocation();
  return (
    <>
      {isOpened ?
        (
          <nav className="menu alignLeft active">
            <ul className="windowMenu">
              { contents.map((contents) => { return (
                <li className={ "menuItem" + (contents.href==location.pathname?" active":"") } key={ contents.label.replace(" ", "-") }>
                  <Link to={contents.href}>{contents.label}</Link>
                </li>
              )})}
            </ul>
          </nav>
        ) : ""
      }
    </>
  )
}

export default Menu