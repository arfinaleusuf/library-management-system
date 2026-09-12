import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BrowesBooks from "../pages/BrowesBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path:"/books",
          element: <BrowesBooks/>
        }
    ]
  },
]);

export default router;