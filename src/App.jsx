import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers /Login */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Pages protégées avec layout contenant la navbar */}
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
      </Routes>
    </Router>
  );
}

export default App;
