import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"

import DashboardAdministrateur from "./pages/Administrateur/DashboardAdministrateur"
import ComptesAdminitration from "./pages/Administrateur/ComptesAdministration"
import FormationsAdministration from "./pages/Administrateur/FormationsAdministration"
import SessionsAdministration from "./pages/Administrateur/SessionsAdministration"

import DashboardFormateur from "./pages/DashboardFormateur"
import DashboardStagiaire from "./pages/Stagiaire/DashboardStagiaire"
import SignatureStagiaire from "./pages/Stagiaire/SignatureStagiaire"
import AppContext from "./utils/AppContext"
import AuthChecker from "./utils/AuthChecker"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Unauthorized from "./pages/Unauthorized"
import Redirect from "./pages/Redirect"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <Router>
      <AppContext>
        <Header></Header>
        <div className="container">
          <main className="window element">
              <Routes>
                <Route path="/" element={ <Redirect/> } />
                <Route path="/administrateur" element={ <AuthChecker accessRole="Administrateur"><DashboardAdministrateur /></AuthChecker> } />
                <Route path="/administrateur/comptes" element={ <AuthChecker accessRole="Administrateur"><ComptesAdminitration /></AuthChecker> } />
                <Route path="/administrateur/formations" element={ <AuthChecker accessRole="Administrateur"><FormationsAdministration /></AuthChecker> } />
                <Route path="/administrateur/sessions" element={ <AuthChecker accessRole="Administrateur"><SessionsAdministration /></AuthChecker> } />
                <Route path="/formateur" element={ <AuthChecker accessRole="Formateur"><DashboardFormateur /></AuthChecker> } />
                <Route path="/stagiaire" element={ <AuthChecker accessRole="Stagiaire"><DashboardStagiaire /></AuthChecker> } />
                <Route path="/stagiaire/signer" element={ <AuthChecker accessRole="Stagiaire"><SignatureStagiaire /></AuthChecker> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/logout" element={ <AuthChecker><Logout/></AuthChecker> } />
                <Route path="/unauthorized" element={ <Unauthorized/> } />
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
          </main>
        </div>
      </AppContext>
    </Router>
  )
}

export default App
