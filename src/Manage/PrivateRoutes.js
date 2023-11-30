import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const authen = window.localStorage.getItem("employee");

  return authen ? <Outlet /> : <Navigate to="/manage/login" />;
};

export default PrivateRoutes;
