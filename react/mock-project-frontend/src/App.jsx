import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import ClientHome from './pages/client-home'
import Client from './pages/Client'
import Login from './pages/login'
import Signup from './pages/signup'
import Manager from './pages/Manager'

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
    path: "/manager",
    element: <Manager />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
