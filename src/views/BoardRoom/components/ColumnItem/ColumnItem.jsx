import React from 'react';
import styles from './ColumnItem.module.scss';

const ColumnItem = ({
  reference,
  children,
  draggableProps,
  dragHandleProps,
  snapshot,
  providedDraggablePropsStyle,
}) => {
  // $
  // // debugger;;

  // $
  React.useEffect(() => {
    if (snapshot.isDragging) {
      // // debugger;;
      console.log('dragging');
      return;
    }
  }, [snapshot]);

  return (
    <div
      className={styles['boardRoom-column_item']}
      ref={reference}
      {...draggableProps}
      {...dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? '#8884FF' : '',
        color: snapshot.isDragging ? 'white' : '',
        ...providedDraggablePropsStyle,
      }}
      // $
      onDragStart={(ev) => console.log(ev)}
    >
      {children}
    </div>
  );
};

export default ColumnItem;
