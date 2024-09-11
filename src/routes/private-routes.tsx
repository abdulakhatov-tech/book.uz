// import { useAppSelector } from "@/hooks/useRedux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  //   const { isAuthed } = useAppSelector((state) => state.auth);
  const isAuthed = false;

  return isAuthed ? children : <Navigate to='/' replace />
};

export default PrivateRoute;
