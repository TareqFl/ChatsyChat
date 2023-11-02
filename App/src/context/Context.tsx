'use client';
import {
  ReactNode,
  Reducer,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Socket, io } from 'socket.io-client';
// ======Imports============

// ======Types============
interface User {
  id?: string;
  username?: string;
  room?: string;
}
interface Room {
  username: string;
  room: string;
}

interface Messages {
  text: string;
  time: string;
  username: string;
}

interface RoomUsers {
  room: string;
  users: User[];
}
type Page = 'form' | 'chat';

type TAction = {
  type: ETypes;
  payload: any;
};
type TInitialState = {
  page: Page;
  roomUsers: RoomUsers | { room: string; users: [] };
  messages: Messages[] | [];
  curruntRoom: Room;
  socket: Socket;
  setPage: (value: Page) => void;
  setCurrentRoom: ({ username, room }: Room) => void;
  setMessages: (value: Messages) => void;
};
// ======Types============
// Enums
enum ETypes {
  SET_PAGE = 'SET_PAGE',
  SET_CURRENT_ROOM = 'SET_CURRENT_ROOM',
  SET_MESSAGES = 'SET_MESSAGES',
  SET_ROOM_USERS = 'SET_ROOM_USERS',
}

const initialState: TInitialState = {
  page: 'form',
  roomUsers: { room: '', users: [] },
  messages: [],
  curruntRoom: {
    username: '',
    room: '',
  },
  socket: io('http://localhost:5000'),
  setPage: () => {},
  setCurrentRoom: () => {},
  setMessages: () => {},
};

const ContextApi = createContext({
  ...initialState,
});

export const SettingsContext = ({ children }: { children: ReactNode }) => {
  function reducer(state: TInitialState, action: TAction) {
    const { type, payload } = action;
    switch (type) {
      case ETypes.SET_CURRENT_ROOM:
        return { ...state, curruntRoom: payload };
      case ETypes.SET_PAGE:
        return { ...state, page: payload };
      case ETypes.SET_MESSAGES:
        return { ...state, messages: [...state.messages, payload] };
      case ETypes.SET_ROOM_USERS:
        return { ...state, roomUsers: payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer<Reducer<TInitialState, TAction>>(
    reducer,
    initialState
  );

  const { socket } = state;

  const setPage = (payload: Page) => {
    dispatch({ type: ETypes.SET_PAGE, payload });
  };
  const setCurrentRoom = (payload: Room) => {
    dispatch({
      type: ETypes.SET_CURRENT_ROOM,
      payload,
    });
  };

  const setMessages = (payload: Messages) => {
    dispatch({
      type: ETypes.SET_MESSAGES,
      payload,
    });
  };

  //   Set up Theme
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    socket.on('roomUsers', (payload) =>
      dispatch({ type: ETypes.SET_ROOM_USERS, payload })
    );
    socket.on('message', (value) => setMessages(value));
  }, []);

  return (
    <ContextApi.Provider
      value={{
        ...state,
        setPage,
        setCurrentRoom,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ContextApi.Provider>
  );
};

export default ContextApi;
