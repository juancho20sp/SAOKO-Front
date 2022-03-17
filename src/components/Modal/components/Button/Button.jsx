import React from 'react';
import styles from './Button.module.scss';

/**
 *
 * @param {String} The title of the button
 * @param {Function} The function to be excuted when the button is clicked, setted by parent
 * @returns
 */
const Button = ({ title, handleClick }) => {
  return (
    <button className={styles['modal-button']} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
