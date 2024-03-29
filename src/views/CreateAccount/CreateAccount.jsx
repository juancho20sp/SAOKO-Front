import React, { useEffect } from 'react';

// Hooks
import { UseCreateAccount } from './hooks';

// Components
import { Loader } from '../../components';

import styles from './CreateAccount.module.scss';

const CreateAccount = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    firstPassword,
    setFirstPassword,
    secondPassword,
    setSecondPassword,
    isLoading,
    setIsLoading,
    cleanUpData,
    createAccount,
    handleKeyPress,
  } = UseCreateAccount();

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  return (
    <main className={styles['createAccount-main']}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['createAccount-container']}>
          <h2 className={styles['createAccount-title']}>Crear Cuenta</h2>

          <form className={styles['createAccount-form']}>
            <div className={styles['createAccount-formRow']}>
              <div className={styles['createAccount-formInput']}>
                <label htmlFor='createAccountName'>Nombre</label>
                <input
                  type='text'
                  id='createAccountName'
                  placeholder='Diego'
                  className={styles['createAccount-input']}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value.trim())}
                />
              </div>

              <div className={styles['createAccount-formInput']}>
                <label htmlFor='createAccountLastname'>Apellido</label>
                <input
                  type='text'
                  id='createAccountLastname'
                  placeholder='Triviño'
                  className={styles['createAccount-input']}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.trim())}
                />
              </div>
            </div>

            <div className={styles['createAccount-formRow']}>
              <div className={styles['createAccount-formInput']}>
                <label htmlFor='createAccountEmail'>Email</label>
                <input
                  type='text'
                  id='createAccountEmail'
                  placeholder='mail@mail.com'
                  className={styles['createAccount-input']}
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
            </div>

            <div className={styles['createAccount-formRow']}>
              <div className={styles['createAccount-formInput']}>
                <label htmlFor='createAccountPassword'>Contraseña</label>
                <input
                  type='password'
                  id='createAccountPassword'
                  placeholder='password'
                  className={styles['createAccount-input']}
                  value={firstPassword}
                  onChange={(e) => setFirstPassword(e.target.value.trim())}
                />
              </div>

              <div className={styles['createAccount-formInput']}>
                <label htmlFor='createAccountConfirmPassword'>
                  Confirmar contraseña
                </label>
                <input
                  type='password'
                  id='createAccountConfirmPassword'
                  placeholder='password'
                  className={styles['createAccount-input']}
                  value={secondPassword}
                  onChange={(e) => setSecondPassword(e.target.value.trim())}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div className={styles['createAccount-formRow_actions']}>
              <button
                className={styles['createAccount-button']}
                onClick={(e) => cleanUpData(e)}
              >
                Limpiar datos
              </button>
              <button
                className={styles['createAccount-button']}
                onClick={(e) => createAccount(e)}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default CreateAccount;
