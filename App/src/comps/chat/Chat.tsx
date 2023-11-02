import { Paper } from '@mui/material';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

const Chat = ({ display }: { display: string }) => {
  return (
    <Paper
      sx={{
        width: '95%',
        height: 500,
        display,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Top />
      <Middle />
      <Bottom />
    </Paper>
  );
};

export default Chat;
