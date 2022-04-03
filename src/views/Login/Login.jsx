import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';

// Components
import { Loader } from '../../components';

// Hooks
import { useLogin } from './hooks';

const Login = () => {
  const {
    isLoading,
    setIsLoading,
    setEmail,
    setPassword,
    handleSignInClick,
    handleLogInClick,
  } = useLogin();

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  return (
    <main className={styles['login-main']}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['login-container']}>
          <h1 className={styles['login-title']}>Saoko</h1>

          <form className={styles['login-form']}>
            <div className={styles['login-formRow']}>
              <label htmlFor='loginEmailInput'>Email</label>
              <input
                type='text'
                id='loginEmailInput'
                placeholder='mail@mail.com'
                className={styles['login-input']}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>

            <div className={styles['login-formRow']}>
              <label htmlFor='loginPasswordInput'>Password</label>
              <input
                type='password'
                id='loginPasswordInput'
                placeholder='PASSWORD'
                className={styles['login-input']}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>

            <div className={styles['login-formRow_actions']}>
              <button
                className={styles['login-button']}
                onClick={(e) => handleSignInClick(e)}
              >
                Sign in
              </button>
              <button
                className={styles['login-button']}
                onClick={(e) => handleLogInClick(e)}
              >
                Log in
              </button>
            </div>
          </form>

          <div className={styles['login-links']}>
            <a className={styles['login-link']}>Forgot your password?</a>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
