import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.tsx'

import "./styles/variables.css";
import "./styles/utilities.css"
import "./styles/global.css";

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      theme="dark"
    />
  </>,
)
