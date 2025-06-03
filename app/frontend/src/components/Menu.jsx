const Menu = ({ isOpened, contents, options }) => {
  return (
    <>
      {isOpened ?
        (
          <nav className="menu alignLeft active">
            <ul className="windowMenu">
              { contents.map((contents) => { return (
                <li className="menuItem" key={ contents.label.replace(" ", "-") }>
                  <a href={contents.href}>{contents.label}</a>
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