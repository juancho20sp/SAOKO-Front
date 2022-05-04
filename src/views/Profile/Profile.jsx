import React, { useState } from 'react';

// Components
import { Layout } from '../../components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout as reduxLogout } from '../../redux/slices/loginSlice';

// Hooks
import { useAccount } from '../../utils/hooks';

// Elements
import swal from 'sweetalert';

import styles from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { getSession, logout } = useAccount();

  // Redux
  const { userData } = useSelector((state) => state.login);
  const fullName = `${userData.name} ${userData.family_name}`;

  // Password reset
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordTwo, setNewPasswordTwo] = useState('');

  const handleClick = (event) => {
    event.preventDefault();

    if (newPassword !== newPasswordTwo) {
      swal(
        'Las contraseñas no coinciden',
        'Por favor, inténtalo nuevamente',
        'error'
      );

      return;
    }

    getSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) {
          console.error(err);
          swal(
            'Algo salió mal',
            'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
            'error'
          );
        } else {
          console.log(result);
          swal(
            'Cambio de contraseña exitoso',
            'Desde ahora deberás utilizar tu nueva contraseña',
            'success'
          ).then(() => {
            logout();
            dispatch(reduxLogout());
          });
        }
      });
    });
  };

  return (
    <Layout>
      <main className={styles['profile-main']}>
        <div className={styles['profile-container']}>
          <h2 className={styles['profile-title']}>{fullName}</h2>

          <form className={styles['profile-form']}>
            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profileName'>Nombre</label>
                <input
                  type='text'
                  id='profileName'
                  placeholder='Diego'
                  value={userData.name}
                  className={styles['profile-input']}
                  disabled
                />
              </div>

              <div className={styles['profile-formInput']}>
                <label htmlFor='profileLastname'>Apellido</label>
                <input
                  type='text'
                  id='profileLastname'
                  placeholder='Triviño'
                  value={userData.family_name}
                  className={styles['profile-input']}
                  disabled
                />
              </div>
            </div>

            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profileEmail'>Email</label>
                <input
                  type='text'
                  id='profileEmail'
                  value={userData.email}
                  placeholder='mail@mail.com'
                  className={styles['profile-input']}
                  disabled
                />
              </div>

              {/* <div className={styles['profile-formInput']}>
                <label htmlFor='profilePhone'>Teléfono</label>
                <input
                  type='text'
                  id='profilePhone'
                  placeholder='+57 (352) 960 - 4545'

                  className={styles['profile-input']}
                />
              </div> */}
            </div>

            <div className={styles['profile-formRow']}>
              <h3 className={styles['profile-password_title']}>
                Cambiar contraseña
              </h3>
            </div>

            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profilePassword'>Contraseña antigua</label>
                <input
                  type='password'
                  id='profilePassword'
                  placeholder='password'
                  onChange={(e) => setPassword(e.target.value.trim())}
                  className={styles['profile-input']}
                />
              </div>

              <div className={styles['profile-formInput']}>
                <label htmlFor='profileNewPassword'>Nueva contraseña</label>
                <input
                  type='password'
                  id='profileNewPassword'
                  placeholder='password'
                  onChange={(e) => setNewPassword(e.target.value.trim())}
                  className={styles['profile-input']}
                />
              </div>
            </div>

            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profileConfirmPassword'>
                  Confirmar contraseña
                </label>
                <input
                  type='password'
                  id='profileConfirmPassword'
                  placeholder='password'
                  onChange={(e) => setNewPasswordTwo(e.target.value.trim())}
                  className={styles['profile-input']}
                />
              </div>

              <div className={styles['profile-button_container']}>
                <button
                  className={styles['profile-button']}
                  onClick={(e) => handleClick(e)}
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
