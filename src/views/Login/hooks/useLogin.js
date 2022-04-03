import React, { useState } from 'react';

// Routing
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/loginSlice';

// Utils
import { post, routes } from '../../../utils';


const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    // $ 
    // TODO -> clean this before deploy
    const [email, setEmail] = useState('frailejonxddx@gmail.com');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSignInClick = (event) => {
      event.preventDefault();
      // $
      console.log('sign in clicked');
      navigate(routes.signIn.path);
    };
  
    const handleLogInClick = async (event) => {
      event.preventDefault();
  
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
      const data = {
        email,
      };
  
      setIsLoading(true);
  
      try {
        const loginData = await post(url, data);
  
        if (loginData) {
          dispatch(login(loginData));
          navigate(routes.home.path);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      email,
      setEmail,
      password,
      setPassword,
      isLoading,
      setIsLoading,
      handleLogInClick,
      handleSignInClick,
    };
  };

  export default useLogin;