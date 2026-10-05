import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  // Remove progressive shell preloader once React script initializes
  const shell = document.getElementById('initial-shell');
  if (shell) {
    shell.remove();
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
