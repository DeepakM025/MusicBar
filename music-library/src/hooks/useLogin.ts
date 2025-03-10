import { useAuth } from '../context/AuthContext';

const useLogin = () => {
    const {login} = useAuth();

    return login;
};

export default useLogin;
