import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Chat from "./pages/chat/Chat.jsx";
import RootLayout from './layouts/RootLayout/RootLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout.jsx';
import SignUpPage from './pages/signUp/SignUp.jsx';
import SignInPage from './pages/signIn/SignIn.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children:[
      {
        path:"/",
        element: <Home />,
      },
      {
        path:"/sign-up/*",
        element: <SignUpPage />,
      },
      {
        path:"/sign-in/*",
        element: <SignInPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "dashboard/chats/:id",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
