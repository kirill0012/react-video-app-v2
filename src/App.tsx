import React from 'react'
import { routes as appRoutes } from './routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  )
}

export default App
