/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, useCurrentToken } from "../auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../../utils/verifyToken";
interface TPrivateRoute {
  children: ReactNode;
  role: string | undefined;
}
const PrivateRoute = ({ children, role }: TPrivateRoute) => {
  console.log(role);
  const token = useAppSelector(useCurrentToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
