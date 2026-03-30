import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../RTKThunk/authSelectors";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
