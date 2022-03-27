import React, { useEffect, useState } from 'react';
import styles from './BoardRoom.module.scss';

// Routing
import { useLocation } from 'react-router-dom';

// State Management
import { useDispatch, useSelector } from 'react-redux';
import {
  setConnected,
  BOARD,
  addCardToColumn,
  moveCard,
} from '../../redux/slices/roomSlice';

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

var stompClient = null;

const BoardRoom = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  // ------------- REAL TIME LOGIC ----------
  // TODO
  // CONSTANTS
  const URL = 'http://localhost:8080/ws';

  const columns = useSelector(
    (state) =>
      state.room.boardRooms.filter((room) => room.path === path)[0].columns
  );

  // States
  const [roomId, setRoomId] = useState(path);
  // const [columns, setColumns] = useState(reduxColumns);

  const [allCards, setAllCards] = useState(itemsFromBackend);

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

  useEffect(() => {
    console.log(columns);
  }, [columns]);

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

  const onDragStart = (cardId) => {
    console.log(cardId);
    console.log('start');
    const card = allCards.filter((card) => card.id === cardId);

    console.log(card);

    stompClient.send('/app/cardClicked', {}, JSON.stringify(card));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // $
    const payloadData = {
      result: result,
      columns: columns,
      path: path,
    };

    dispatch(moveCard(payloadData));

    // const { source, destination, draggableId } = result;

    // // $
    // debugger;

    // // --------

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[source.droppableId];
    //   const destinyColumn = columns[destination.droppableId];

    //   const sourceItems = [...sourceColumn.items];
    //   const destinyItems = [...destinyColumn.items];

    //   const [removed] = sourceItems.splice(source.index, 1);

    //   destinyItems.splice(destination.index, 0, removed);

    //   // const cards = [...allCards];
    //   // const card = cards.find((card) => card.id === draggableId);
    //   // card.status = destination.droppableId;

    //   // setAllCards([...cards]);

    //   // TODO -> pasar esta lógica a redux

    //   // dispatch(addCardToColumn());

    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destinyColumn,
    //       items: destinyItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];

    //   const copiedItems = [...column.items];

    //   const [removed] = copiedItems.splice(source.index, 1);

    //   copiedItems.splice(destination.index, 0, removed);

    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
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

    const cardData = JSON.parse(payload.body);

    // $
    console.log(cardData);

    // $
    debugger;

    const payloadInfo = {
      to: TO_DO,
      card: cardData,
      path: path,
    };

    // from, to, path, card

    dispatch(addCardToColumn(payloadInfo));

    // const items = [...columns['TO_DO'].items];

    // const newItems = [...items, cardData];

    // setColumns({
    //   ...columns,
    //   TO_DO: {
    //     ...columns['TO_DO'],
    //     items: newItems,
    //   },
    // });
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
              onDragStart={({ draggableId }) => onDragStart(draggableId)}
              onDragEnd={(res) => onDragEnd(res)}
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
