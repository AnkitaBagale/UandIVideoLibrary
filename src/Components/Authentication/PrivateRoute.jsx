import { Navigate, Route } from "react-router-dom";
import { useAuthentication } from "../../Context";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserLoggedIn } = useAuthentication();

  return isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
