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
import { BsSlack } from 'react-icons/bs';

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
  const URL = process.env.REACT_APP_REALTIME_URL;

  const columns = useSelector(
    (state) =>
      state.room.boardRooms.filter((room) => room.path === path)[0].columns
  );

  // States
  const [roomId, setRoomId] = useState(path);
  const [activeId, setActiveId] = useState('');
  const activeCardRef = React.useRef(null);

  useEffect(() => {
    if (activeCardRef.current) {
      console.log(activeCardRef.current);
      // activeCardRef.current.style.background = 'black';
    }
  }, [activeCardRef]);

  useEffect(() => {
    console.log(`Active ID: ${activeId}`);
  }, [activeId]);
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
    // debugger;;

    if (roomId && !isConnected) {
      connect();
    }
  }, [roomId]);

  useEffect(() => {
    console.log(columns);
    const cards = [
      ...new Set(
        Object.keys(columns).reduce((acc, actual) => {
          return [...acc, ...columns[actual].items];
        }, [])
      ),
    ];

    console.log(cards);

    setAllCards(cards);
  }, [columns]);

  const connect = () => {
    const sock = new SockJS(URL);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  const userJoin = () => {
    // $
    // debugger;;

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
    const card = allCards.filter((card) => card.id === cardId)[0];

    // $
    // debugger;;
    setActiveId(cardId);
    // dispatch(setActiveCardId(cardId));

    stompClient.send('/app/cardClicked', {}, JSON.stringify(card));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const cardDiv = document.querySelectorAll(
      `[data-rbd-draggable-id='${activeId}']`
    )[0];

    if (cardDiv) {
      cardDiv.style.background = '';

      // setTimeout(() => {
      //   cardDiv.style.background = '';
      // }, 1500);
    }

    setActiveId('');

    // $
    const payloadData = {
      result: result,
      columns: columns,
      path: path,
    };

    dispatch(moveCard(payloadData));

    // $
    debugger;
    const card = allCards.filter((card) => card.id === result.draggableId)[0];
    // card.cardStatus = result.destination.droppableId;

    const newCard = { ...card };
    newCard.resultData = JSON.stringify(payloadData);

    stompClient.send('/app/cardClickedEnd', {}, JSON.stringify(newCard));
    stompClient.send('/app/moveCard', {}, JSON.stringify(newCard));
  };

  const createNewCard = () => {
    if (stompClient) {
      // $
      // debugger;

      const newCard = {
        id: uuidv4(),
        roomId: roomId,
        limitDate: 'HOY',
        content: `New Card #${columns.TO_DO.items.length + 1} from ${username}`,
        cardStatus: 'TO_DO',
      };

      //$
      // debugger;;

      stompClient.send('/app/newCard', {}, JSON.stringify(newCard));
    }
  };

  // EVENTS
  const onConnected = () => {
    stompClient.subscribe('/user/' + roomId + '/newCard', onNewCard);
    stompClient.subscribe('/user/' + roomId + '/cardClicked', onCardClicked);
    stompClient.subscribe(
      '/user/' + roomId + '/cardClickedEnd',
      onCardClickedEnd
    );
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
    // debugger;;

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
    // debugger;

    // dispatch(setActiveCardId(payloadData.id));

    console.log(activeCardRef.current);

    const cardDiv = document.querySelectorAll(
      `[data-rbd-draggable-id='${payloadData.id}']`
    )[0];

    if (cardDiv) {
      cardDiv.style.background = '#8884FF';
      cardDiv.style.pointerEvents = 'none';

      // setTimeout(() => {
      //   cardDiv.style.background = '';
      // }, 1500);
    }

    console.log('CARD CLICKED CHANGE STYLES');
  };

  const onCardClickedEnd = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);

    // dispatch(setActiveCardId(payloadData.id));

    const cardDiv = document.querySelectorAll(
      `[data-rbd-draggable-id='${payloadData.id}']`
    )[0];

    if (cardDiv) {
      cardDiv.style.background = '';
      cardDiv.style.pointerEvents = '';

      // setTimeout(() => {
      //   cardDiv.style.background = '';
      // }, 1500);
    }
  };

  const onCardMoved = (payload) => {
    console.log(payload);

    const payloadData = JSON.parse(payload.body);
    payloadData.resultData = JSON.parse(payloadData.resultData);

    dispatch(moveCard(payloadData));
    // $
    // debugger;;
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
                                    // debugger;
                                    return (
                                      // <div
                                      //   ref={
                                      //     activeId ===
                                      //     provided.draggableProps[
                                      //       'data-rbd-draggable-id'
                                      //     ]
                                      //       ? activeCardRef
                                      //       : null
                                      //   }
                                      // >
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
                                        // $
                                        cardId={
                                          provided.draggableProps[
                                            'data-rbd-draggable-id'
                                          ]
                                        }
                                        activeId={activeId}
                                        // ref={
                                        //   id == activeId ? activeCardRef : null
                                        // }
                                      >
                                        {item.content}
                                      </ColumnItem>
                                      // </div>
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
