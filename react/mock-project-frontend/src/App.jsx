import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import ClientHome from './pages/client-home/ClientHome'
import Client from './pages/Client'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    errorElement: <div></div>,
    children: [
      {
        index: true,
        element: <ClientHome />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
