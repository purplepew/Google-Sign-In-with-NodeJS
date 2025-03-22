import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import darkTheme from './theme/darkTheme.ts'
import { ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './lib/store.ts'

const theme = createTheme({ ...darkTheme });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
