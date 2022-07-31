import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from '../../contexts/LoggedInContext';

export default function ForbiddenRoute({ children }) {
  const loggedIn = useContext(LoggedInContext);

  if (loggedIn) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return children;
};

