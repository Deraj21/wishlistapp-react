import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Routing from './config/routes.tsx'

// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    </StrictMode>,
)
