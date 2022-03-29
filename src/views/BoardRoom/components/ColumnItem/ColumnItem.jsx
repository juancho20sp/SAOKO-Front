import React from 'react';
import styles from './ColumnItem.module.scss';

// State Management
import { useSelector } from 'react-redux';
// import {
//   setConnected,
//   BOARD,
//   addCardToColumn,
//   moveCard,
//   setActiveCardId,
// } from '../../redux/slices/roomSlice';

const ColumnItem = ({
  reference,
  children,
  draggableProps,
  dragHandleProps,
  snapshot,
  providedDraggablePropsStyle,

  // $
  cardId,
  activeId,
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

  // Redux
  // const activeCardIds = useSelector((state) => state.room.activeCardIds);
  // const isActive = activeCardIds.filter((id) => id === cardId);

  React.useEffect(() => {
    debugger;
  }, []);

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

        // $
        // opacity: isActive.length > 0 ? '0.3' : '1',
      }}
      // $
      onDragStart={(ev) => console.log(ev)}
    >
      {children}
    </div>
  );
};

export default ColumnItem;
