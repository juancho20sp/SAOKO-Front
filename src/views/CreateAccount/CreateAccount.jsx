import React from 'react';
import styles from './CreateAccount.module.scss';

const CreateAccount = () => {
  return (
    <main className={styles['createAccount-main']}>
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
              />
            </div>

            <div className={styles['createAccount-formInput']}>
              <label htmlFor='createAccountLastname'>Apellido</label>
              <input
                type='text'
                id='createAccountLastname'
                placeholder='Triviño'
                className={styles['createAccount-input']}
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
              />
            </div>

            <div className={styles['createAccount-formInput']}>
              <label htmlFor='createAccountPhone'>Teléfono</label>
              <input
                type='text'
                id='createAccountPhone'
                placeholder='+57 (352) 960 - 4545'
                className={styles['createAccount-input']}
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
              />
            </div>
          </div>

          <div className={styles['createAccount-formRow_actions']}>
            <button
              className={styles['createAccount-button']}
              //   onClick={(e) => handleSignInClick(e, navigate)}
            >
              Limpiar datos
            </button>
            <button
              className={styles['createAccount-button']}
              //   onClick={(e) => handleLogInClick(e, navigate)}
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateAccount;
