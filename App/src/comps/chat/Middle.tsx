import { Group, Person } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { useHooks } from '../../context/hooks';

interface Messages {
  text: string;
  time: string;
  username: string;
}

function Row({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      {icon}
      <Typography fontWeight={'bold'}>{text}</Typography>
    </Stack>
  );
}

function LeftSide() {
  const { curruntRoom, roomUsers } = useHooks();
  return (
    <Stack
      direction={'column'}
      justifyContent={'space-evenly'}
      height={337}
      width={200}
      bgcolor={'#930b92'}
    >
      <Row icon={<Group />} text={`Room: ${curruntRoom.room}`} />

      <Row icon={<Person />} text="Users:" />
      <Stack
        direction={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
        sx={{
          width: 'auto',
          overflowY: 'auto',
        }}
      >
        {roomUsers?.users.map((user, index) => {
          return (
            <Button key={index} variant="contained">
              <Typography>{user.username}</Typography>
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}

function RightSide({
  messages,
  username,
}: {
  messages: Messages[];
  username: string;
}) {
  const allMessages = useMemo(() => messages, [messages]);

  return (
    <Stack
      direction={'column'}
      gap={2}
      sx={{ width: '100%', height: 300, overflowY: 'scroll', padding: 4 }}
    >
      {allMessages?.map((msg, index) => {
        let alignSelf: string = 'end';
        if (username === msg.username) {
          alignSelf = 'end';
        }
        if (msg.username === 'Chat BOT') {
          alignSelf = 'center';
        }
        if (msg.username !== username && msg.username !== 'Chat BOT') {
          alignSelf = 'start';
        }

        return (
          <Button
            key={index}
            variant="contained"
            color={msg.username === 'Chat BOT' ? 'secondary' : 'primary'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 12,
              width: 200,
              height: 'auto',
              padding: 4,
              alignSelf,
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography color={'black'} textAlign={'center'} fontSize={16}>
                {msg.username}
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                key={index}
                color={'black'}
                textAlign={'start'}
                fontSize={14}
              >
                {msg.text}
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                key={index}
                color={'black'}
                textAlign={'right'}
                fontSize={10}
              >
                {msg.time}
              </Typography>
            </Box>
          </Button>
        );
      })}
    </Stack>
  );
}

export default function Middle() {
  const { curruntRoom, messages } = useHooks();
  const { username } = curruntRoom;
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <LeftSide />
      <RightSide messages={messages} username={username} />
    </Stack>
  );
}
