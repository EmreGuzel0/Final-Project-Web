import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Connect to the HTML root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component to the screen
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
