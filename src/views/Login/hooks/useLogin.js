import React, { useState } from 'react';

// Routing
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/loginSlice';

// Utils
import swal from 'sweetalert';
import { post, routes } from '../../../utils';

// Hooks
import { useAccount } from '../../../utils/hooks';


const useLogin = () => {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { authenticate, isLoading } = useAccount();
  
    const handleSignInClick = (event) => {
      event.preventDefault();
      navigate(routes.signIn.path);
    };
  
    const handleLogInClick = async (event) => {
      event.preventDefault();

      authenticate(email, password)
      .then((data) => {})
      .catch((err) => {
        console.error(err);

        if (Object.values(err).includes('UserNotConfirmedException')) {
          swal(
            '¡Debes confirmar tu cuenta!',
            'No puedes ingresar hasta que no confirmes tu cuenta',
            'error'
          );
        }
      });  
      // const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
      // const data = {
      //   email,
      // };
  
      // setIsLoading(true);
  
      // try {
      //   const loginData = await post(url, data);
  
      //   if (loginData) {
      //     dispatch(login(loginData));
      //     navigate(routes.home.path);
      //   }
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   setIsLoading(false);
      // }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogInClick(event);
      }
    }
  
    return {
      email,
      setEmail,
      password,
      setPassword,
      isLoading,
      // setIsLoading,
      handleLogInClick,
      handleSignInClick,
      handleKeyPress
    };
  };

  export default useLogin;