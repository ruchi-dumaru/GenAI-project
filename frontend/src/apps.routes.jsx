import { Children } from "react";
import Protected from "./components/protected";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { createBrowserRouter } from 'react-router';

export const router=createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },{
    path:'/',
    element:<Protected>Home Page</Protected>

  }

])

export default router