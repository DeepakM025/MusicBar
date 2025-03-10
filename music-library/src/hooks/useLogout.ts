import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const {logout} = useAuth();
  return logout;
};

export default useLogout;
