// Importing the necessary modules from React and ReactDOM.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Importing the main App component

// Rendering the App component inside the root element in the HTML
// React.StrictMode is used to highlight potential problems in the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Rendering the App component */}
  </React.StrictMode>,
)
