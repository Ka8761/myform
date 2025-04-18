import ApplicationForm from "./pages/ApplicationForm";
import Login from "./pages/Login";
import RegisterForm from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Import your wrapper
import HomePage from './pages/HomePage'; // You can create this or reuse an existing component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ApplicationForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
