import { Container, CSSObject } from '@mui/material';
import Form from './comps/home/Form.tsx';
import Chat from './comps/chat/Chat.tsx';
import { useHooks } from './context/hooks.ts';

const styles: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
};

const App = () => {
  const { page } = useHooks();

  // Handlers

  return (
    <Container sx={styles}>
      <Form display={page === 'form' ? 'flex' : 'none'} />

      <Chat display={page === 'chat' ? 'flex' : 'none'} />
    </Container>
  );
};

export default App;
