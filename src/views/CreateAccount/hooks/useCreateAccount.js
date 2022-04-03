import React, { useState } from 'react';

// Routing
import { useNavigate } from 'react-router-dom';

// Utils
import { post, routes } from '../../../utils';

const useCreateAccount = () => {
    const navigate = useNavigate();
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const cleanUpData = (event) => {
      event.preventDefault();
  
      setFirstName('');
      setLastName('');
      setEmail('');
      setCellphone('');
      setFirstPassword('');
      setSecondPassword('');
    };
  
    const createAccount = async (event) => {
      event.preventDefault();
  
      if (firstPassword !== secondPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/register`;
      const data = {
        firstName,
        lastName,
        email,
        password: firstPassword,
  
        // $ -> remove
        cell: '32424345',
        role: 'test',
      };
  
      setIsLoading(true);
  
      try {
        const newUserData = await post(url, data);
  
        navigate(routes.login.path);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      email,
      setEmail,
      cellphone,
      setCellphone,
      firstPassword,
      setFirstPassword,
      secondPassword,
      setSecondPassword,
      isLoading,
      setIsLoading,
      cleanUpData,
      createAccount,
    };
  };

  export default useCreateAccount;