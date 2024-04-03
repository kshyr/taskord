import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';

import '@shared/globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
