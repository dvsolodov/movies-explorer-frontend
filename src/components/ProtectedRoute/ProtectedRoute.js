import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from '../../contexts/LoggedInContext';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const loggedIn = useContext(LoggedInContext);

  if (!loggedIn) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return children;
};
