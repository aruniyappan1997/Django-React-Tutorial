import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  // Need to clear any existing token in the browser caches before registering
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      {/* Overall Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Logout Page */}
        <Route path="/logout" element={<Logout />} />
        {/* Register Page */}
        <Route path="/register" element={<RegisterAndLogout />} />
        {/* Not Found Page */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;