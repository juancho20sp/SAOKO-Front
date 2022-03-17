import React from 'react';
import styles from './Input.module.scss';

const Input = () => {
  return (
    <input
      className={styles['modal-input']}
      type='text'
      placeholder='A2R7FG9'
    />
  );
};

export default Input;
