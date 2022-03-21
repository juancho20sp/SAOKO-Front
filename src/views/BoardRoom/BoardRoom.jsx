import React, { useState } from 'react';
import styles from './BoardRoom.module.scss';

// Components
import { CreateTask } from './components/';
import { Layout } from '../../components';

// Drag and drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

// $
const itemsFromBackend = [
  { id: uuidv4(), content: 'First task' },
  { id: uuidv4(), content: 'Second task' },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: 'To Do',
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    name: 'Done',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinyColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destinyItems = [...destinyColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);

    destinyItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinyColumn,
        items: destinyItems,
      },
    });
  } else {
    const column = columns[source.droppableId];

    const copiedItems = [...column.items];

    const [removed] = copiedItems.splice(source.index, 1);

    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const BoardRoom = () => {
  // Columns
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <Layout>
      <div className={styles['boardRoom-main']}>
        <div className={styles['boardRoom-container']}>
          <header className={styles['boardRoom-header']}>
            <div>
              <p>50 miembros</p>
            </div>

            <h2 className={styles['boardRoom-header_title']}>
              Nombre del tablero
            </h2>

            <CreateTask text={'Crear tarea'} />
          </header>

          <div className={styles['boardRoom-content']}>
            <DragDropContext
              onDragEnd={(res) => onDragEnd(res, columns, setColumns)}
            >
              {Object.entries(columns).map(([id, column]) => {
                console.log(column);
                return (
                  <div className={styles['boardRoom-columnContainer']}>
                    <h2 className={styles['boardRoom-column_title']}>
                      {column.name}
                    </h2>
                    <Droppable droppableId={id} key={id}>
                      {/* Snapshot: the thing i'm dragging */}
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            // $
                            className={styles['boardRoom-column']}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? '#FDE2FF'
                                : '',
                            }}
                          >
                            {column.items.map((item, idx) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={idx}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className={
                                          styles['boardRoom-column_item']
                                        }
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          backgroundColor: snapshot.isDragging
                                            ? '#8884FF'
                                            : '',
                                          color: snapshot.isDragging
                                            ? 'white'
                                            : '',
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}

                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BoardRoom;
