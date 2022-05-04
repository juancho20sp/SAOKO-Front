import React, { useState } from 'react';

// Routing
import { useNavigate } from 'react-router-dom';

// Utils
import swal from 'sweetalert';
import { post, routes } from '../../../utils';

// AWS
import UserPool from '../../../utils/aws/UserPool';

const useCreateAccount = () => {
    const navigate = useNavigate();
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState();
    const [cellphone, setCellphone] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
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
  
      // const url = `${process.env.REACT_APP_BACKEND_URL}/user/register`;
      // const data = {
      //   firstName,
      //   lastName,
      //   email,
      //   password: firstPassword,
  
      //   // $ -> remove
      //   cell: '32424345',
      //   role: 'test',
      // };
  
      setIsLoading(true);

      // $
      debugger;

      UserPool.signUp(
        email,
        firstPassword,
        [
          {
            Name: 'name',
            Value: firstName,
          },
          {
            Name: 'family_name',
            Value: lastName,
          },
          // {
          //   Name: 'phone_number',
          //   Value: cellphone,
          // },
        ],
        null,
        (err, data) => {
          setIsLoading(false);

          if (err) {
            console.error(err);
            setError(err);
            swal(
              'Algo salió mal',
              'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
              'error'
            );
          }

          if (data) {
            swal(
              'Usuario registrado exitosamente',
              'Ya puedes ingresar al sistema con tu cuenta',
              'success'
            );

            navigate(routes.login.path);
          }
        }
      )

  
      // try {
      //   const newUserData = await post(url, data);
  
      //   navigate(routes.login.path);
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   setIsLoading(false);
      // }
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