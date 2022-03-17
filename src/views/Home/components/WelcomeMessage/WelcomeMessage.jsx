import React from 'react';

// Router
import { routes } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

import styles from './WelcomeMessage.module.scss';

const handleClick = (navigate) => {
  navigate(routes.chats.path);
};

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['welcomeMessage-main']}>
      <h4 className={styles['welcomeMessage-title']}>¡Bienvenido a SAOKO!</h4>
      <p className={styles['welcomeMessage-content']}>
        La plataforma que te permitirá comunicarte en tiempo real con tus
        compañeros y usar diferentes herramientas para facilitar el trabajo en
        equipo
      </p>

      <button
        className={styles['welcomeMessage-button']}
        onClick={() => handleClick(navigate)}
      >
        Empieza a chatear
      </button>
    </div>
  );
};

export default WelcomeMessage;
