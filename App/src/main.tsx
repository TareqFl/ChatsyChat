import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SettingsContext } from './context/Context.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <SettingsContext>
    <App />
  </SettingsContext>
);
