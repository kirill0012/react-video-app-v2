import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { routes as appRoutes } from './routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import lightTheme from './styles/theme/lightTheme'

function App() {
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <header>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Public+Sans:400,500,600,700,900&display=swap"
          />
        </header>
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.key} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
