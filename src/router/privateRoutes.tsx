import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ logged }: { logged: string }) => {
  if (!logged) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
