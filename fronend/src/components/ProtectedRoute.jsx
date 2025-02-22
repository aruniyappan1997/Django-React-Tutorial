import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setAuthorized] = useState(null);

// Calling the auth function if no valid auth token is there 
// then it wait for refresh token to get if there is any issue then it catch the error
  useEffect(() => {
    auth().catch(() => setAuthorized(false));
  }, [])

  // Generating the new access token from the refresh token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setAuthorized(false);
    }
  };

  // Authentication Logic
  const auth = async () => {
    // Try to access the toke from the local storage
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Since we want time in seconds

    if (tokenExpiration < now) {
      // Need to wait unit the refresh token func is implemented
      await refreshToken();
    } else {
      // You are authorized
      setAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
