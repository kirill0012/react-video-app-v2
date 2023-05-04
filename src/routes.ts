// src/routes.ts

// pages
import Index from './pages/Index'
import Login from './pages/Login'

// other
import { FC } from 'react'

// interface
interface Route {
  key: string
  title: string
  path: string
  enabled: boolean
  component: FC<object>
}

export const routes: Array<Route> = [
  {
    key: 'index-route',
    title: 'Index',
    path: '/',
    enabled: true,
    component: Index,
  },
  {
    key: 'login-route',
    title: 'Login',
    path: '/login',
    enabled: true,
    component: Login,
  },
]
