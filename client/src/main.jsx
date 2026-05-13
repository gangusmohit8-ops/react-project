import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './cotext/DarkandLight.jsx';
import {ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
