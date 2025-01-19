import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLoader from "./components/AppLoader";
import { auth } from "./firebase";
import Layout from "./Layouts";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";
import Login from './pages/Login';
import Profile from "./pages/Profile";
import SignUp from './pages/SignUp';
import NotFound from "./pages/NotFound";

function App() {
  const [user, isAuthenticating] = useAuthState(auth);

  if (isAuthenticating) {
    return (
      <AppLoader />
    )
  }

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const AuthRoute = ({ children }) => {
    return !user ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/createEvent" element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          } />
          <Route
            path="/event/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;