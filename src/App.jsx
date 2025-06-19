import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConfirmationPage from './pages/ConfirmationPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';
import UserProfile from './pages/UserProfile';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';
import CreateEventPage from './pages/CreateEventPage';
import EvenementsPage from './pages/EvenementsPage';
import GuideUtilisateur from './pages/GuideUtilisateur';
import EvenementPage from './pages/EvenementPage';
import NouveauteDetail from './pages/NouveauteDetail';
import ProfilPage from './pages/ProfilPage';
import CGVPage from "./pages/CGVPage";



function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/guide-utilisateur" element={<GuideUtilisateur />} />
        <Route path="/cgv" element={<CGVPage />} />


        {/* Routes privées */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

         <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ProfilPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <UserProfile />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <MessagesPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/evenements"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <EvenementsPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

         <Route
          path="/evenements/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <EvenementPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="//nouveautes/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <NouveauteDetail />
              </PrivateLayout>
            </PrivateRoute>
          }
        />


        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ChatPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
