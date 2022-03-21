import React from 'react';
import styles from './CreateTask.module.scss';

const CreateTask = ({ text, handleClick }) => {
  return (
    <button className={styles['createTask-button']} onClick={handleClick}>
      {text}
    </button>
  );
};

export default CreateTask;
