import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.scss"
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Gigs from "./pages/Gigs Categories/Gigs";
import Gig from "./pages/Single Gig Page/Gig";
import Orders from "./pages/Orders/Orders";
import MyGigs from "./pages/myGigs Seller/MyGigs";
import Add from "./pages/Add-New-Gig/Add";
import Messages from "./pages/Messages/Messages";
import Message from "./pages/Single Message/Message";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import Pay from "./pages/Pay/Pay"
import Explore from "./pages/Explore/Explore"
import Community from "./pages/Community/Community"
import Blog from "./pages/Blog/Blog"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Success from "./pages/Success/Success";
import ErrorPage from "./pages/ErrorPage/ErrorPage1" 
import PayCrypto from "./pages/PayCrypto/PayCrypto";


function App() {
  const queryClient = new QueryClient()
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/pay/:id",
          element: <Pay/>,
        },
        {
          path: "/crypto-pay/:id",
          element: <PayCrypto/>,
        },
       
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },

      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
