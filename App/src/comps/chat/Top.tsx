import { EmojiEmotions } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useHooks } from '../../context/hooks';

export default function Top() {
  const { setPage, socket, setCurrentRoom } = useHooks();
  function handleClick() {
    socket.disconnect();
    setPage('form');
    setCurrentRoom({ username: '', room: '' });
    socket.connect();
  }

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={2}
      bgcolor={'#610c9f'}
    >
      <Stack direction={'row'} alignItems={'center'} flex={1} gap={1}>
        <EmojiEmotions fontSize="large" />
        <Typography variant="h4">Chatsy Chat</Typography>
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        sx={{ backgroundColor: 'white' }}
        onClick={handleClick}
      >
        <Typography>Leave Room</Typography>
      </Button>
    </Stack>
  );
}
