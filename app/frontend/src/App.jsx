import { useState } from "react" 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import DashboardAdministrateur from "./pages/DashboardAdministrateur"
import DashboardFormateur from "./pages/DashboardFormateur"
import DashboardStagiaire from "./pages/DashboardStagiaire"
import AuthProvider from "./utils/AuthProvider"
import AuthChecker from "./utils/AuthChecker"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Unauthorized from "./pages/Unauthorized"
import Redirect from "./pages/Redirect"
import PageNotFound from "./pages/PageNotFound"

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
                <Route path="/administrateur" element={ <AuthChecker role="Administrateur"><DashboardAdministrateur /></AuthChecker> } />
                <Route path="/formateur" element={ <AuthChecker role="Formateur"><DashboardFormateur /></AuthChecker> } />
                <Route path="/stagiaire" element={ <AuthChecker role="Stagiaire"><DashboardStagiaire /></AuthChecker> } />
                <Route path="/login" element={ <AuthChecker reverse="false"><Login/></AuthChecker> } />
                <Route path="/logout" element={ <AuthChecker><Logout/></AuthChecker> } />
                <Route path="/unauthorized" element={ <Unauthorized/> } />
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
