import React from 'react';

// Components
import { Layout } from '../../components';

import styles from './Profile.module.scss';

const handleClick = (event) => {
  event.preventDefault();
  console.log('changing password');
};

const Profile = () => {
  return (
    <Layout>
      <main className={styles['profile-main']}>
        <div className={styles['profile-container']}>
          <h2 className={styles['profile-title']}>Todo: Nombre</h2>

          <form className={styles['profile-form']}>
            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profileName'>Nombre</label>
                <input
                  type='text'
                  id='profileName'
                  placeholder='Diego'
                  className={styles['profile-input']}
                />
              </div>

              <div className={styles['profile-formInput']}>
                <label htmlFor='profileLastname'>Apellido</label>
                <input
                  type='text'
                  id='profileLastname'
                  placeholder='Triviño'
                  className={styles['profile-input']}
                />
              </div>
            </div>

            <div className={styles['profile-formRow']}>
              <div className={styles['profile-formInput']}>
                <label htmlFor='profileEmail'>Email</label>
                <input
                  type='text'
                  id='profileEmail'
                  placeholder='mail@mail.com'
                  className={styles['profile-input']}
                />
              </div>

              <div className={styles['profile-formInput']}>
                <label htmlFor='profilePhone'>Teléfono</label>
                <input
                  type='text'
                  id='profilePhone'
                  placeholder='+57 (352) 960 - 4545'
                  className={styles['profile-input']}
                />
              </div>
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
                  className={styles['profile-input']}
                />
              </div>

              <div className={styles['profile-formInput']}>
                <label htmlFor='profileNewPassword'>Nueva contraseña</label>
                <input
                  type='password'
                  id='profileNewPassword'
                  placeholder='password'
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
