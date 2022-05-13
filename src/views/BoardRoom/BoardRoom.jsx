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
import { Layout, Loader } from '../../components';

// Drag and drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

// Utils
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

// Hooks
import { useRoomPath } from '../../utils/hooks';

var stompClient = null;

const useBoardRoomConstants = () => {
  const URL = process.env.REACT_APP_REALTIME_URL;

  const status = {
    TO_DO: 'TO_DO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
  };

  return {
    URL,
    status,
  };
};

const useBoardRoomProps = ({ path }) => {
  const username = useSelector((state) => state.login.username);

  const columns = useSelector(
    (state) =>
      state.room.boardRooms.filter((room) => room.path === path)[0].columns
  );

  const isConnected = useSelector(
    (state) =>
      state.room.boardRooms.filter((room) => room.path === path)[0].isConnected
  );

  return {
    columns,
    username,
    isConnected,
  };
};

const useBoardRoomEvents = ({ roomId, userJoin, setIsLoading }) => {
  const dispatch = useDispatch();

  const { path } = useRoomPath();

  const { status } = useBoardRoomConstants();

  const onConnected = () => {
    stompClient.subscribe('/user/' + roomId + '/newCard', onNewCard);
    stompClient.subscribe('/user/' + roomId + '/cardClicked', onCardClicked);
    stompClient.subscribe(
      '/user/' + roomId + '/cardClickedEnd',
      onCardClickedEnd
    );
    stompClient.subscribe('/user/' + roomId + '/moveCard', onCardMoved);

    userJoin();
    setIsLoading(false);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onNewCard = (payload) => {
    console.log(payload);

    const cardData = JSON.parse(payload.body);

    const payloadInfo = {
      to: status.TO_DO,
      card: cardData,
      path: path,
    };

    dispatch(addCardToColumn(payloadInfo));
  };

  const onCardClicked = (payload) => {
    const payloadData = JSON.parse(payload.body);

    const cardDiv = document.querySelectorAll(
      `[data-rbd-draggable-id='${payloadData.id}']`
    )[0];

    if (cardDiv) {
      cardDiv.style.background = '#8884FF';
      cardDiv.style.pointerEvents = 'none';
    }
  };

  const onCardClickedEnd = (payload) => {
    const payloadData = JSON.parse(payload.body);

    const cardDiv = document.querySelectorAll(
      `[data-rbd-draggable-id='${payloadData.id}']`
    )[0];

    if (cardDiv) {
      cardDiv.style.background = '';
      cardDiv.style.pointerEvents = '';
    }
  };

  const onCardMoved = (payload) => {
    const payloadData = JSON.parse(payload.body);
    payloadData.resultData = JSON.parse(payloadData.resultData);

    dispatch(moveCard(payloadData));
  };

  return {
    onConnected,
    onError,
    onNewCard,
    onCardClicked,
    onCardClickedEnd,
    onCardMoved,
  };
};

const useBoardRoomLogic = ({ path, setIsLoading }) => {
  // States
  const [roomId] = useState(path);
  const [activeId, setActiveId] = useState('');
  const [allCards, setAllCards] = useState([]);

  const dispatch = useDispatch();

  const { name, family_name } = useSelector((state) => state.login.userData);
  const username = `${name} ${family_name}`;

  const { onConnected, onError } = useBoardRoomEvents({
    roomId,
    userJoin,
    setIsLoading,
  });

  const { isConnected, columns } = useBoardRoomProps({ path });

  const { URL } = useBoardRoomConstants();

  const connect = () => {
    const sock = new SockJS(URL);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  function userJoin() {
    if (!isConnected) {
      dispatch(
        setConnected({
          type: BOARD,
          path: path,
          isConnected: true,
        })
      );
    }
  }

  const onDragStart = (cardId) => {
    const card = allCards.filter((card) => card.id === cardId)[0];

    setActiveId(cardId);

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
    }

    setActiveId('');

    const payloadData = {
      result: result,
      columns: columns,
      path: path,
    };

    dispatch(moveCard(payloadData));

    const card = allCards.filter((card) => card.id === result.draggableId)[0];

    const newCard = { ...card };
    newCard.resultData = JSON.stringify(payloadData);

    stompClient.send('/app/cardClickedEnd', {}, JSON.stringify(newCard));
    stompClient.send('/app/moveCard', {}, JSON.stringify(newCard));
  };

  const createNewCard = () => {
    if (stompClient) {
      const newCard = {
        id: uuidv4(),
        roomId: roomId,
        limitDate: 'HOY',
        content: `New Card #${columns.TO_DO.items.length + 1} from ${username}`,
        cardStatus: 'TO_DO',
      };

      stompClient.send('/app/newCard', {}, JSON.stringify(newCard));
    }
  };

  return {
    roomId,
    activeId,
    allCards,
    connect,
    createNewCard,
    setAllCards,
    onDragStart,
    onDragEnd,
  };
};

const BoardRoom = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { path } = useRoomPath();

  const { columns, username, isConnected } = useBoardRoomProps({ path });

  const {
    roomId,
    setAllCards,
    connect,
    createNewCard,
    onDragStart,
    onDragEnd,
  } = useBoardRoomLogic({
    path,
    setIsLoading,
  });

  useEffect(() => {
    if (roomId && !isConnected) {
      setIsLoading(true);
      connect();
    }
  }, [roomId, isConnected]);

  useEffect(() => {
    const cards = [
      ...new Set(
        Object.keys(columns).reduce((acc, actual) => {
          return [...acc, ...columns[actual].items];
        }, [])
      ),
    ];

    setAllCards(cards);
  }, [columns, setAllCards]);

  const handleAddTask = () => {
    createNewCard();
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['boardRoom-main']}>
          <div className={styles['boardRoom-container']}>
            <header className={styles['boardRoom-header']}>
              {/* TODO */}
              <div>
                <p style={{ visibility: 'hidden' }}>Bienvenido</p>
              </div>

              <h2 className={styles['boardRoom-header_title']}>
                Tablero Kanban
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
                                      return (
                                        <ColumnItem
                                          reference={provided.innerRef}
                                          draggableProps={
                                            provided.draggableProps
                                          }
                                          dragHandleProps={
                                            provided.dragHandleProps
                                          }
                                          snapshot={snapshot}
                                          providedDraggablePropsStyle={
                                            provided.draggableProps.style
                                          }
                                          cardId={
                                            provided.draggableProps[
                                              'data-rbd-draggable-id'
                                            ]
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
      )}
    </Layout>
  );
};

export default BoardRoom;
