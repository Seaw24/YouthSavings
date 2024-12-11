import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return useContext(AuthContext);
};

export default useAuth;
