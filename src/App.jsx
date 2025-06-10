import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

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

        {/* Route dynamique utilisateur */}
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
      </Routes>
    </Router>
  );
}

export default App;
