import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import ClientHome from './pages/client-home'
import Client from './pages/Client'
import Login from './pages/login'
import Signup from './pages/signup'
import Manager from './pages/Manager'
import { ResponsiveWrapper } from './context/responsive-context/ResponsiveContext'
import ManagerBuyerList from './pages/manager-buyer-list'
import ManagerSellerList from './pages/manager-seller-list'
import Categories from './pages/Categories'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    errorElement: <div>Client Error</div>,
    children: [
      {
        index: true,
        element: <ClientHome />
      }
    ]
  },
  {
    path: "/manager",
    element: <Manager />,
    errorElement: <div>Manager Error</div>,
    children: [
      {
        index: true,
        element: <ManagerBuyerList />
      },
      {
        path: "seller",
        element: <ManagerSellerList />
      }
    ]
  },
  {
    path: "/categories",
    element: <Categories />,

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
    <ResponsiveWrapper>
      <RouterProvider
        router={router}
      />
    </ResponsiveWrapper>
  )
}

export default App
