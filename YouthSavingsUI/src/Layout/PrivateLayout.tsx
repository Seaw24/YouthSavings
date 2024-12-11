import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const PrivateLayout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.name ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateLayout;
