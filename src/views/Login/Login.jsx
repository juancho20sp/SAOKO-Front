import React from 'react';
import styles from './Login.module.scss';

// $
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/testSlice';

const handleSignInClick = (event, navigate) => {
  event.preventDefault();
  // $
  console.log('sign in clicked');
  navigate(routes.signIn.path);
};

const handleLogInClick = (event, navigate, dispatch) => {
  event.preventDefault();

  // $
  console.log('log in clicked');
  // TODO -> BORRAR
  // navigate(routes.home.path);
  dispatch(login());
};

const Login = () => {
  // $
  const navigate = useNavigate();

  // Redux
  const isLoggedIn = useSelector((state) => state.test.isLoggedIn);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`Redux test logged in: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <main className={styles['login-main']}>
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
            />
          </div>

          <div className={styles['login-formRow']}>
            <label htmlFor='loginPasswordInput'>Password</label>
            <input
              type='password'
              id='loginPasswordInput'
              placeholder='PASSWORD'
              className={styles['login-input']}
            />
          </div>

          <div className={styles['login-formRow_actions']}>
            <button
              className={styles['login-button']}
              onClick={(e) => handleSignInClick(e, navigate)}
            >
              Sign in
            </button>
            <button
              className={styles['login-button']}
              onClick={(e) => handleLogInClick(e, navigate, dispatch)}
            >
              Log in
            </button>
          </div>
        </form>

        <div className={styles['login-links']}>
          <a className={styles['login-link']}>Forgot your password?</a>
        </div>
      </div>
    </main>
  );
};

export default Login;
