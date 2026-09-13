import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BrowesBooks from "../pages/BrowesBooks";
import BookDetails from "../pages/BookDetails";
import MyReserve from "../pages/MyReserve";

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
        },
        {
          path:"/books/:id",
          element:<BookDetails/>
        },
        {
          path:'/reserve/my',
          element: <MyReserve/>
        }
    ]
  },
]);

export default router;