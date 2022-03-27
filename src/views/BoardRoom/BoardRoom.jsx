import React, { useEffect, useState } from 'react';
import styles from './BoardRoom.module.scss';

// Routing
import { useLocation } from 'react-router-dom';

// State Management
import { useDispatch, useSelector } from 'react-redux';
import { setConnected, BOARD } from '../../redux/slices/roomSlice';

// Components
import { CreateTask, ColumnContainer, Column, ColumnItem } from './components/';
import { Layout } from '../../components';

// Drag and drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'net';

// Utils
import { socket } from '../../utils';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

// $
const TO_DO = 'TO_DO';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';

const itemsFromBackend = [
  { id: uuidv4(), content: 'First task', status: TO_DO },
  { id: uuidv4(), content: 'Second task', status: TO_DO },
];

const columnsFromBackend = {
  TO_DO: {
    name: 'To Do',
    items: [],
  },
  IN_PROGRESS: {
    name: 'In Progress',
    items: [],
  },
  DONE: {
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

var stompClient = null;

const BoardRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  // ------------- REAL TIME LOGIC ----------
  // TODO
  // CONSTANTS
  const URL = 'http://localhost:8080/ws';

  // States
  const [roomId, setRoomId] = useState(path);
  const [columns, setColumns] = useState(columnsFromBackend);

  // Redux
  const username = useSelector((state) => state.login.username);
  const isConnected = useSelector(
    (state) =>
      state.room.boardRooms.filter((room) => room.path === path)[0].isConnected
  );

  useEffect(() => {
    // $
    debugger;

    if (roomId) {
      connect();
    }
  }, [roomId]);

  const connect = () => {
    const sock = new SockJS(URL);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  const userJoin = () => {
    // $
    debugger;

    if (!isConnected) {
      dispatch(
        setConnected({
          type: BOARD,
          path: path,
          isConnected: true,
        })
      );
    }
  };

  const createNewCard = () => {
    if (stompClient) {
      const newCard = {
        id: uuidv4(),
        roomId: roomId,
        limitDate: 'HOY',
        content: 'New Card',
        cardStatus: 'TO_DO',
      };

      //$
      debugger;

      stompClient.send('/app/newCard', {}, JSON.stringify(newCard));
    }
  };

  // EVENTS
  const onConnected = () => {
    stompClient.subscribe('/user/' + roomId + '/newCard', onNewCard);
    stompClient.subscribe('/user/' + roomId + '/cardClicked', onCardClicked);
    stompClient.subscribe('/user/' + roomId + '/moveCard', onCardMoved);

    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const onNewCard = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);

    // $
    debugger;

    const items = [...columns['TO_DO'].items];

    const newItems = [...items, payloadData];

    setColumns({
      ...columns,
      TO_DO: {
        ...columns['TO_DO'],
        items: newItems,
      },
    });
  };

  const onCardClicked = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);
    // $
    debugger;
  };

  const onCardMoved = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);
    // $
    debugger;
  };

  // -----------------------------------------

  const handleAddTask = () => {
    createNewCard();
  };

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

            <CreateTask text={'Crear tarea'} handleClick={handleAddTask} />
          </header>

          <div className={styles['boardRoom-content']}>
            <DragDropContext
              onDragEnd={(res) => onDragEnd(res, columns, setColumns)}
            >
              {Object.entries(columns).map(([id, column]) => {
                console.log(column);
                return (
                  <ColumnContainer key={id} title={column.name}>
                    <Droppable droppableId={id} key={id}>
                      {/* Snapshot: the thing i'm dragging */}
                      {(provided, snapshot) => {
                        return (
                          <Column
                            reference={provided.innerRef}
                            snapshot={snapshot}
                            droppableProps={provided.droppableProps}
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
                                      <ColumnItem
                                        reference={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={
                                          provided.dragHandleProps
                                        }
                                        snapshot={snapshot}
                                        providedDraggablePropsStyle={
                                          provided.draggableProps.style
                                        }
                                      >
                                        {item.content}
                                      </ColumnItem>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}

                            {provided.placeholder}
                          </Column>
                        );
                      }}
                    </Droppable>
                  </ColumnContainer>
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
