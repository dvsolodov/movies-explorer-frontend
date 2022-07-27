import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoggedInContext } from '../../contexts/LoggedInContext';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const loggedIn = useContext(LoggedInContext);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  return children;
};
