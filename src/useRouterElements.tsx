import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { ProductList } from './pages/ProductList'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { RegisterLayout } from './layouts/RegisterLayout'
import { MainLayout } from './layouts/MainLayout'
import { Profile } from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log('🚀 ~ file: useRouterElements.tsx:19 ~ RejectedRoute ~ isAuthenticated:', isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default function useRouterElements() {
  const routerElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return {
    routerElement
  }
}
