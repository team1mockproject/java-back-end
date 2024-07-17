import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./styles/global.css";
import ClientHome from "./pages/client-home";
import Client from "./pages/Client";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Manager from "./pages/Manager";
import { ResponsiveWrapper } from "./context/responsive-context/ResponsiveContext";
import ManagerBuyerList from "./pages/manager-buyer-list";
import ManagerSellerList from "./pages/manager-seller-list";
import ManagerAppraiserList from "./pages/manager-appraiser-list";
import ClientRegisterToAuction from "./pages/client-register-to-auction";

import ManagerAuctionList from "./pages/manager-auction-list";
import ClientListAuction from "./pages/client-list-auction";

import ManagerAssetList from './pages/manager-asset-list'
import Categories from './pages/Categories'
import ManagerStaffList from './pages/manager-staff-list/ManagerStaffList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ModalStateWrapper } from './context/modal-state-context/ModalStateContext'
import ClientAssetWantToAuction from './pages/client-asset-want-to-auction/ClientAssetWantToAuction'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    errorElement: <div>Client Error</div>,
    children: [
      {
        index: true,
        element: <ClientHome />,
      },
      {
        path: "register-to-auction",
        element: <ClientRegisterToAuction />,
      },
      {
        path: "list-auction",
        element: <ClientListAuction />,
       },
  {
        path: "/asset-want-to-auction",
        element: <ClientAssetWantToAuction />
      },
    ],
  },
  {
    path: "/manager",
    element: <Manager />,
    errorElement: <div>Manager Error</div>,
    children: [
      {
        index: true,
        element: <ManagerBuyerList />,
      },
      {
        path: "seller",
        element: <ManagerSellerList />,
      },
      {
        path: "auction",
        element: <ManagerAuctionList />,
      },
    {
        path: "appraiser",
        element: <ManagerAppraiserList />
      },
      {
        path: "asset",
        element: <ManagerAssetList />
      },
      {
        path: "staff",
        element: <ManagerStaffList />
      }
    ]
  },
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <ResponsiveWrapper>
    <ModalStateWrapper>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ModalStateWrapper>
    </ResponsiveWrapper>
  );
}

export default App;
