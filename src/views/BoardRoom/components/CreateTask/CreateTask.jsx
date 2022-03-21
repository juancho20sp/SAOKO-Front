import React from 'react';
import styles from './CreateTask.module.scss';

const CreateTask = ({ text }) => {
  return <button className={styles['createTask-button']}>{text}</button>;
};

export default CreateTask;
