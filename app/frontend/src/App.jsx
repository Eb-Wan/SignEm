import { useState } from "react" 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Welcome from "./pages/Welcome"

function App() {
  const [isHeaderMenuOpen, openHeaderMenu] = useState(false);
  return (
    <>
        <Header></Header>
        <main>
          <Router>
            <Routes>
              <Route path="/" element={ <Welcome />} />
            </Routes>
          </Router>
        </main>
    </>
  )
}

export default App
