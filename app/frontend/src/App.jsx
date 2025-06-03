import { useState } from "react" 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import DashboardAdministrateur from "./pages/DashboardAdministrateur"
import DashboardFormateur from "./pages/DashboardFormateur"
import DashboardStagiaire from "./pages/DashboardStagiaire"
import AuthProvider from "./utils/AuthProvider"
import AuthChecker from "./utils/AuthChecker"
import Login from "./pages/Login"
import Unauthorized from "./pages/Unauthorized"
import Redirect from "./pages/Redirect"

function App() {
  const [isHeaderMenuOpen, openHeaderMenu] = useState(false);
  return (
    <Router>
      <AuthProvider>
        <Header></Header>
        <div className="container">
          <main className="window container">
              <Routes>
                <Route path="/" element={ <Redirect/> } />
                <Route path="/administateur" element={ <AuthChecker role="Administateur"><DashboardFormateur /></AuthChecker> } />
                <Route path="/formateur" element={ <AuthChecker role="Formateur"><DashboardFormateur /></AuthChecker> } />
                <Route path="/stagiaire" element={ <AuthChecker role="Stagiaire"><DashboardStagiaire /></AuthChecker> } />
                <Route path="/login" element={ <AuthChecker reverse="true"><Login/></AuthChecker> } />
                <Route path="/unauthorized" element={ <Unauthorized/> } />
              </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
