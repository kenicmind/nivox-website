import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 4000,
      style: {
        background: "#2B0A5A",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "16px",
        padding: "16px",
      },
      success: {
        iconTheme: {
          primary: "#FFD54A",
          secondary: "#2B0A5A",
        },
      },
      error: {
        iconTheme: {
          primary: "#EF4444",
          secondary: "#fff",
        },
      },
    }}
  />
  </StrictMode>,
)
