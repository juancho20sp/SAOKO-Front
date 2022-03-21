import React from 'react';
import styles from './Column.module.scss';

const Column = ({ reference, snapshot, droppableProps, children }) => {
  return (
    <div
      {...droppableProps}
      // $
      className={styles['boardRoom-column']}
      ref={reference}
      style={{
        background: snapshot.isDraggingOver ? '#FDE2FF' : '',
      }}
    >
      {children}
    </div>
  );
};

export default Column;
