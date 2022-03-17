import React from 'react';

import styles from './AddRoom.module.scss';

// Components
import { IconContext } from 'react-icons';
import { GrAddCircle } from 'react-icons/gr';

const AddRoom = ({ handleClick }) => {
  return (
    <button className={styles['addRoom-main']} onClick={() => handleClick()}>
      <IconContext.Provider value={{ size: '4rem' }}>
        <GrAddCircle />
      </IconContext.Provider>
    </button>
  );
};

export default AddRoom;
