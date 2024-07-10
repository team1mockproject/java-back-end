import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./styles/global.css";
import ClientHome from "./pages/client-home";
import Client from "./pages/Client";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Manager from "./pages/Manager";
import { ResponsiveWrapper } from "./context/responsive-context/ResponsiveContext";
import ClientRegisterToAuction from "./pages/client-register-to-auction";

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
        path: "/register-to-auction",
        element: <ClientRegisterToAuction />,
      },
    ],
  },
  {
    path: "/manager",
    element: <Manager />,
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
      <RouterProvider router={router} />
    </ResponsiveWrapper>
  );
}

export default App;
