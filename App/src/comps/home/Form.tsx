import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import DropDownMenu from './DropDownMenu';
import { useHooks } from '../../context/hooks';

interface Form {
  username: string;
  room: string;
}
const Form = ({ display }: { display: string }) => {
  const { setPage, curruntRoom, setCurrentRoom, socket } = useHooks();
  const { room, username } = curruntRoom;

  // Handlers
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    const newValue = { ...curruntRoom, username: value };
    setCurrentRoom(newValue);
  }

  // Join a room
  function joinRoom() {
    if (!room.length && username.length) {
      return;
    }
    socket.emit('joinRoom', curruntRoom);
    setPage('chat');
  }

  return (
    <Paper
      sx={{
        display,
        flexDirection: 'column',
        height: 400,
        width: 600,
        backgroundColor: '#930b92',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ backgroundColor: '#610c9f', padding: 2, mb: 4 }}>
        <Typography textAlign="center" variant="h5" color={'white'}>
          Chatsy Chat App
        </Typography>
      </Box>
      <Stack gap={4} padding={4}>
        <TextField
          color="secondary"
          sx={{
            label: {
              color: 'white',
            },
          }}
          label="Username"
          variant="filled"
          value={username}
          onChange={handleChange}
        />
        <DropDownMenu
          room={room}
          returnedValue={(value) => setCurrentRoom({ username, room: value })}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: 'white' }}
          onClick={joinRoom}
          disabled={room.length && username.length ? false : true}
        >
          <Typography color={'black'} fontWeight={'bold'}>
            Join Chat
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default Form;
