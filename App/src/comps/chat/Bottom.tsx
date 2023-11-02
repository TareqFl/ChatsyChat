import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useHooks } from '../../context/hooks';

export default function Bottom() {
  const { socket } = useHooks();
  const [value, setValue] = useState<string>('');
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={2}
        bgcolor={'#610c9f'}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Enter Message"
          type="text"
          value={value}
          onChange={(e) => setValue(() => e.target.value)}
        />
        <Button
          disabled={value.length ? false : true}
          variant="contained"
          onClick={() => {
            socket.emit('chatMessage', value);
          }}
        >
          <Typography variant="h6" fontSize={14}>
            Send Message
          </Typography>
        </Button>
      </Stack>
    </form>
  );
}
