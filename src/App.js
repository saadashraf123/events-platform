import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from './pages/Dashboard';
import EventDetails from "./pages/EventDetails";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [user] = useAuthState(auth);

  console.log(user, "saaddddd")

  const ProtectedRoutes = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/create" element={
          <ProtectedRoutes>
            <CreateEvent />
          </ProtectedRoutes>
        } />
        <Route
          path="/event/:id"
          element={
            <ProtectedRoutes>
              <EventDetails />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;