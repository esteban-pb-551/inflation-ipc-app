import React from 'react';
import { createRoot } from 'react-dom/client';
import InflacionInteractiva from './inflation.jsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <InflacionInteractiva />
    </React.StrictMode>
  );
} else {
  console.error('Error: Root element with id "root" not found in the DOM.');
}