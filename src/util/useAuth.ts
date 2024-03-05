import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.loggedin);

  
  const isAuthenticated = token;

  return isAuthenticated;
};

export default useAuth;
