//Imports for the necessary dependencies for rendering the app.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./App.css"

////Initializes the React app using the createRoot function from ReactDOM. It renders the app within the element with the ID 'root' on the HTML page.
ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode> 
    <BrowserRouter>
    <App />
    </BrowserRouter>
 
  </React.StrictMode>, //I used the 'react-router-dom' for client sdie routing.
)
