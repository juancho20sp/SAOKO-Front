import React from 'react';
import styles from './Input.module.scss';

// Redux
import { useDispatch } from 'react-redux';
import { setNewRoomCode } from '../../../../redux/slices/roomSlice';

const Input = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();

    dispatch(setNewRoomCode(event.target.value));
  };

  return (
    <input
      className={styles['modal-input']}
      type='text'
      placeholder='A2R7FG9'
      onChange={handleChange}
    />
  );
};

export default Input;
